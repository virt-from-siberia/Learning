//nNOTE:BASIC

function sumFibs(num) {
    let prevNumber = 0;
    let currNumber = 1;
    let result = 0;
    while (currNumber <= num) {
        if (currNumber % 2 !== 0) {
            result += currNumber;
        }

        currNumber += prevNumber;
        prevNumber = currNumber - prevNumber;
    }
}

console.log(sumFibs(4));


//NOTE:INTERMEDIADE


//NOTE:ADVANCED


///NOTE:ADVANCED 2