import { useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

function Header({ show, status, toggleMenu }) {
    const { lang, setLang } = useContext(LanguageContext);

    const changeLang = (language) => {
        setLang(language);
        localStorage.setItem("language", language);
    };

    return (
        <header>
            <img
                className="logo"
                fetchPriority={"high"}
                src="./images/logo/typo.svg"
                alt="Logo typographique"
            />
            <div className="languages">
                <button className="secondary" onClick={toggleMenu}>
                    <img src="./images/icons/world.svg" alt="Language icon" />
                    {translations[lang].language}
                </button>
                <ul className={`languages-menu ${show ? "show" : status}`}>
                    {translations["languages"]
                        .filter((language) => language !== lang)
                        .map((language) => (
                            <li key={language} onClick={() => changeLang(language)}>
                                {translations[language].language}
                            </li>
                        ))}
                </ul>
            </div>
        </header>
    );
}

export default Header;
