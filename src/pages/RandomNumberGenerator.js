import { useState, useEffect, useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const RandomNumberGenerator = () => {
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [step, setStep] = useState("");

    const isValid =
        !isNaN(parseFloat(min)) &&
        !isNaN(parseFloat(max)) &&
        !isNaN(parseFloat(step)) &&
        parseFloat(step) > 0 &&
        parseFloat(min) < parseFloat(max);

    const { lang } = useContext(LanguageContext);
    const [number, setNumber] = useState(null);

    const generateNumber = () => {
        const minVal = parseFloat(min);
        const maxVal = parseFloat(max);
        const stepVal = parseFloat(step);

        const strStep = stepVal.toString();
        const decimal = strStep.includes(".") ? strStep.split(".")[1].length : 0;
        const count = Math.floor((maxVal - minVal) / stepVal) + 1;
        const index = Math.floor(Math.random() * count);
        const num = minVal + index * stepVal;
        setNumber(num.toFixed(decimal));
    };

    const inputWidth = (value, placeholder) => {
        const len = value.length > 0 ? value.length : placeholder.length;
        return `${Math.max(len + 1, 5)}ch`;
    };

    const stepVal = parseFloat(step);
    const exampleHint =
        !isNaN(parseFloat(min)) && !isNaN(parseFloat(max)) && !isNaN(stepVal) && stepVal > 0
            ? `Ex : ${parseFloat(min)}, ${parseFloat(min) + stepVal}, ..., ${parseFloat(max)}`
            : "Ex : 1, 2, ..., 10";

    useEffect(() => {
        document.title = `plouaf ! - ${translations[lang].pages.HeadsOrTails.title}`;
    }, [lang]);

    return (
        <section className="random-number-generator">
            <p>Choisir l'intervalle de génération de nombres et lancer le tirage !</p>

            <div className="options">
                <div className="range">
                    <input
                        type="number"
                        className="input-number"
                        style={{ width: inputWidth(min, "1") }}
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        name="min"
                        id="min"
                        placeholder="1"
                    />
                    <span className="range-separator">-</span>
                    <input
                        type="number"
                        className="input-number"
                        style={{ width: inputWidth(max, "10") }}
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        name="max"
                        id="max"
                        placeholder="10"
                    />
                </div>

                <div className="step">
                    <label htmlFor="step">Choisir le pas</label>
                    <input
                        type="number"
                        className="input-number"
                        style={{ width: inputWidth(step, "1") }}
                        value={step}
                        onChange={(e) => setStep(e.target.value)}
                        name="step"
                        id="step"
                        placeholder="1"
                    />
                    <span className="step-hint">{exampleHint}</span>
                </div>
            </div>

            <button className="primary full-width" onClick={generateNumber} disabled={!isValid}>
                <p>Générer Nombre</p>
            </button>

            <div className="result-card">
                <span className="result-label">Nombres</span>
                {number !== null && <span className="result-number">{number}</span>}
            </div>
        </section>
    );
};

export default RandomNumberGenerator;
