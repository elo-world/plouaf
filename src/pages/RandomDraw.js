import { Component } from "react";
import LZString from "lz-string";
import EditList from "../components/EditList";
import ItemResult from "../components/ItemResult";

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
        };
    }

    activeEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    drawItem = (items) => {
        let selectedIndexList = [];

        if (this.state.editMode === true) {
            selectedIndexList = Array.from({ length: this.state.items.length }, (_, i) => i);
            this.setState({
                selectedIndex: selectedIndexList,
            });
        } else {
            selectedIndexList = items;
        }

        const randomIndex = selectedIndexList[Math.floor(Math.random() * selectedIndexList.length)];

        this.setState({
            editMode: false,
            itemIndex: randomIndex,
            decompressItem: LZString.decompress(this.state.items[randomIndex]),
        });
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
            this.setState({
                input: "",
                items: array,
                ducks: duckArray,
            });
            localStorage.setItem("items", JSON.stringify(array));
            localStorage.setItem("ducks", JSON.stringify(duckArray));
        }

        document.getElementById("input").focus();
    };

    removeItem = (index) => {
        const array = this.state.items;
        const duckArray = this.state.ducks;
        array.splice(index, 1);
        duckArray.splice(index, 1);
        this.setState({
            items: array,
            ducks: duckArray,
        });
        localStorage.setItem("items", JSON.stringify(array));
        localStorage.setItem("ducks", JSON.stringify(duckArray));
    };

    changeDuck = (index) => {
        const duckArray = [...this.state.ducks];
        const duckChoices = [...this.state.duckChoices];

        duckChoices.splice(duckChoices.indexOf(duckArray[index]), 1);

        duckArray.splice(index, 1);
        console.log(duckChoices, duckChoices[Math.floor(Math.random() * duckChoices.length)]);

        duckArray.splice(index, 0, duckChoices[Math.floor(Math.random() * duckChoices.length)]);

        this.setState({
            ducks: duckArray,
        });
        localStorage.setItem("ducks", JSON.stringify(duckArray));
    };

    removeAllItems = () => {
        this.setState({
            items: [],
            ducks: [],
        });

        localStorage.setItem("items", JSON.stringify([]));
        localStorage.setItem("ducks", JSON.stringify([]));
    };

    onInputChange = (e) => {
        this.setState({
            input: e.target.value,
        });
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
                let duckArray = [];
                for (var i = 0; i < array.length; i++) {
                    if (array[i].replaceAll(" ", "") !== "") {
                        compressArray.push(LZString.compress(array[i]));
                        duckArray.push(
                            this.state.duckChoices[Math.floor(Math.random() * this.state.duckChoices.length)],
                        );
                    }
                }
                this.setState({
                    items: compressArray,
                    ducks: duckArray,
                });
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
        const filename = "plouaf.txt";

        const blob = new Blob([text], { type: "text/plain" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(link.href);
    };

    componentDidMount() {
        const array = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
        const duckArray = localStorage.getItem("ducks") ? JSON.parse(localStorage.getItem("ducks")) : [];

        this.setState({
            items: array,
            ducks: duckArray,
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.appendItem(e.target.value);
            }
        });
    }

    render() {
        return (
            <div className="random-draw">
                <EditList
                    editMode={this.state.editMode}
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
                <ItemResult
                    editMode={this.state.editMode}
                    decompressItem={this.state.decompressItem}
                    items={this.state.items}
                    selectedIndex={this.state.selectedIndex}
                    itemIndex={this.state.itemIndex}
                    drawItem={this.drawItem}
                    drawItemWithout={this.drawItemWithout}
                    activeEditMode={this.activeEditMode}
                />
            </div>
        );
    }
}

export default RandomDraw;
