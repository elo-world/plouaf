import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("bzh");

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        storedLanguage ? setLang(storedLanguage) : localStorage.setItem("language", lang);
    }, [lang]);

    return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}
