import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function Header() {
    const { setLang } = useContext(LanguageContext);

    return (
        <header>
            <img src="./images/logo/typo.svg" alt="Logo typographique" />
            <div className="languages">
                <button>
                    <img src="./images/icons/world.svg" alt="Language icon" />
                    Français
                </button>
                <ul>
                    <li onClick={() => setLang("bzh")}>Brezhoneg</li>
                    <li onClick={() => setLang("cor")}>Corsa</li>
                    <li onClick={() => setLang("uk")}>українська</li>
                    <li onClick={() => setLang("en")}>English</li>
                    <li onClick={() => setLang("es")}>Español</li>
                    <li onClick={() => setLang("it")}>Italiano</li>
                    <li onClick={() => setLang("it")}>Deutch</li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
