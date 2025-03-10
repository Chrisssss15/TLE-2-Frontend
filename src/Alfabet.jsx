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
            image_path: "/images/neutral.png"
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
        <div>
            <h2>Alfabet Gebaren</h2>
            <ul>
                {alphabetSigns.map(sign => (
                    <li key={sign.id}>
                        <h3>{sign.definition}</h3>
                        <p>Les: {sign.lesson}</p>
                        <p>Gezichtsuitdrukking: {sign.facial_expressions.name}</p>
                        <img src={sign.facial_expressions.image_path} alt={sign.facial_expressions.name} width="100"/>
                        <br/>
                        <video width="200" controls>
                            <source src={sign.video_path} type="video/mp4"/>
                            Je browser ondersteunt geen video-element.
                        </video>
                    </li>
                ))}
            </ul>
        </div>)
}

export default Alfabet



