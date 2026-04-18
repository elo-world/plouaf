import LZString from "lz-string";
import Tools from "./Tools";

const EditList = ({
    editMode,
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
    return (
        <div className="edit-list" style={{ display: `${editMode ? "flex" : "none"}` }}>
            <p>Ajoutez des éléments puis tirer au sort !</p>
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
                                <p>{decompressItem}</p>
                                <button className="delete-button" onClick={() => removeItem(index)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-delete-icon lucide-delete"
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
                <p>Tirer au sort</p>
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
                        id="input"
                        type="text"
                        placeholder="Enter your items"
                        value={input}
                        onChange={(e) => onInputChange(e)}
                    />
                    <button
                        className="append-button"
                        onClick={(e) => {
                            appendItem(document.getElementById("input").value);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-arrow-up-icon lucide-arrow-up"
                        >
                            <path d="m5 12 7-7 7 7" />
                            <path d="M12 19V5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditList;
