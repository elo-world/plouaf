import LZString from "lz-string";

/**
 * Encodes a draw result into a URL-safe string.
 * Items are kept LZ-compressed to stay lightweight.
 *
 * @param {string[]} items      - Array of LZ-compressed item strings
 * @param {number}   drawnIndex - Index of the drawn item
 * @returns {string} URL-safe encoded string
 */
export function encodeShareParam(items, drawnIndex) {
    const payload = { items, drawn: drawnIndex };
    const json = JSON.stringify(payload);
    // LZString gives a compact, URL-safe base64 string
    return LZString.compressToEncodedURIComponent(json);
}

/**
 * Decodes a share param from the URL back into draw data.
 *
 * @param {string} param - The raw value of the `result` query parameter
 * @returns {{ items: string[], drawn: number } | null}
 */
export function decodeShareParam(param) {
    try {
        const json = LZString.decompressFromEncodedURIComponent(param);
        if (!json) return null;
        const payload = JSON.parse(json);
        if (
            Array.isArray(payload.items) &&
            typeof payload.drawn === "number"
        ) {
            return payload;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Builds the full shareable URL for a draw result.
 * Works with HashRouter: result param goes after the hash path.
 *
 * @param {string} pathname   - Current hash path, e.g. "/random-draw"
 * @param {string[]} items    - Array of LZ-compressed item strings
 * @param {number} drawnIndex - Index of the drawn item
 * @returns {string} Full shareable URL
 */
export function buildShareURL(pathname, items, drawnIndex) {
    const encoded = encodeShareParam(items, drawnIndex);
    // HashRouter uses the format: origin/#/path?param=value
    return `${window.location.origin}${window.location.pathname}#${pathname}?result=${encoded}`;
}
