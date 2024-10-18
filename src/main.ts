import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Waffle Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//******************************************************
//initialization
const PRICE_INCREASE_RATE = 1.15;

let counter: number = 0;
let growthRate: number = 0; // Initialize growth rate to zero
let lastTimestamp: number = 0; // Initialize timestamp for animation

let upgradeACount: number = 0; // Count for upgrade A
let upgradeBCount: number = 0; // Count for upgrade B
let upgradeCCount: number = 0; // Count for upgrade C

let priceA: number = 10; // Initial price for upgrade A
let priceB: number = 100; // Initial price for upgrade B
let priceC: number = 1000; // Initial price for upgrade C

//******************************************************
//create elements

// Add increment waffle button
const waffleButton = document.createElement("button");

waffleButton.textContent = "🧇";

waffleButton.style.cssText = `
  position: absolute;
  top: 20%; 
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

// Create new div to display upgradeCounts and growthRate
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} waffles/sec`;
growthRateDiv.style.fontSize = "18px";
growthRateDiv.style.textAlign = "center"; // Center text in div

const upgradeCountsDiv = document.createElement("div");
upgradeCountsDiv.textContent = `Upgrades - A: ${upgradeACount}, B: ${upgradeBCount}, C: ${upgradeCCount}`;
upgradeCountsDiv.style.fontSize = "18px";
upgradeCountsDiv.style.textAlign = "center"; // Center text in div

// Create buttons for purchasing upgrades
const upgradeAButton = document.createElement("button");
upgradeAButton.textContent = `Buy Frozen Waffles (${priceA.toFixed(2)} waffles, +0.1/sec)`;
upgradeAButton.style.margin = "10px auto";
upgradeAButton.disabled = true; // Start disabled

const upgradeBButton = document.createElement("button");
upgradeBButton.textContent = `Buy Waffle Iron (${priceB.toFixed(2)} waffles, +2.0/sec)`;
upgradeBButton.style.margin = "10px auto";
upgradeBButton.disabled = true; // Start disabled

const upgradeCButton = document.createElement("button");
upgradeCButton.textContent = `Buy Waffle Factory (${priceC.toFixed(2)} waffles, +50.0/sec)`;
upgradeCButton.style.margin = "10px auto";
upgradeCButton.disabled = true; // Start disabled

//******************************************************
//event handling

// Add an event listener to the waffle button
waffleButton.addEventListener("click", () => {
  counter++; // Increase the counter by 1 on button click
  counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display

  // Enable or disable the upgrade buttons based on the counter
  upgradeAButton.disabled = counter < priceA;
  upgradeBButton.disabled = counter < priceB;
  upgradeCButton.disabled = counter < priceC;
});

// Add event listeners to the upgrade buttons (A B C)
upgradeAButton.addEventListener("click", () => {
  if (counter >= priceA) {
    counter -= priceA; // Deduct price from counter
    growthRate += 0.1; // Increment the growth rate
    upgradeACount++; // Increment upgrade A count
    priceA *= PRICE_INCREASE_RATE; // Increase the price for the upgrade
    counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display
    growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} waffles/sec`; // Update growth rate display
    upgradeCountsDiv.textContent = `Upgrades - A: ${upgradeACount}, B: ${upgradeBCount}, C: ${upgradeCCount}`; // Update upgrade counts
    upgradeAButton.textContent = `Buy Frozen Waffles (${priceA.toFixed(2)} waffles, +0.1/sec)`; // Update button text
  }
});

upgradeBButton.addEventListener("click", () => {
  if (counter >= priceB) {
    counter -= priceB; // Deduct 100 units from counter
    growthRate += 2.0; // Increment the growth rate
    upgradeBCount++; // Increment upgrade B count
    priceB *= PRICE_INCREASE_RATE; // Increase the price for the upgrade
    counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display
    growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} waffles/sec`; // Update growth rate display
    upgradeCountsDiv.textContent = `Upgrades - A: ${upgradeACount}, B: ${upgradeBCount}, C: ${upgradeCCount}`; // Update upgrade counts
    upgradeBButton.textContent = `Buy Waffle Iron (${priceB.toFixed(2)} waffles, +2.0/sec)`; // Update button text
  }
});

upgradeCButton.addEventListener("click", () => {
  if (counter >= priceC) {
    counter -= priceC; // Deduct 1000 units from counter
    growthRate += 50.0; // Increment the growth rate
    upgradeCCount++; // Increment upgrade C count
    priceC *= PRICE_INCREASE_RATE; // Increase the price for the upgrade
    counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display
    growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} waffles/sec`; // Update growth rate display
    upgradeCountsDiv.textContent = `Upgrades - A: ${upgradeACount}, B: ${upgradeBCount}, C: ${upgradeCCount}`; // Update upgrade counts
    upgradeCButton.textContent = `Buy Waffle Factory (${priceC.toFixed(2)} waffles, +50.0/sec)`; // Update button text
  }
});

//******************************************************
// increment handling

// Increment counter - with requestAnimationFrame
const incrementCounter = (deltaTime: number) => {
  // Calculate how much to increment based on the delta time and growth rate
  counter += growthRate * deltaTime; // Increment counter
  counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} waffles/sec`; // Update growth rate display

  // Enable or disable the upgrade buttons based on the counter
  upgradeAButton.disabled = counter < priceA;
  upgradeBButton.disabled = counter < priceB;
  upgradeCButton.disabled = counter < priceC;
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

//******************************************************

// Append
app.append(waffleButton);
app.append(counterDiv);
app.append(growthRateDiv);
app.append(upgradeCountsDiv);
app.append(upgradeAButton);
app.append(upgradeBButton);
app.append(upgradeCButton);
