let persona = "";
let funds = 0;

function setPersona() {
  const selected = document.getElementById("persona").value;
  persona = selected;

  switch (persona) {
    case "type1": funds = 10000; break;
    case "type2": funds = 50000; break;
    case "type3": funds = 100000; break;
    case "type4": funds = 200000; break;
    default: funds = 0;
  }

  document.getElementById("output").textContent = `🎯 You selected ${persona}. Starting funds: $${funds}.`;
  document.getElementById("menu").classList.remove("hidden");
}

// 模拟功能占位
function getAdvice() {
  document.getElementById("output").textContent = "📈 Suggested: Buy AAPL this month.";
}

function executeTrade() {
  document.getElementById("output").textContent = "✅ Trade executed!";
}

function viewHoldings() {
  document.getElementById("output").textContent = "📦 Holdings: AAPL (50), TSLA (30)";
}

function viewPrices() {
  document.getElementById("output").textContent = "📊 Prices: AAPL $190, TSLA $720";
}

function exit() {
  document.getElementById("output").textContent = "👋 Thank you for using the simulator.";
}
