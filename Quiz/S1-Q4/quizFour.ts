const getRandomRGB = (): string => {
  const r: number = Math.floor(Math.random() * Math.floor(255));
  const g: number = Math.floor(Math.random() * Math.floor(255));
  const b: number = Math.floor(Math.random() * Math.floor(255));
  return `rgb(${r},${g},${b})`;
};
const colorPicker = document.getElementById('colorPicker');

// ANSWER
function ans(e: Event): void {
  const buttonElement = e.target as HTMLButtonElement;
  const answerBox = document.getElementById('answerBox') as HTMLDivElement;
  answerBox.innerHTML = buttonElement.id;
}

for (let i = 0; i < 10000; ++i) {
  const btn = document.createElement('button');
  const rgb = getRandomRGB();
  btn.id = rgb;
  btn.textContent = rgb;
  btn.style.backgroundColor = rgb;
  btn.onclick = (e) => ans(e); 
  if (colorPicker) {
    colorPicker.appendChild(btn);
  }
}
