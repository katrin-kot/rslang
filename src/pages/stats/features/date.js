export function parseDate(dateStr) {
    const [date, month, year] = dateStr.split(".")
    return {date: +date, month: month - 1, year: +year}
}