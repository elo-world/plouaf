import { useEffect, useState, useRef, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const HeadsOrTails = () => {
    const { lang } = useContext(LanguageContext);
    const [face, setFace] = useState("heads");
    const [isFlipping, setIsFlipping] = useState(false);
    const spinCountRef = useRef(0);

    const flip = () => {
        if (isFlipping) return;

        const faceIndex = Math.floor(Math.random() * 2); // 0 = heads, 1 = tails
        const newFace = faceIndex === 0 ? "heads" : "tails";

        // Each flip adds 5 full rotations (1800°) + 180° if landing on tails
        spinCountRef.current += 900 + (newFace === "tails" ? 180 : 0);

        const coin = document.getElementById("coin");
        coin.style.transform = `rotateX(${spinCountRef.current}deg)`;

        setIsFlipping(true);
        setFace(newFace);

        setTimeout(() => setIsFlipping(false), 3000); // Match CSS transition duration
    };

    useEffect(() => {
        document.title = `plouaf ! - ${translations[lang].pages.HeadsOrTails.title}`;
    }, [lang]);

    return (
        <section className="heads-or-tails" onClick={flip}>
            <div className="coin" id="coin">
                <img src={`./images/heads-or-tails/heads.svg`} className="heads" alt="Heads" />
                <img src={`./images/heads-or-tails/tails.svg`} className="tails" alt="Tails" />
            </div>
            <p className="flip-the-coin">{isFlipping ? "..." : translations[lang].pages.HeadsOrTails.flip}</p>
        </section>
    );
};

export default HeadsOrTails;
