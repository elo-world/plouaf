import { useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

function Header() {
    const { lang, setLang } = useContext(LanguageContext);

    return (
        <header>
            <img fetchPriority={"high"} src="./images/logo/typo.svg" alt="Logo typographique" />
            <div className="languages">
                <button>
                    <img src="./images/icons/world.svg" alt="Language icon" />
                    {translations[lang].language}
                </button>
                <ul>
                    {translations["languages"]
                        .filter((language) => language !== lang)
                        .map((language) => (
                            <li key={language} onClick={() => setLang(language)}>
                                {translations[language].language}
                            </li>
                        ))}
                </ul>
            </div>
        </header>
    );
}

export default Header;
