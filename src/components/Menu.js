import { useRef, useEffect, useCallback, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const Menu = ({ isOpen, toggle }) => {
    const sheetRef = useRef(null);
    const startY = useRef(0);
    const currentY = useRef(0);
    const maxY = useRef(0);

    const { lang } = useContext(LanguageContext);

    const navigate = useNavigate();

    const onDragStart = (e) => {
        startY.current = (e.touches ? e.touches[0] : e).clientY;
        sheetRef.current.style.transition = "none";
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("touchmove", onDrag, { passive: false });
        window.addEventListener("mouseup", onDragEnd);
        window.addEventListener("touchend", onDragEnd);
    };

    const onDrag = (e) => {
        e.preventDefault();
        const clientY = (e.touches ? e.touches[0] : e).clientY;
        const delta = clientY - startY.current;
        let y = currentY.current + delta;
        y = Math.max(0, Math.min(maxY.current, y));
        sheetRef.current.style.transform = `translateY(${y}px)`;
    };

    const onDragEnd = () => {
        const halfway = maxY.current / 2;
        const match = sheetRef.current.style.transform.match(/-?\d+(\.\d+)?/);
        const y = match ? parseFloat(match[0]) : currentY.current;
        const close = y > halfway;
        snapTo(close ? maxY.current : 0);

        if (close === isOpen) toggle();

        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("touchmove", onDrag);
        window.removeEventListener("mouseup", onDragEnd);
        window.removeEventListener("touchend", onDragEnd);
    };

    const navigateTo = (path) => {
        toggle();
        navigate(path);
    };

    const snapTo = useCallback((y) => {
        const s = sheetRef.current.style;
        s.transition = "transform 300ms ease";
        s.transform = `translateY(${y}px)`;
        currentY.current = y;
    }, []);

    useEffect(() => {
        const sheet = sheetRef.current;
        sheet.style.visibility = "hidden";

        requestAnimationFrame(() => {
            const rect = sheet.getBoundingClientRect();
            maxY.current = rect.height;
            sheet.style.transform = `translateY(${rect.height}%)`;
            currentY.current = rect.height;
            sheet.style.visibility = "visible";
        });
    }, []);

    useEffect(() => {
        if (maxY.current === 0) return;
        snapTo(isOpen ? 0 : maxY.current);
    }, [isOpen, snapTo]);

    return (
        <div ref={sheetRef} className="menu" onMouseDown={onDragStart} onTouchStart={onDragStart}>
            <div className="menu-handle" />
            <div className="menu-content">
                <ul>
                    <li>
                        <button className="secondary fullwidth" onClick={() => navigateTo("/random-draw")}>
                            {translations[lang].pages.RandomDraw.title}
                            <img src="./images/menu/random-draw.svg" alt="Random Draw" />
                        </button>
                    </li>
                    <li>
                        <button className="secondary fullwidth" onClick={() => navigateTo("/heads-or-tails")}>
                            {translations[lang].pages.HeadsOrTails.title}
                            <img src="./images/menu/heads-or-tails.svg" alt="Heads or Tails" />
                        </button>
                    </li>
                    <li>
                        <button className="secondary fullwidth" onClick={() => navigateTo("/die")}>
                            {translations[lang].pages.Die.title}
                            <img src="./images/menu/die.svg" alt="Die" />
                        </button>
                    </li>
                    <li>
                        <button
                            className="secondary fullwidth"
                            onClick={() => navigateTo("/random-number-generator")}
                        >
                            {translations[lang].pages.RandomNumberGenerator.title}
                            <img
                                src="./images/menu/random-number-generator.svg"
                                alt="Random Number Generator"
                            />
                        </button>
                    </li>
                </ul>
                <Link to="/about">À propos de plouaf!</Link>
            </div>
        </div>
    );
};

export default Menu;
