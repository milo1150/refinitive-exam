"use strict";
async function thisIsSyncFunction() {
    let result = 0;
    const url = 'http://codequiz.azurewebsites.net/data';
    try {
        await fetch(url)
            .then((res) => res.json())
            .then((response) => {
            result = response.data;
        });
    }
    catch (err) {
        if (err)
            console.log(err);
    }
    return result;
}
const number1 = thisIsSyncFunction();
let calculation = 0;
number1
    .then((num) => {
    calculation = num * 10;
})
    .then(() => console.log(calculation));
