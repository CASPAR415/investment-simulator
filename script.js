let funds = 0;
let holdings = {};

function startGame() {
  const personality = document.getElementById("personality").value;
  if (!personality) {
    alert("Please select an investor personality.");
    return;
  }

  const fundMap = {
    conservative: 10000,
    balanced: 20000,
    growth: 30000,
    aggressive: 40000
  };

  funds = fundMap[personality];
  document.getElementById("initial-funds").textContent = `Initial Funds: $${funds}`;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function getAdvice() {
  document.getElementById("output").textContent = "Invest in AAPL this month.";
}

function executeTrade() {
  if (funds < 1000) {
    document.getElementById("output").textContent = "Not enough funds to execute trade.";
    return;
  }
  funds -= 1000;
  holdings["AAPL"] = (holdings["AAPL"] || 0) + 1;
  document.getElementById("output").textContent = "Bought 1 share of AAPL. Remaining funds: $" + funds;
}

function viewHoldings() {
  let text = "Your Holdings:\n";
  for (let stock in holdings) {
    text += `${stock}: ${holdings[stock]} shares\n`;
  }
  if (text === "Your Holdings:\n") text += "None.";
  document.getElementById("output").textContent = text;
}

function viewPrices() {
  const prices = {
    AAPL: "$190",
    TSLA: "$650",
    MSFT: "$310"
  };
  let text = "Current Prices:\n";
  for (let stock in prices) {
    text += `${stock}: ${prices[stock]}\n`;
  }
  document.getElementById("output").textContent = text;
}

function exitGame() {
  location.reload();
}
