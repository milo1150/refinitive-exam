async function thisIsSyncFunction(): Promise<number> {
  let result: number = 0;
  const url: string = 'http://codequiz.azurewebsites.net/data';
  try {
    // CORS Error.
    await fetch(url)
      .then((res) => res.json())
      .then((response) => {
        result = response.data;
      });
  } catch (err) {
    if (err) console.log(err);
  }
  return result;
}

const number1: Promise<number> = thisIsSyncFunction();
let calculation: number = 0;
number1
  .then((num) => {
    calculation = num * 10;
  })
  .then(() => console.log(calculation));
