import { useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Components
import Header from "./js/components/Header";
import ActionsBar from "./js/components/ActionsBar";
import Menu from "./js/components/Menu";

const App = () => {
    const [showLanguagesMenu, setShowLanguagesMenu] = useState(false);
    const [statusMenu, setStatusMenu] = useState("load");

    const [isMenuOpen, setMenuOpen] = useState(false);

    // Function to toggle the menu.
    const toggleMenu = useCallback(() => {
        setMenuOpen((open) => !open);
    }, []);

    const { pathname } = useLocation();

    const toggleLanguagesMenu = () => {
        if (statusMenu === "load") setStatusMenu("hide");
        setShowLanguagesMenu((show) => !show);
    };

    return (
        <div
            className="app"
            onClick={() => {
                if (showLanguagesMenu) toggleLanguagesMenu();
            }}
        >
            <Header show={showLanguagesMenu} status={statusMenu} toggleMenu={toggleLanguagesMenu} />
            <Outlet /> {/* Content of the page. */}
            {pathname !== "/about" && (
                <>
                    <ActionsBar path={pathname.substring(1)} toggleMenu={toggleMenu} />
                    <Menu isOpen={isMenuOpen} toggle={toggleMenu} />
                </>
            )}
        </div>
    );
};

export default App;
