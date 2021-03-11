function checkDate(date) {
    const dateSplit = date.split('/', 3)
    // YYYY/MM/DD

    // Day
    if (dateSplit[2].length != 2 || dateSplit[2] <= 0 || dateSplit[2] > 31) return false
    // Month
    if (parseInt(dateSplit[1]) > 12 || parseInt(dateSplit[1]) <= 0) return false
    // Year
    if (parseInt(dateSplit[0]) < 1900 || parseInt(dateSplit[0]) > 2021) return false

    return true
}

module.exports = checkDate