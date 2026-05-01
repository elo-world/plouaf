import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import RandomDraw from "./RandomDraw";
import translations from "../components/Translations";

const RandomDrawWrapper = () => {
    const { lang } = useContext(LanguageContext);
    const location = useLocation();

    useEffect(() => {
        document.title = `plouaf! - ${translations[lang].pages.RandomDraw.title}`;
    }, [lang]);

    return <RandomDraw location={location} />;
};

export default RandomDrawWrapper;
