import { useState, useEffect } from "react";
import {useAuth} from "../AuthContext.jsx";

// IndexedDB utility functions
const DB_NAME = "AIModelDB";
const STORE_NAME = "models";
const STATIC_MODEL_KEY = "staticModel";
const MOTION_MODEL_KEY = "motionModel";
const VERSION_KEY = "modelVersion"; // Single entry for version tracking

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (error) => reject(error);
    });
};

const saveToIndexedDB = async (key, data) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.put({ id: key, data });

        transaction.oncomplete = () => resolve();
        transaction.onerror = (error) => reject(error);
    });
};

const loadFromIndexedDB = async (key) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result?.data);
        request.onerror = (error) => reject(error);
    });
};

// Custom React Hook
export const useAIModel = () => {
    const [models, setModels] = useState({ staticModel: null, motionModel: null });
    const [loading, setLoading] = useState(true);
    const { jwt } = useAuth();

    useEffect(() => {
        const fetchModels = async () => {
            try {
                // Load cached models
                const cachedStaticModel = await loadFromIndexedDB(STATIC_MODEL_KEY);
                const cachedMotionModel = await loadFromIndexedDB(MOTION_MODEL_KEY);
                const cachedVersion = await loadFromIndexedDB(VERSION_KEY);

                // Fetch AI models from backend
                const response = await fetch("http://145.24.223.196:8008/v2/ai/model", {
                    method: "GET",
                    headers: {
                        "x-api-key": "95937790-3a9d-4ee2-9ed6-ace5165167f2",
                        "Accept": "application/json",
                        'Authorization': 'Bearer ' + jwt,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch AI models");
                }

                const { staticModel, motionModel, version } = await response.json();

                console.log("Static Model:", staticModel);
                console.log("Motion Model:", motionModel);
                console.log("Model Version:", version);

                // Check if version has changed
                if (cachedVersion !== version) {
                    console.log("Updating AI models...");
                    await saveToIndexedDB(STATIC_MODEL_KEY, staticModel);
                    await saveToIndexedDB(MOTION_MODEL_KEY, motionModel);
                    await saveToIndexedDB(VERSION_KEY, version);
                    setModels({ staticModel, motionModel });
                } else {
                    console.log("Using cached AI models.");
                    setModels({ staticModel: cachedStaticModel, motionModel: cachedMotionModel });
                }
            } catch (error) {
                console.error("Failed to load AI models:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    return { models, loading };
};
