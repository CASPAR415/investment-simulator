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

  fetch("https://investment-backend-2-0l58.onrender.com/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personality: persona,
      initial_funds: funds
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("✅ init success:", data);
    document.getElementById("output").innerText = 
      `🎯 You selected ${personaNames[persona] || "Unknown"}.\nStarting funds: $${funds.toLocaleString()}`;
    document.getElementById("menu").classList.remove("hidden");
  })
  .catch(err => {
    console.error("❌ init failed", err);
    document.getElementById("output").innerText = "❌ Failed to initialize account.";
  });


  const personaNames = {
    type1: "Conservative——Benjamin Graham",
    type2: "Balanced——Charlie Munger",
    type3: "Aggressive——Peter Lynch",
    type4: "Radical——Elon Musk"
  };

  document.getElementById("output").innerText = 
    `🎯 You selected ${personaNames[persona] || "Unknown"}.\nStarting funds: $${funds.toLocaleString()}`;

  document.getElementById("menu").classList.remove("hidden");
}

function getAdvice() {
  const date = document.getElementById("price-month").value;
  if (!date) {
    document.getElementById("output").innerText = "❗ Please select a month before getting advice.";
    return;
  }

  fetch("https://investment-backend-2-0l58.onrender.com/advice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: date,
      personality: persona
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("output").innerText = `❌ ${data.error}`;
        return;
      }

      let output = `🧠 Investment Advice for ${date}:\n`;
      for (const rec of data.recommendations || []) {
        output += `📌 ${rec.company}\n- Action: ${rec.action}\n- Shares: ${rec.shares_to_transact}\n- Reason: ${rec.reason}\n- Confidence: ${rec.confidence}\n\n`;
      }

      document.getElementById("output").innerText = output.trim();
    })
    .catch(err => {
      document.getElementById("output").innerText = "❌ Error fetching advice.";
      console.error(err);
    });
}

// ✅ 1. 显示交易表单区域
function executeTrade() {
  document.getElementById("trade-form").classList.remove("hidden");
  document.getElementById("output").innerText = "📝 Please fill in the trade form below.";
}

// ✅ 2. 提交交易信息给后端
function submitTrade() {
  const symbol = document.getElementById("symbol").value.trim().toUpperCase();
  const action = document.getElementById("action").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const date = document.getElementById("price-month").value;

  if (!symbol || !quantity || !date) {
    document.getElementById("output").innerText = "❗ Please complete all trade fields.";
    return;
  }

  fetch("https://investment-backend-2-0l58.onrender.com/trade", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      symbol,
      action,
      quantity,
      date
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("output").innerText = `❌ ${data.error}`;
      } else {
        document.getElementById("output").innerText = `✅ ${data.message}`;
      }
      document.getElementById("trade-form").classList.add("hidden"); // 隐藏表单
    })
    .catch(err => {
      document.getElementById("output").innerText = "❌ Failed to execute trade.";
      console.error(err);
    });
}


function fetchHoldings() {
  fetch("https://investment-backend-2-0l58.onrender.com/holdings")
    .then(res => res.text())
    .then(data => {
      document.getElementById("output").innerText = data;
    })
    .catch(err => {
      document.getElementById("output").innerText = "❌ Error fetching holdings.";
      console.error(err);
    });
}

function togglePriceSection() {
  document.getElementById("price-section").classList.remove("hidden");
  document.getElementById("output").innerText = "📅 Please select a month to view price data.";
}

function viewPrices() {
  const date = document.getElementById("price-month").value;
  if (!date) {
    document.getElementById("output").innerText = "❗ Please select a valid month.";
    return;
  }

  fetch(`https://investment-backend-2-0l58.onrender.com/prices?date=${date}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("output").innerText = `❌ ${data.error}`;
        return;
      }

      let output = `📊 Price Data for ${date}:\n`;
      for (const [company, info] of Object.entries(data)) {
        const stock = info.stock || {};
        output += `${company}:\n  Price: $${stock.price}\n  Change: ${stock.change}\n  Volume: ${stock.volume}\n\n`;
      }

      document.getElementById("output").innerText = output.trim();
    })
    .catch(err => {
      document.getElementById("output").innerText = "❌ Error fetching price data.";
      console.error(err);
    });
}

function updateDate() {
  const currentDate = document.getElementById("price-month").value;
  if (!currentDate) {
    document.getElementById("output").innerText = "❗ Please select a month before updating.";
    return;
  }

  fetch("https://investment-backend-2-0l58.onrender.com/update-date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: currentDate
    })
  })
    .then(res => res.json())
    .then(data => {
      const newDate = data.new_date;
      document.getElementById("price-month").value = newDate;
      document.getElementById("output").innerText = `✅ Updated date to ${newDate}`;
    })
    .catch(err => {
      document.getElementById("output").innerText = "❌ Error updating date.";
      console.error(err);
    });
}

function exitSimulation() {
  document.getElementById("output").innerText = "👋 Thank you for using the simulator.";
}

// 页面加载后动态生成 2020-01 到 2024-12 的选项
window.onload = function () {
  const select = document.getElementById("price-month");
  for (let year = 2020; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      const m = month < 10 ? `0${month}` : `${month}`;
      const option = document.createElement("option");
      option.value = `${year}-${m}`;
      option.textContent = `${year}-${m}`;
      select.appendChild(option);
    }
  }
};
