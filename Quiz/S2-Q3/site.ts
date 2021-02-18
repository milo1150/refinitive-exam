import axios from 'axios';

/* TYPE */
interface RegDelChar {
  delChar: RegExp;
  change: RegExp;
}
interface RegValidate {
  isString: RegExp;
  isNumber: RegExp;
}
interface FundsNAV {
  [index: string]: number[];
}

/* VARIABLES */
const args: string = process.argv.slice(2).join('');
const url = 'https://codequiz.azurewebsites.net/';
const Reg: RegDelChar = {
  delChar: /[<td><td>r\s]/g,
  change: /[/]/g,
};
const RegCheck: RegValidate = {
  isString: /[A-Za-z-]/g,
  isNumber: /[0-9.]/g,
};

/* RUN */
function summary(str: string): void {
  let i: number = 0;
  let char: string = '';
  const obj: FundsNAV = {}; // Final value
  const arr: any[] = []; // For Fund Name stack
  while (i !== str.length - 1) {
    let charAt: string = str.charAt(i);
    if (charAt !== ',') char += charAt;
    else if (charAt === ',') {
      // when reach the comma then check that char string what's it be, string or number
      if (RegCheck.isString.test(char)) {
        obj[char] = [];
        arr.push(char.toString());
      } else if (RegCheck.isNumber.test(char)) {
        obj[arr[arr.length - 1]].push(parseFloat(char));
      }
      char = ''; // clear accumulate char
    }
    i++;
  }
  // OUTPUT
  if (obj[args] === undefined) {
    console.log('WRONG INPUT !!!!');
    return;
  } else console.log(obj[args][0]);
}

// Scrape
axios
  .get(url, {
    headers: {
      Cookie: 'hasCookie=true',
    },
  })
  .then((res) => {
    let str: string = res.data;
    const a: number = str.indexOf('B-INCOMESSF');
    str = str.substr(a, str.length);
    const b: number = str.indexOf('</table>');
    str = str.substring(0, b);
    str = str.replace(Reg.delChar, '');
    str = str.replace(Reg.change, ',');
    // console.log(str); // final valueable string.
    summary(str);
  });
