"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const args = process.argv.slice(2).join('');
const url = 'https://codequiz.azurewebsites.net/';
const Reg = {
    delChar: /[<td><td>r\s]/g,
    change: /[/]/g,
};
const RegCheck = {
    isString: /[A-Za-z-]/g,
    isNumber: /[0-9.]/g,
};
function summary(str) {
    let i = 0;
    let char = '';
    const obj = {};
    const arr = [];
    while (i !== str.length - 1) {
        let charAt = str.charAt(i);
        if (charAt !== ',')
            char += charAt;
        else if (charAt === ',') {
            if (RegCheck.isString.test(char)) {
                obj[char] = [];
                arr.push(char.toString());
            }
            else if (RegCheck.isNumber.test(char)) {
                obj[arr[arr.length - 1]].push(parseFloat(char));
            }
            char = '';
        }
        i++;
    }
    if (obj[args] === undefined) {
        console.log('WRONG INPUT !!!!');
        return;
    }
    else
        console.log(obj[args][0]);
}
axios_1.default
    .get(url, {
    headers: {
        Cookie: 'hasCookie=true',
    },
})
    .then((res) => {
    let str = res.data;
    const a = str.indexOf('B-INCOMESSF');
    str = str.substr(a, str.length);
    const b = str.indexOf('</table>');
    str = str.substring(0, b);
    str = str.replace(Reg.delChar, '');
    str = str.replace(Reg.change, ',');
    summary(str);
});
