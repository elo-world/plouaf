import { useEffect, useState, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { buildShareURL } from "../utils/shareUtils";

import DucksAnimation from "./DucksAnimation";

import { LanguageContext } from "../context/LanguageContext";
import translations from "./Translations";

const windowLaneNumber = { true: 3, false: 2 };
const windowDuckSize = { true: 5, false: 7 };

const ItemResult = ({
    decompressItem,
    items,
    ducks,
    selectedIndex,
    itemIndex,
    drawItem,
    drawItemWithout,
    activeEditMode,
    isSharedResult,
}) => {
    const { lang } = useContext(LanguageContext);

    const ducksLaneRef = useRef(null);
    const location = useLocation();
    const [phase, setPhase] = useState("animation"); // animation -> idle
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const url = buildShareURL(location.pathname, items, itemIndex);

        if (navigator.share) {
            navigator
                .share({ title: "plouaf!", url })
                .then(() => {
                    setCopied(true); // show ✅ feedback after successful share too
                    setTimeout(() => setCopied(false), 5000);
                })
                .catch(() => {
                    // User cancelled or API unsupported — fall back silently
                    copyToClipboard(url);
                });
        } else {
            copyToClipboard(url);
        }
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
        });
    };

    const generateDucksLane = (laneSize) => {
        const DUCK_RATIO = 48 / 40;
        const DUCK_HEIGHT =
            (document.body.clientHeight * windowDuckSize[document.body.clientWidth < 900]) / 100;
        const DUCK_WIDTH = DUCK_HEIGHT * DUCK_RATIO;
        const SPACING = 8;

        let numberOfDuck = Math.round(document.body.clientWidth / (DUCK_WIDTH + SPACING)) * laneSize;

        let laneSide = [];
        for (let i = 0; i < numberOfDuck; i++) {
            const ducksIdx = Math.floor(Math.random() * selectedIndex.length);
            laneSide.push(selectedIndex[ducksIdx]);
        }

        return laneSide;
    };

    const [ducksLane, setDucksLane] = useState({
        left: generateDucksLane(1),
        right: generateDucksLane(windowLaneNumber[document.body.clientWidth < 900]),
    });

    const reset = () => {
        setCopied(false);
        setPhase("animation");
        setDucksLane({
            left: generateDucksLane(1),
            right: generateDucksLane(windowLaneNumber[document.body.clientWidth < 900]),
        });
        if (ducksLaneRef.current) {
            const DUCK_RATIO = 48 / 40;
            const DUCK_HEIGHT = (document.body.clientHeight * 5) / 100;
            const DUCK_WIDTH = DUCK_HEIGHT * DUCK_RATIO;
            const SPACING = 8;
            const startPos =
                3 * Math.round(document.body.clientWidth / (DUCK_WIDTH + SPACING)) * (DUCK_WIDTH + SPACING) +
                DUCK_WIDTH / 2 -
                document.body.clientWidth / 2;

            ducksLaneRef.current.style.transform = `translateX(-${startPos}px)`;
        }
    };

    useEffect(() => {
        if (phase === "animation") {
            setTimeout(() => {
                setPhase("idle");
            }, 5000);
        }
    }, [ducks, phase]);

    return (
        <section className="item-result">
            <div className="top">
                {isSharedResult && <p className="shared-result-banner">🎲 Shared result</p>}
                <button
                    className="edit-list-button"
                    onClick={() => {
                        activeEditMode();
                        reset();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-move-left-icon lucide-move-left"
                    >
                        <path d="M6 8L2 12L6 16" />
                        <path d="M2 12H22" />
                    </svg>
                    {translations[lang].pages.RandomDraw.ItemResult.edit_list}
                </button>
            </div>

            <DucksAnimation
                items={items}
                ducks={ducks}
                ducksLane={ducksLane}
                ducksLaneRef={ducksLaneRef}
                itemIndex={itemIndex}
                decompressItem={decompressItem}
                phase={phase}
            />

            <div
                className={`action-buttons ${phase}`}
                style={{
                    transform: `${phase === "idle" ? "translateY(0)" : "translateY(100vh)"}`,
                }}
            >
                {/* Share button — only shown when there is a real result */}
                {items.length > 0 && (
                    <button
                        className="share-button tertiary green"
                        onClick={() => {
                            setCopied(false);
                            handleShare();
                        }}
                    >
                        <p>
                            {copied
                                ? `✅ ${translations[lang].pages.RandomDraw.ItemResult.copied}`
                                : `🔗 ${translations[lang].pages.RandomDraw.ItemResult.share}`}
                        </p>
                    </button>
                )}
                <button
                    className="tertiary blue"
                    onClick={() => {
                        reset();
                        drawItem(selectedIndex);
                    }}
                >
                    <p>{translations[lang].pages.RandomDraw.ItemResult.another_result}</p>
                </button>
                <button
                    className="draw-without-button tertiary yellow"
                    style={{
                        display: `${selectedIndex.length > 2 ? "block" : "none"}`,
                    }}
                    onClick={() => {
                        reset();
                        drawItemWithout(selectedIndex, itemIndex);
                    }}
                >
                    <p>{`${translations[lang].pages.RandomDraw.ItemResult.start_over_without} ${decompressItem}`}</p>
                </button>
            </div>
        </section>
    );
};

export default ItemResult;
