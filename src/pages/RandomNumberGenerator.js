import { useState, useEffect, useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const RandomNumberGenerator = () => {
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [step, setStep] = useState("");
    const [minSize, setMinSize] = useState(0);
    const [maxSize, setMaxSize] = useState(0);
    const [stepSize, setStepSize] = useState(0);
    const [isResult, setIsResult] = useState(false);

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
        setIsResult(true);
    };

    const updateOptions = (option, optionSize, value) => {
        option(value);
        optionSize(value.length);
    };

    const stepVal = parseFloat(step);
    const exampleHint =
        !isNaN(parseFloat(min)) && !isNaN(parseFloat(max)) && !isNaN(stepVal) && stepVal > 0
            ? `Ex : ${parseFloat(min)}, ${parseFloat(min) + stepVal}, ..., ${parseFloat(max)}`
            : "Ex : 1, 2, ..., 10";

    useEffect(() => {
        document.title = `plouaf! - ${translations[lang].pages.RandomNumberGenerator.title}`;
    }, [lang]);

    return (
        <section className="random-number-generator">
            <p>Choisir l'intervalle de génération de nombres et lancer le tirage !</p>

            <div className="options" style={{ display: `${isResult ? "none" : "block"}` }}>
                <div className="range">
                    <div className="box">
                        <input
                            type="number"
                            className="input-number"
                            value={min}
                            style={{ width: `${Math.max(minSize + 3, 5)}ch` }}
                            onChange={(e) => updateOptions(setMin, setMinSize, e.target.value)}
                            name="min"
                            id="min"
                            placeholder="1"
                        />
                    </div>
                    <div className="box">
                        <span className="range-separator">-</span>
                    </div>
                    <div className="box">
                        <input
                            type="number"
                            className="input-number"
                            value={max}
                            style={{ width: `${Math.max(maxSize + 3, 5)}ch` }}
                            onChange={(e) => updateOptions(setMax, setMaxSize, e.target.value)}
                            name="max"
                            id="max"
                            placeholder="10"
                        />
                    </div>
                </div>

                <div className="step">
                    <label htmlFor="step">Choisir le pas</label>
                    <input
                        type="number"
                        className="input-number"
                        value={step}
                        style={{ width: `${Math.max(stepSize + 3, 5)}ch` }}
                        onChange={(e) => updateOptions(setStep, setStepSize, e.target.value)}
                        name="step"
                        id="step"
                        placeholder="1"
                    />
                    <span className="step-hint">{exampleHint}</span>
                </div>
            </div>

            <div className="result-card" style={{ display: `${isResult ? "flex" : "none"}` }}>
                <div className="back-btn">
                    <button onClick={() => setIsResult(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-move-left-icon lucide-move-left"
                        >
                            <path d="M6 8L2 12L6 16" />
                            <path d="M2 12H22" />
                        </svg>
                        Back to option
                    </button>
                </div>
                <span className="result-label">Nombre</span>
                {number !== null && <span className="result-number">{number}</span>}
            </div>

            <button className="primary full-width" onClick={generateNumber} disabled={!isValid}>
                <p>Générer Nombre</p>
            </button>
        </section>
    );
};

export default RandomNumberGenerator;
