import React, { useContext } from "react";

import LZString from "lz-string";
import Tools from "./Tools";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../components/Translations";

const EditList = ({
    items,
    ducks,
    selectedIndex,
    input,
    readFile,
    readClipBoard,
    dowloadList,
    onInputChange,
    drawItem,
    appendItem,
    removeItem,
    changeDuck,
    removeAllItems,
}) => {
    const { lang } = useContext(LanguageContext);

    return (
        <section className="edit-list">
            <p>{translations[lang].pages.RandomDraw.EditList.presentation}</p>
            <div className="items">
                {items.map((item, index) => {
                    if (item !== "") {
                        const decompressItem = LZString.decompress(item) || "";
                        return (
                            <div key={index} className={`item item-${index}`}>
                                <img
                                    onClick={() => changeDuck(index)}
                                    src={`./images/duck/${ducks[index]}.svg`}
                                    alt="Duck"
                                />
                                <div className="text">
                                    <p>{decompressItem}</p>
                                </div>
                                <button className="delete-button" onClick={() => removeItem(index)}>
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
                                        className="lucide lucide-delete-icon lucide-delete"
                                    >
                                        <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                                        <path d="m12 9 6 6" />
                                        <path d="m18 9-6 6" />
                                    </svg>
                                </button>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <button
                className="draw-lots primary"
                disabled={items.length >= 2 ? false : true}
                onClick={() => drawItem(selectedIndex)}
            >
                <p>{translations[lang].pages.RandomDraw.EditList.draw}</p>
            </button>
            <Tools
                items={items}
                readFile={readFile}
                readClipBoard={readClipBoard}
                dowloadList={dowloadList}
                removeAllItems={removeAllItems}
            />
            <div className="input-box">
                <div className="input-bar">
                    <input
                        id="input-random-draw"
                        type="text"
                        placeholder={translations[lang].pages.RandomDraw.EditList.input_placeholder}
                        value={input}
                        onChange={(e) => onInputChange(e)}
                    />
                    <button
                        className="append-button"
                        onClick={(e) => {
                            appendItem(document.getElementById("input-random-draw").value);
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
                            className="lucide lucide-arrow-up-icon lucide-arrow-up"
                        >
                            <path d="m5 12 7-7 7 7" />
                            <path d="M12 19V5" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EditList;
