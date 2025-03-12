import { useState, useEffect } from "react";

// IndexedDB utility functions
const DB_NAME = "AIModelDB";
const STORE_NAME = "models";
const MODEL_KEY = "staticModel";

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

const saveModelToIndexedDB = async (model) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.put({ id: MODEL_KEY, data: model });

        transaction.oncomplete = () => resolve();
        transaction.onerror = (error) => reject(error);
    });
};

const loadModelFromIndexedDB = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(MODEL_KEY);

        request.onsuccess = () => resolve(request.result?.data);
        request.onerror = (error) => reject(error);
    });
};

// Custom React Hook
export const useAIModel = () => {
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModel = async () => {
            try {
                const cachedModel = await loadModelFromIndexedDB();

                const response = await fetch("http://145.24.223.196:8008/v1/ai/model", {
                    method: 'GET',
                    headers: {
                        'x-api-key': '95937790-3a9d-4ee2-9ed6-ace5165167f2',
                        'Accept': 'application/json'
                    }
                });
                const serverModel = await response.json();
                console.log("servermodel");
                console.log(serverModel);

                // Check if model needs updating
                if (!cachedModel || cachedModel.version !== serverModel.version) {
                    console.log("Updating AI model...");
                    await saveModelToIndexedDB(serverModel);
                    setModel(serverModel);
                } else {
                    console.log("Using cached AI model.");
                    setModel(cachedModel);
                    console.log("cached model");
                    console.log(cachedModel);
                }
            } catch (error) {
                console.error("Failed to load AI model:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModel();
    }, []);

    return { model, loading };
};