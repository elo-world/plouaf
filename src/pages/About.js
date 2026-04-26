import React, { useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

function About() {
    const { lang } = useContext(LanguageContext);

    return (
        <div className="about">
            <h1>{translations[lang].About.title}</h1>
        </div>
    );
}

export default About;
