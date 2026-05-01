import { useContext } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

function Header({ show, status, toggleMenu, toggleLanguagesMenu }) {
    const { lang, setLang } = useContext(LanguageContext);

    const changeLang = (language) => {
        setLang(language);
        localStorage.setItem("language", language);
    };

    return (
        <header>
            <Link to="/">
                <img
                    className="logo"
                    fetchPriority={"high"}
                    src="./images/logo/typo.svg"
                    alt="Logo typographique"
                />
            </Link>
            <div className="box">
                <div className="languages">
                    <button className="secondary" onClick={toggleLanguagesMenu}>
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
                <button
                    className="btn-toggle-menu"
                    onClick={toggleMenu}
                    style={{ display: `${document.body.clientWidth > 900 ? "flex" : "none"}` }}
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
        </header>
    );
}

export default Header;
