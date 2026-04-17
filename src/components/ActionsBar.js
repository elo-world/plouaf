import { useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

function ActionsBar({ path, toggleMenu }) {
    const { lang } = useContext(LanguageContext);

    const mode = path === "" ? "random-draw" : path;
    const modeTitle =
        translations[lang].pages[
            mode
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("")
        ].title;

    return (
        <div className="actions-bar">
            <ul className="options-btn" style={{ display: `${mode === "random-draw" ? "flex" : "none"}` }}>
                <li>
                    <button className="tertiary yellow">Importer</button>
                </li>
                <li>
                    <button className="tertiary green">Coller Liste</button>
                </li>
                <li>
                    <button className="tertiary blue">Exporter</button>
                </li>
            </ul>
            <div className="change-mode">
                <div className="input-bar" style={{ display: `${mode === "random-draw" ? "flex" : "none"}` }}>
                    <input mode="text" />
                    <button className="sendItem">^</button>
                </div>
                <button className="secondary fullwidth" onClick={toggleMenu}>
                    {modeTitle}
                    <img src={`./images/menu/${mode}.svg`} alt={`${modeTitle} Icon`} />
                </button>
            </div>
        </div>
    );
}

export default ActionsBar;
