import { useContext } from "react";
import Header from "./components/Header";
import Actions from "./components/Actions";
import { LanguageContext } from "./context/LanguageContext";
import translations from "./Translations";

function App() {
    const { lang } = useContext(LanguageContext);

    return (
        <div className="app">
            <Header />
            <p>{translations[lang].hello}</p>
            <Actions />
        </div>
    );
}

export default App;
