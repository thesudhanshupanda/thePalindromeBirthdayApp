const input = document.querySelector("#input-birthday-date");
const showBotton = document.querySelector("#show-btn");
const output = document.querySelector("#output");

function reverseString(str) {
    const listOfChars = str.split('');
    const reversedList = listOfChars.reverse();
    const reversedStr = reversedList.join('');
    return reversedStr;
}

function isPalindrome(str) {
    const reverse = reverseString(str);
    return str === reverse;
}

function dateToString(date) {
    let dateStr = {
        day: '',
        month: '',
        year: ''
    }

    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString()
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString()
    }

    dateStr.year = date.year.toString()

    return dateStr
}

function allDateFormat(date) {
    const dateStr = dateToString(date)

    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeDates(date) {
    const palindromeList = allDateFormat(date)

    let flag = false

    for (let i = 0; i < palindromeList.length; i++) {
        if (isPalindrome(palindromeList[i])) {
            flag = true
            break
        }
    }
    return flag
}


function isLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false
}

function getNextDate(date) {
    let day = date.day + 1
    let month = date.month
    let year = date.year

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1
                month++
            }
        } else {
            if (day > 28) {
                day = 1
                month++
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1
            month++
        }
    }
    if (month > 12) {
        month = 1
        year++
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function nextPalindromeDate(date) {
    let ctr = 0
    let nextDate = getNextDate(date)

    while (1) {
        ctr++
        let isPalindrome = checkPalindromeDates(nextDate)

        if (isPalindrome) {
            break
        }
        nextDate = getNextDate(nextDate)
    }
    return [ctr, nextDate]
}

function clickHandler() {
    const bdayStr = input.value

    if (bdayStr !== "") {
        let dateList = bdayStr.split('-')
        let date = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        }

        const isPalindrome = checkPalindromeDates(date)
        if (isPalindrome) {
            output.innerText = "Yayy! Your Birthday Is A Palindrome! "
        } else {
            let [ctr, nextDate] = nextPalindromeDate(date)

            output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed it by ${ctr} days. `
        }
    }
    else {
        output.innerText =" Please  Enter your birthday date ";
    }
}

showBotton.addEventListener("click", clickHandler)