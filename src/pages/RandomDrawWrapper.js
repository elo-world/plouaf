import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

import RandomDraw from "./RandomDraw";

const RandomDrawWrapper = () => {
    const { lang } = useContext(LanguageContext);
    return <RandomDraw lang={lang} />;
};

export default RandomDrawWrapper;
