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
            {mode === "random-draw" ? (
                <div className="btn-box-toggle-menu">
                    <button
                        className="btn-toggle-menu"
                        onClick={toggleMenu}
                        style={{ display: `${document.body.clientWidth < 900 ? "flex" : "none"}` }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-menu-icon lucide-menu"
                        >
                            <path d="M4 5h16" />
                            <path d="M4 12h16" />
                            <path d="M4 19h16" />
                        </svg>
                    </button>
                </div>
            ) : (
                <button
                    className={`secondary ${mode === "random-draw" ? "" : "fullwidth"}`}
                    onClick={toggleMenu}
                >
                    <p style={{ display: `${mode === "random-draw" ? "none" : "block"}` }}>{modeTitle}</p>
                    <img src={`./images/menu/${mode}.svg`} alt={`${modeTitle} Icon`} />
                </button>
            )}
        </div>
    );
}

export default ActionsBar;
