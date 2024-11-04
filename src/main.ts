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

// Define the Item interface
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string; // New field for item description
}

// Create an array of available items
const availableItems: Item[] = [
  {
    name: "Frozen Waffles",
    cost: 10,
    rate: 0.1,
    description:
      "Why make more waffles when you can just buy them? They just need a litte time to thaw.",
  },
  {
    name: "Waffle Iron",
    cost: 100,
    rate: 2,
    description: "The best tool to make more warm and delicious waffles!",
  },
  {
    name: "Waffle Factory",
    cost: 1000,
    rate: 50,
    description:
      "Each factory can produce mutiple batches of waffles with great speed!",
  },
  {
    name: "Waffle Sancturary",
    cost: 5000,
    rate: 100,
    description:
      "Where waffles go to hide...ready for the taking. You can catch a lot there, just lure them in with some butter!",
  },
  {
    name: "Waffle Island",
    cost: 10000,
    rate: 250,
    description:
      "The perfect place to enjoy the syrup seas and harvest some waffles.",
  },
];

// Track purchase counts for each item
const upgradeCounts: number[] = new Array(availableItems.length).fill(0);

//******************************************************
//create elements

// Add increment waffle button
const waffleButton = document.createElement("button");

waffleButton.textContent = "🧇";

waffleButton.style.cssText = `
  position: absolute;
  top: 20%; 
  left: 20%;
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
upgradeCountsDiv.textContent = `Upgrades - Thawing Waffles: ${upgradeCounts[0]}, Irons: ${upgradeCounts[1]}, Factories: ${upgradeCounts[2]}, Sanctuaries: ${upgradeCounts[3]}, Islands: ${upgradeCounts[4]}`;
upgradeCountsDiv.style.fontSize = "18px";
upgradeCountsDiv.style.textAlign = "center"; // Center text in div

// Create upgrade buttons dynamically based on available items
const upgradeButtons: HTMLButtonElement[] = availableItems.map(
  (item, index) => {
    const button = document.createElement("button");
    button.textContent = `Buy ${item.name} (-${item.cost.toFixed(2)} waffles, +${item.rate.toFixed(1)}/sec)`;
    button.style.margin = "10px auto";
    button.disabled = true; // Start disabled
    button.dataset.index = index.toString(); // Store the index for later use
    return button;
  },
);

//******************************************************
//event handling

// Add an event listener to the waffle button
waffleButton.addEventListener("click", () => {
  counter++; // Increase the counter by 1 on button click
  counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display

  // Enable or disable the upgrade buttons based on the counter
  upgradeButtons.forEach((button, index) => {
    button.disabled = counter < availableItems[index].cost;
  });
});

// Add event listeners to the upgrade buttons (A B C)
upgradeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const item = availableItems[index];
    if (counter >= item.cost) {
      counter -= item.cost; // Deduct the current price from counter
      growthRate += item.rate; // Increment the growth rate by the item's rate
      upgradeCounts[index]++; // Increment upgrade count for the item
      item.cost *= PRICE_INCREASE_RATE; // Increase the cost for the item
      counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display
      growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} waffles/sec`; // Update growth rate display
      upgradeCountsDiv.textContent = `Upgrades - Thawing Waffles: ${upgradeCounts[0]}, Irons: ${upgradeCounts[1]}, Factories: ${upgradeCounts[2]}, Sanctuaries: ${upgradeCounts[3]}, Islands: ${upgradeCounts[4]}`; // Update upgrade counts
      button.textContent = `Buy ${item.name} (-${item.cost.toFixed(2)} waffles, +${item.rate.toFixed(1)}/sec)`; // Update button text
    }
  });
});

//******************************************************
// increment over time

// Increment counter - with requestAnimationFrame
const incrementCounter = (deltaTime: number) => {
  // Calculate how much to increment based on the delta time and growth rate
  counter += growthRate * deltaTime; // Increment counter
  counterDiv.textContent = `${Math.floor(counter)} waffles`; // Update the display
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} waffles/sec`; // Update growth rate display

  // Enable or disable the upgrade buttons based on the counter
  upgradeButtons.forEach((button, index) => {
    button.disabled = counter < availableItems[index].cost;
  });
};

const updateDeltaTime = (timestamp: number): number => {
  if (lastTimestamp !== null) {
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
    lastTimestamp = timestamp; // Update last timestamp
    return deltaTime;
  }
  return 0; // Return 0 if lastTimestamp is null
};

const animate = (timestamp: number) => {
  const deltaTime = updateDeltaTime(timestamp); // Calculate delta time
  incrementCounter(deltaTime); // Update counter based on time passed
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

upgradeButtons.forEach((button) => app.append(button));

// Display descriptions for each upgrade item
availableItems.forEach((item) => {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.textContent = `${item.name}: ${item.description}`;
  descriptionDiv.style.fontSize = "12px";
  descriptionDiv.style.textAlign = "center";
  app.append(descriptionDiv);
});
