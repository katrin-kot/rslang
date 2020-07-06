import {parseDate} from "./date";

export function getStatForToday(data) {
    let todayDate = (new Date).getDate(),
        todayStat = undefined
    while (!todayStat && todayDate > 0) {
        todayStat = data.optional.stats.find(el => parseDate(el.date).date == todayDate)
        todayDate--
        if (todayDate == 0) {
            todayStat = data.optional.stats[0]
        }
    }
    return todayStat;
}