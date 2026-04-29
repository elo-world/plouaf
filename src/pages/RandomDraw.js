import { Component } from "react";
import LZString from "lz-string";
import EditList from "../components/EditList";
import ItemResult from "../components/ItemResult";
import { decodeShareParam } from "../utils/shareUtils";

class RandomDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            editMode: true,
            itemIndex: 0,
            items: [],
            ducks: [],
            duckChoices: ["yellow", "red", "green", "blue", "pink"],
            selectedIndex: [],
            decompressItem: "",
            // Share: true when the page was opened from a shared link
            isSharedResult: false,
        };
    }

    activeEditMode = () => {
        // Clear the share param from the URL when the user goes back to edit
        if (this.state.isSharedResult) {
            const { pathname } = this.props.location; // injected by withLocation HOC
            window.history.replaceState(null, "", `#${pathname}`);
        }
        this.setState({ editMode: true, isSharedResult: false });
    };

    drawItem = (items) => {
        let selectedIndexList = [];

        if (this.state.editMode === true) {
            selectedIndexList = Array.from({ length: this.state.items.length }, (_, i) => i);
            this.setState({ selectedIndex: selectedIndexList });
        } else {
            selectedIndexList = items;
        }

        const randomIndex = selectedIndexList[Math.floor(Math.random() * selectedIndexList.length)];

        this.setState({
            editMode: false,
            isSharedResult: false,
            itemIndex: randomIndex,
            decompressItem: LZString.decompress(this.state.items[randomIndex]),
        });

        // Clear share param from URL when a new draw is made
        const { pathname } = this.props.location;
        window.history.replaceState(null, "", `#${pathname}`);
    };

    drawItemWithout = (items, deselectedItemIndex) => {
        items.splice(deselectedItemIndex, 1);
        this.drawItem(items);
    };

    appendItem = (item) => {
        const input = item;
        if (input.replaceAll(" ", "") !== "") {
            const array = [...this.state.items, LZString.compress(item)];
            const duckArray = [
                ...this.state.ducks,
                this.state.duckChoices[Math.floor(Math.random() * this.state.duckChoices.length)],
            ];
            this.setState({ input: "", items: array, ducks: duckArray });
            localStorage.setItem("items", JSON.stringify(array));
            localStorage.setItem("ducks", JSON.stringify(duckArray));
        }
        document.getElementById("input-random-draw").focus();
    };

    removeItem = (index) => {
        const array = this.state.items;
        const duckArray = this.state.ducks;
        array.splice(index, 1);
        duckArray.splice(index, 1);
        this.setState({ items: array, ducks: duckArray });
        localStorage.setItem("items", JSON.stringify(array));
        localStorage.setItem("ducks", JSON.stringify(duckArray));
    };

    changeDuck = (index) => {
        const duckArray = [...this.state.ducks];
        const duckChoices = [...this.state.duckChoices];
        duckChoices.splice(duckChoices.indexOf(duckArray[index]), 1);
        duckArray.splice(index, 1);
        duckArray.splice(index, 0, duckChoices[Math.floor(Math.random() * duckChoices.length)]);
        this.setState({ ducks: duckArray });
        localStorage.setItem("ducks", JSON.stringify(duckArray));
    };

    removeAllItems = () => {
        this.setState({ items: [], ducks: [] });
        localStorage.setItem("items", JSON.stringify([]));
        localStorage.setItem("ducks", JSON.stringify([]));
    };

    onInputChange = (e) => {
        this.setState({ input: e.target.value });
    };

    readClipBoard = async () => {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                if (item.types.includes("text/plain")) {
                    const blob = await item.getType("text/plain");
                    this.importElement(blob);
                }
            }
        } catch {
            alert("Active the access to the clipboard in your tab");
        }
    };

    readFile = (e) => {
        this.importElement(e.target.files[0]);
    };

    importElement = async (file) => {
        if (file.size / (1024 * 1024) <= 1) {
            const reader = new FileReader();
            reader.onload = () => {
                const array = reader.result.split("\n");
                let compressArray = this.state.items;
                let duckArray = this.state.ducks;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].replaceAll(" ", "") !== "") {
                        compressArray.push(LZString.compress(array[i]));
                        duckArray.push(
                            this.state.duckChoices[Math.floor(Math.random() * this.state.duckChoices.length)],
                        );
                    }
                }
                this.setState({ items: compressArray, ducks: duckArray });
                localStorage.setItem("items", JSON.stringify(compressArray));
                localStorage.setItem("ducks", JSON.stringify(duckArray));
            };
            reader.readAsText(file);
        } else {
            alert("The file is bigger than 1MB");
        }
    };

    downloadList = () => {
        let decompressItems = [];
        for (const item of this.state.items) {
            decompressItems.push(LZString.decompress(item));
        }
        const text = decompressItems.join("\n");
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "plouaf.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    componentDidMount() {
        const array = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
        const duckArray = localStorage.getItem("ducks") ? JSON.parse(localStorage.getItem("ducks")) : [];
        this.setState({ items: array, ducks: duckArray });

        // ── Read shared result from URL ──────────────────────────────────────
        // HashRouter puts query params after the hash: /#/random-draw?result=…
        // window.location.hash is "#/random-draw?result=…", so we split on "?"
        const hashParts = window.location.hash.split("?");
        if (hashParts.length > 1) {
            const searchParams = new URLSearchParams(hashParts[1]);
            const raw = searchParams.get("result");
            if (raw) {
                const shared = decodeShareParam(raw);
                if (shared && typeof shared.drawn === "number" && Array.isArray(shared.items)) {
                    const drawnItem = LZString.decompress(shared.items[shared.drawn]) || "";
                    const selectedIndexList = Array.from({ length: shared.items.length }, (_, i) => i);
                    const sharedDucks = shared.items.map(
                        () =>
                            this.state.duckChoices[Math.floor(Math.random() * this.state.duckChoices.length)],
                    );

                    // Persist the imported list so it survives a page refresh
                    localStorage.setItem("items", JSON.stringify(shared.items));
                    localStorage.setItem("ducks", JSON.stringify(sharedDucks));

                    this.setState({
                        items: shared.items,
                        ducks: sharedDucks,
                        editMode: false,
                        isSharedResult: true,
                        itemIndex: shared.drawn,
                        decompressItem: drawnItem,
                        selectedIndex: selectedIndexList,
                    });
                }
            }
        }

        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.appendItem(e.target.value);
            }
        });
    }

    render() {
        return (
            <div className="random-draw">
                {this.state.editMode ? (
                    <EditList
                        items={this.state.items}
                        ducks={this.state.ducks}
                        selectedIndex={this.state.selectedIndex}
                        input={this.state.input}
                        readFile={this.readFile}
                        readClipBoard={this.readClipBoard}
                        onInputChange={this.onInputChange}
                        drawItem={this.drawItem}
                        appendItem={this.appendItem}
                        removeItem={this.removeItem}
                        changeDuck={this.changeDuck}
                        removeAllItems={this.removeAllItems}
                        dowloadList={this.downloadList}
                    />
                ) : (
                    <ItemResult
                        decompressItem={this.state.decompressItem}
                        items={this.state.items}
                        ducks={this.state.ducks}
                        selectedIndex={this.state.selectedIndex}
                        itemIndex={this.state.itemIndex}
                        drawItem={this.drawItem}
                        drawItemWithout={this.drawItemWithout}
                        activeEditMode={this.activeEditMode}
                        isSharedResult={this.state.isSharedResult}
                        location={this.props.location}
                    />
                )}
            </div>
        );
    }
}

export default RandomDraw;
