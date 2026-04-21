import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import RandomDraw from "./RandomDraw";

const RandomDrawWrapper = () => {
    const { lang } = useContext(LanguageContext);
    const location = useLocation();
    return <RandomDraw lang={lang} location={location} />;
};

export default RandomDrawWrapper;
