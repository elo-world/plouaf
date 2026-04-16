import { useEffect, useState, useContext } from "react";

// Translations
import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const HeadsOrTails = () => {
    const { lang } = useContext(LanguageContext);
    const [face, setFace] = useState("heads");

    // Flip the coin.
    const flip = () => {
        const faceIndex = Math.floor(Math.random() * 2); // 0 ou 1.

        faceIndex === 0 ? setFace("heads") : setFace("tails");
    };

    useEffect(() => {
        document.title = `plouaf ! - ${translations[lang].pages.HeadsOrTails.title}`;
    }, [lang]);

    return (
        <section className="heads-or-tails" onClick={flip}>
            <img
                src={`./images/heads-or-tails/heads.svg`}
                alt="Heads"
                style={{ display: `${face === "heads" ? "block" : "none"}` }}
            />
            <img
                src={`./images/heads-or-tails/tails.svg`}
                alt="Tails"
                style={{ display: `${face === "tails" ? "block" : "none"}` }}
            />
            <p className="flip-the-coin">{translations[lang].pages.HeadsOrTails.flip}</p>
        </section>
    );
};

export default HeadsOrTails;
