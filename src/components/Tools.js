const Tools = ({ items, readFile, readClipBoard, dowloadList, removeAllItems }) => {
    return (
        <div className="tools">
            <ul>
                <li>
                    <button
                        className="tertiary red"
                        style={{ display: `${items.length > 0 ? "flex" : "none"}` }}
                        onClick={removeAllItems}
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
                            class="lucide lucide-trash-icon lucide-trash"
                        >
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Tout supprimer
                    </button>
                </li>
                <li>
                    <button className="tertiary yellow">
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
                            class="lucide lucide-import-icon lucide-import"
                        >
                            <path d="M12 3v12" />
                            <path d="m8 11 4 4 4-4" />
                            <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
                        </svg>
                        <label htmlFor="file">Importer une liste</label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept="image/png, image/jpeg, text/plain"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                readFile(e);
                            }}
                        />
                    </button>
                </li>
                <li>
                    <button className="tertiary green" onClick={readClipBoard}>
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
                            class="lucide lucide-clipboard-paste-icon lucide-clipboard-paste"
                        >
                            <path d="M11 14h10" />
                            <path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
                            <path d="m17 18 4-4-4-4" />
                            <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
                            <rect x="8" y="2" width="8" height="4" rx="1" />
                        </svg>
                        Paste List
                    </button>
                </li>
                <li>
                    <button
                        className="tertiary blue"
                        style={{ display: `${items.length < 2 ? "none" : "flex"}` }}
                        onClick={dowloadList}
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
                            class="lucide lucide-arrow-right-from-line-icon lucide-arrow-right-from-line"
                        >
                            <path d="M3 5v14" />
                            <path d="M21 12H7" />
                            <path d="m15 18 6-6-6-6" />
                        </svg>
                        Export
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Tools;
