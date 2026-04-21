import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const faceRotations = {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 180 },
    3: { x: 0, y: -90 },
    4: { x: 0, y: 90 },
    5: { x: -90, y: 0 },
    6: { x: 90, y: 0 },
};

const SPIN = 1080;

const Die = () => {
    const { lang } = useContext(LanguageContext);
    const [face, setFace] = useState(null);
    const [isRolling, setIsRolling] = useState(false);

    const roll = () => {
        if (isRolling) return;
        const result = Math.floor(Math.random() * 6) + 1;
        const { x, y } = faceRotations[result];
        const die = document.getElementById("die");

        setIsRolling(true);
        setFace(null);

        die.style.transition = "transform 3s cubic-bezier(0.33, 1, 0.68, 1)";
        die.style.transform = `rotateX(${x + SPIN}deg) rotateY(${y + SPIN}deg)`;

        setTimeout(() => {
            die.style.transition = "none";
            die.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

            setTimeout(() => {
                die.style.transition = "";
                setFace(result);
                setIsRolling(false);
            }, 50);
        }, 3000);
    };

    useEffect(() => {
        document.title = `plouaf ! - ${translations[lang].pages.Die.title}`;
    }, [lang]);

    return (
        <section className="roll-the-die" onClick={roll}>
            <div className={`die ${face}`} id="die">
                <img src="./images/die/face-1.svg" className="face face-1" alt="Face 1" />
                <img src="./images/die/face-2.svg" className="face face-2" alt="Face 2" />
                <img src="./images/die/face-3.svg" className="face face-3" alt="Face 3" />
                <img src="./images/die/face-4.svg" className="face face-4" alt="Face 4" />
                <img src="./images/die/face-5.svg" className="face face-5" alt="Face 5" />
                <img src="./images/die/face-6.svg" className="face face-6" alt="Face 6" />
            </div>
        </section>
    );
};

export default Die;
