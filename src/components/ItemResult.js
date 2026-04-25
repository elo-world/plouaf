import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { buildShareURL } from "../utils/shareUtils";

import DucksAnimation from "./DucksAnimation";

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
        const DUCK_HEIGHT = (document.body.clientHeight * 5) / 100;
        const DUCK_WIDTH = DUCK_HEIGHT * DUCK_RATIO;
        const SPACING = 8;

        let numberOfDuck = Math.round(document.body.clientWidth / (DUCK_WIDTH + SPACING)) * laneSize;

        let laneSide = [];
        for (let i = 0; i < numberOfDuck; i++) {
            const ducksIdx = Math.floor(Math.random() * ducks.length);
            laneSide.push(ducksIdx);
        }

        return laneSide;
    };

    const [ducksLane, setDucksLane] = useState({ left: generateDucksLane(1), right: generateDucksLane(3) });

    const reset = () => {
        setCopied(false);
        setPhase("animation");
        setDucksLane({ left: generateDucksLane(1), right: generateDucksLane(3) });
    };

    useEffect(() => {
        if (phase === "animation") {
            setTimeout(() => {
                setPhase("idle");
            }, 5000);
        }
    }, [ducks, phase]);

    return (
        <div className="item-result">
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
                Edit liste
            </button>

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
                className="action-buttons"
                style={{
                    bottom: `${phase === "idle" ? "calc(var(--icon-size) + 4 * var(--item-border-size) + var(--window-border-tb) + 2 * var(--item-padding-lr))" : "-100%"}`,
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
                        <p>{copied ? "✅ Copied!" : "🔗 Share"}</p>
                    </button>
                )}
                <button
                    className="other-result-button tertiary blue"
                    onClick={() => {
                        reset();
                        drawItem(selectedIndex);
                    }}
                >
                    <p>Autre résultat</p>
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
                    <p>{`Recommencer sans ${decompressItem}`}</p>
                </button>
            </div>
        </div>
    );
};

export default ItemResult;
