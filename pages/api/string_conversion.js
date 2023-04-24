export default function string_conversion(col, entries) {
    entries.forEach(entry => {
        if (entry[col].includes(",")) {
            entry[col] = "\"" + entry[col] + "\"";
        }
    })
    return entries;
}