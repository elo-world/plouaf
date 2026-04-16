import { useEffect, useContext } from "react";

// Translations
import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const RandomDraw = () => {
    const { lang } = useContext(LanguageContext);

    useEffect(() => {
        document.title = `plouaf ! - ${translations[lang].pages.RandomDraw.title}`;
    }, [lang]);

    return (
        <section className="random-draw">
            <h1>Random</h1>
        </section>
    );
};

export default RandomDraw;
