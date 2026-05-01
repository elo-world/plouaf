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
        <div className={`actions-bar ${mode === "random-draw" ? "mode-random-draw" : ""}`}>
            <button className={`secondary ${mode === "random-draw" ? "" : "fullwidth"}`} onClick={toggleMenu}>
                <p style={{ display: `${mode === "random-draw" ? "none" : "block"}` }}>{modeTitle}</p>
                <img src={`./images/menu/${mode}.svg`} alt={`${modeTitle} Icon`} />
            </button>
        </div>
    );
}

export default ActionsBar;
