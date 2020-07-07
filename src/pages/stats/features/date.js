export function parseDate(dateStr) {
    const [date, month, year] = dateStr.trim().split(".")
    return {date: +date, month: month - 1, year: +year}
}