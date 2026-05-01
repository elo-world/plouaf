import React, { useCallback, useEffect, useMemo, useRef } from "react";

const DUCK_RATIO = 48 / 40;
const SPACING = 8;
const windowLaneNumber = { true: 3, false: 2 };
const windowDuckSize = { true: 5, false: 7 };

const DucksAnimation = ({ items, ducks, ducksLane, ducksLaneRef, itemIndex, decompressItem, phase }) => {
    const canvasLeftRef = useRef(null);
    const canvasRightRef = useRef(null);

    const { DUCK_HEIGHT, DUCK_WIDTH, startPos } = useMemo(() => {
        const DUCK_HEIGHT =
            (document.body.clientHeight * windowDuckSize[document.body.clientWidth < 900]) / 100;
        const DUCK_WIDTH = DUCK_HEIGHT * DUCK_RATIO;
        const numberOfDuck = Math.round(document.body.clientWidth / (DUCK_WIDTH + SPACING));
        const startPos =
            windowLaneNumber[document.body.clientWidth < 900] * numberOfDuck * (DUCK_WIDTH + SPACING) +
            DUCK_WIDTH / 2 -
            document.body.clientWidth / 2;
        return { DUCK_HEIGHT, DUCK_WIDTH, startPos };
    }, []);

    const spin = useCallback(() => {
        const numberOfDuck = Math.round(document.body.clientWidth / (DUCK_WIDTH + SPACING));

        ducksLaneRef.current.style.transform = `translateX(-${numberOfDuck * (DUCK_WIDTH + SPACING) + DUCK_WIDTH / 2 - document.body.clientWidth / 2}px)`;
    }, [DUCK_WIDTH, ducksLaneRef]);

    const drawOnCanva = useCallback(
        (canvas, ducksLaneSide) => {
            canvas.width = ducksLaneSide.length * (DUCK_WIDTH + SPACING);
            canvas.height = DUCK_HEIGHT + SPACING * 2;
            const ctx = canvas.getContext("2d");

            const ducksSources = [];
            for (const duck in ducks) {
                ducksSources.push(`./images/duck/${ducks[duck]}.svg`);
            }

            const ducksImg = [];
            ducksSources.forEach((src) => {
                const img = new Image();
                img.src = src;
                ducksImg.push(img);
            });

            Promise.all(ducksImg.map((img) => new Promise((res) => (img.onload = res)))).then(() => {
                for (let i = 0; i < ducksLaneSide.length; i++) {
                    ctx.drawImage(
                        ducksImg[ducksLaneSide[i]],
                        i * (DUCK_WIDTH + SPACING),
                        SPACING,
                        DUCK_WIDTH,
                        DUCK_HEIGHT,
                    );
                }
            });
        },
        [DUCK_WIDTH, DUCK_HEIGHT, ducks],
    );

    // In DucksAnimation, split the effect in two:

    // 1. Reset position when ducksLane changes (before spin)
    useEffect(() => {
        if (ducksLaneRef.current) {
            ducksLaneRef.current.style.transition = "none"; // disable transition instantly
            ducksLaneRef.current.style.transform = `translateX(-${startPos}px)`;
        }
        drawOnCanva(canvasLeftRef.current, ducksLane.left);
        drawOnCanva(canvasRightRef.current, ducksLane.right);
    }, [ducksLane, drawOnCanva, ducksLaneRef, startPos]);

    // 2. Trigger spin when phase becomes "animation"
    useEffect(() => {
        if (phase === "animation") {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // double rAF ensures the reset paint is committed
                    if (ducksLaneRef.current) {
                        ducksLaneRef.current.style.transition = ""; // restore transition
                    }
                    spin();
                });
            });
        }
    }, [phase, ducksLaneRef, spin]);

    return (
        <div className={`ducks-animation ${phase}`}>
            <div className="result">
                <img src="./images/random-draw/fishing-rod.svg" className="fishing-rod" alt="Fishing rod" />
                <p className="selected-item secondary" style={{ opacity: `${phase === "idle" ? "1" : "0"}` }}>
                    {items.length > 0 ? decompressItem : "No result"}
                </p>
            </div>
            <div
                className="ducks-lane"
                ref={ducksLaneRef}
                style={{
                    transform: `translateX(-${startPos}px)`,
                }}
            >
                <canvas
                    className="ducks"
                    ref={canvasLeftRef}
                    style={{ transform: `${phase === "idle" ? "translateY(50vh)" : "translateY(0)"}` }}
                ></canvas>
                <div
                    className={`slot-duck selected-duck ${ducks[itemIndex]}`}
                    style={{
                        width: `${DUCK_WIDTH + SPACING}px`,
                    }}
                >
                    <img
                        src={`./images/duck/${ducks[itemIndex]}.svg`}
                        alt={ducks[itemIndex]}
                        style={{
                            width: `${DUCK_WIDTH}px`,
                            height: `${DUCK_HEIGHT}px`,
                        }}
                    />
                </div>
                <canvas
                    className="ducks"
                    ref={canvasRightRef}
                    style={{ transform: `${phase === "idle" ? "translateY(50vh)" : "translateY(0)"}` }}
                ></canvas>
            </div>
            <div
                className="da-water"
                style={{ transform: `${phase === "idle" ? "translateY(50vh)" : "translateY(0)"}` }}
            />
        </div>
    );
};

export default DucksAnimation;
