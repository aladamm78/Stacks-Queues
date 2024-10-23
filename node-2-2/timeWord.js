function timeWords(time) {
    const [hour, minute] = time.split(":").map(Number);

    const numToWord = {
        0: "twelve", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
        6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven",
        12: "twelve", 13: "one", 14: "two", 15: "three", 16: "four", 17: "five",
        18: "six", 19: "seven", 20: "eight", 21: "nine", 22: "ten", 23: "eleven"
    };

    const minuteToWord = {
        0: "o’clock", 1: "oh one", 2: "oh two", 3: "oh three", 4: "oh four",
        5: "oh five", 6: "oh six", 7: "oh seven", 8: "oh eight", 9: "oh nine"
    };

    if (time === "00:00") return "midnight";
    if (time === "12:00") return "noon";

    const isAM = hour < 12;
    const period = isAM ? "am" : "pm";
    const hourWord = numToWord[hour];
    
    let minuteWord;
    if (minute === 0) {
        minuteWord = "o’clock";
    } else if (minute < 10) {
        minuteWord = minuteToWord[minute];
    } else {
        minuteWord = minute < 30 ? minuteToWord[minute] : numToWord[minute];
    }

    return `${hourWord} ${minuteWord} ${period}`;
}
module.exports = timeWords;