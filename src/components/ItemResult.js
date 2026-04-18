const ItemResult = ({
    editMode,
    decompressItem,
    items,
    selectedIndex,
    itemIndex,
    drawItem,
    drawItemWithout,
    activeEditMode,
}) => {
    return (
        <div className="item_result" style={{ display: `${!editMode ? "block" : "none"}` }}>
            <p>{items.length > 0 ? decompressItem : "No result"}</p>
            <div className="action_buttons">
                <button className="edit_list_button" onClick={activeEditMode}>
                    Edit liste
                </button>
                <button className="other_result_button" onClick={() => drawItem(selectedIndex)}>
                    Autre résultat
                </button>
                <button
                    className="draw_without_button"
                    style={{
                        display: `${selectedIndex.length > 2 ? "block" : "none"}`,
                    }}
                    onClick={() => drawItemWithout(selectedIndex, itemIndex)}
                >
                    {`Recommencer sans ${decompressItem}`}
                </button>
            </div>
        </div>
    );
};

export default ItemResult;
