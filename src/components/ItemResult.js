import { useState } from "react";
import { useLocation } from "react-router-dom";
import { buildShareURL } from "../utils/shareUtils";

const ItemResult = ({
    editMode,
    decompressItem,
    items,
    selectedIndex,
    itemIndex,
    drawItem,
    drawItemWithout,
    activeEditMode,
    isSharedResult,
}) => {
    const location = useLocation();
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const url = buildShareURL(location.pathname, items, itemIndex);

        if (navigator.share) {
            navigator.share({ title: "plouaf!", url }).catch(() => {
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
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="item-result" style={{ display: `${!editMode ? "block" : "none"}` }}>
            {isSharedResult && (
                <p className="shared-result-banner">🎲 Shared result</p>
            )}
            <p>{items.length > 0 ? decompressItem : "No result"}</p>
            <div className="action-buttons">
                <button className="edit-list-button" onClick={activeEditMode}>
                    Edit liste
                </button>
                {/* Share button — only shown when there is a real result */}
                {items.length > 0 && (
                    <button className="share-button" onClick={handleShare}>
                        {copied ? "✅ Copied!" : "🔗 Share"}
                    </button>
                )}
                <button className="other-result-button" onClick={() => drawItem(selectedIndex)}>
                    Autre résultat
                </button>
                <button
                    className="draw-without-button"
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
