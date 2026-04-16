import { useEffect, useState, useContext } from "react";

// Translations
import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const Die = () => {
    const { lang } = useContext(LanguageContext);
    const [face, setFace] = useState(1);

    // Flip the coin.
    const roll = () => {
        setFace(Math.floor(Math.random() * 6) + 1); // Entre 1 et 6.
    };

    useEffect(() => {
        document.title = `plouaf ! - ${translations[lang].pages.HeadsOrTails.title}`;
    }, [lang]);

    return (
        <section className="die" onClick={roll}>
            <p className="die">{face}</p>
        </section>
    );
};

export default Die;
