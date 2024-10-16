import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Waffle Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//initialize counter
let counter: number = 0;

//add button
const button = document.createElement("button");

button.textContent = "🧇";

button.style.cssText = `
  position: absolute;
  top: 25%; 
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
  width: 100px;         /* Width of the button */
  height: 100px;        /* Height of the button */
  border-radius: 50px;  /* Half of the width/height to make it circular */
  font-size: 40px;      /* Text size */
  background-color: #000000;  /* Button color */
  border: none;         /* Remove default border */
  cursor: pointer;      /* Pointer cursor on hover */
  display: flex;        
  justify-content: center; 
  align-items: center;
`;

// Create a new div element to display the counter
const counterDiv = document.createElement('div');
counterDiv.textContent = `${counter} waffles`;
counterDiv.style.marginTop = '10px';
counterDiv.style.fontSize = '18px';
counterDiv.style.textAlign = 'center'; // Center text in div
counterDiv.style.margin = '0 auto'; // Center the counter div

// Add an event listener to the button
button.addEventListener('click', () => {
    counter++; // Increase the counter by 1
    counterDiv.textContent = `${counter} waffles`; // Update the display
});

// Append
app.append(button);
app.append(counterDiv);
