import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import App from "./App";
import RandomDraw from "./pages/RandomDraw";
import HeadsOrTails from "./pages/HeadsOrTails";
import Die from "./pages/Die";
import RandomNumberGenerator from "./pages/RandomNumberGenerator";
import About from "./pages/About";

// Language Provider
import { LanguageProvider } from "./context/LanguageContext";

// Import CSS
import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <LanguageProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<RandomDraw />} />
                        <Route path="random-draw" element={<RandomDraw />} />
                        <Route path="heads-or-tails" element={<HeadsOrTails />} />
                        <Route path="die" element={<Die />} />
                        <Route path="random-number-generator" element={<RandomNumberGenerator />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </HashRouter>
        </LanguageProvider>
    </React.StrictMode>,
);
