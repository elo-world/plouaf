import { useState, useEffect, useContext } from "react";

// Translations
import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const RandomNumberGenerator = () => {
    const { lang } = useContext(LanguageContext);
    const [number, setNumber] = useState(0);

    const generateNumber = () => {
        let min = 2;
        let max = 10;
        let step = 20;
        const strStep = step.toString();
        const decimal = strStep.includes(".") ? strStep.split(".")[1].length : 0;
        const count = Math.floor((max - min) / step) + 1;
        const index = Math.floor(Math.random() * count);
        const num = min + index * step;
        setNumber(num.toFixed(decimal));
    };

    useEffect(() => {
        document.title = `plouaf ! - ${translations[lang].pages.HeadsOrTails.title}`;
    }, [lang]);

    return (
        <section className="random-number-generator" onClick={generateNumber}>
            <p className="die">{number}</p>
        </section>
    );
};

export default RandomNumberGenerator;
