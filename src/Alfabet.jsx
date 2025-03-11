// import React, { useState } from "react";

const signs = [
    {
        id: 1,
        definition: "Gebaar voor hallo",
        lesson: 1,
        theme: "Begroetingen",
        video_path: "/videos/hallo.mp4",
        facial_expressions: {
            name: "Glimlach",
            image_path: "/images/smile.png"
        }
    },
    {
        id: 2,
        definition: "Gebaar voor dankjewel",
        lesson: 1,
        theme: "Beleefdheid",
        video_path: "/videos/dankjewel.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    },
    {
        id: 3,
        definition: "Gebaar voor sorry",
        lesson: 2,
        theme: "Beleefdheid",
        video_path: "/videos/sorry.mp4",
        facial_expressions: {
            name: "Berouwvolle uitdrukking",
            image_path: "/images/sorry.png"
        }
    },
    {
        id: 4,
        definition: "Gebaar voor ja",
        lesson: 2,
        theme: "Basisantwoorden",
        video_path: "/videos/ja.mp4",
        facial_expressions: {
            name: "Bevestigende uitdrukking",
            image_path: "/images/yes.png"
        }
    },
    {
        id: 5,
        definition: "Gebaar voor nee",
        lesson: 2,
        theme: "Basisantwoorden",
        video_path: "/videos/nee.mp4",
        facial_expressions: {
            name: "Ontkennende uitdrukking",
            image_path: "/images/no.png"
        }
    },
    // Alphabet A-H
    {
        id: 6,
        definition: "Letter A in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/A.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/public/spelling-avatar.png"
        }
    },
    {
        id: 7,
        definition: "Letter B in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/B.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    },
    {
        id: 8,
        definition: "Letter C in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/C.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    },
    {
        id: 9,
        definition: "Letter D in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/D.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    },
    {
        id: 10,
        definition: "Letter E in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/E.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    },
    {
        id: 11,
        definition: "Letter F in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/F.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    },
    {
        id: 12,
        definition: "Letter G in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/G.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    },
    {
        id: 13,
        definition: "Letter H in gebarentaal",
        lesson: 3,
        theme: "Alfabet",
        video_path: "/videos/H.mp4",
        facial_expressions: {
            name: "Neutrale uitdrukking",
            image_path: "/images/neutral.png"
        }
    }
]
function Alfabet(){

    const alphabetSigns = signs.filter(sign => sign.theme === "Alfabet");

    return (
        <div className="p-6">
            {/* Centered Title */}
            <h1 className="text-3xl font-bold text-center mb-6">Alfabet Gebaren</h1>

            {/* Grid Layout: 1 column on small screens, 2 on medium, 3 on large */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alphabetSigns.map(sign => (
                    <li key={sign.id} className="bg-white p-4 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg font-semibold mb-2">{sign.definition}</h3>
                        {sign.video_path.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video width="200" controls className="mx-auto">
                                <source src={sign.video_path} type="video/mp4"/>
                                Je browser ondersteunt geen video-element.
                            </video>
                        ) : (
                            <img src={sign.video_path} alt={sign.definition} width="200" className="mx-auto"/>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Alfabet



