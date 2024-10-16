import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Waffle Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Initialize counter
let counter: number = 0;

// Initialize time stamp
let lastTimestamp: number = 0;

// Initialize growth rate
let growthRate: number = 0;

// Add button
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
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} waffles`;
counterDiv.style.marginTop = "10px";
counterDiv.style.fontSize = "18px";
counterDiv.style.textAlign = "center"; // Center text in div
counterDiv.style.margin = "0 auto"; // Center the counter div

// Create a new button for purchasing upgrades
const upgradeButton_1 = document.createElement('button');
upgradeButton_1.textContent = 'Buy Waffle Iron: makes 1 waffle/sec (-10 waffles)';
upgradeButton_1.disabled = true; // Start disabled

// Add an event listener to the button
button.addEventListener("click", () => {
  counter++; // Increase the counter by 1 on button click
  counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display

  // Enable or disable the upgrade button based on the counter
  upgradeButton_1.disabled = counter < 10;
});

// Add an event listener to the upgrade button
upgradeButton_1.addEventListener('click', () => {
  if (counter >= 10) {
      counter -= 10; // Deduct 10 units from counter
      growthRate += 1; // Increment the growth rate by 1
      counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display
      upgradeButton_1.disabled = counter < 10; // Update button state
  }
});

// Increment counter - with requestAnimationFrame
const incrementCounter = (deltaTime: number) => {
  // Calculate how much to increment based on the delta time and growth rate
  counter += growthRate * deltaTime; // Increment counter
  counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display

  // Enable or disable the upgrade button based on the counter
  upgradeButton_1.disabled = counter < 10;
};

// The animation loop
const animate = (timestamp: number) => {
  if (lastTimestamp !== null) {
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
    incrementCounter(deltaTime); // Update counter based on time passed
  }
  lastTimestamp = timestamp; // Update last timestamp
  requestAnimationFrame(animate); // Request the next frame
};

// Start the animation
requestAnimationFrame(animate);

// Append
app.append(button);
app.append(counterDiv);
app.append(upgradeButton_1);
