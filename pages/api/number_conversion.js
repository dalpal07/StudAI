export default function number_conversion(col, entries) {
    entries.forEach(entry => {
        entry[col] = Number(entry[col]);
    })
    return entries;
}