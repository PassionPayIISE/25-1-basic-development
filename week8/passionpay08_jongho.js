// script.js
const entryForm = document.getElementById("entryForm");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const entryTable = document.querySelector("#entryTable tbody");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const chartCanvas = document.getElementById("categoryChart");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

dateInput.valueAsDate = new Date();

entryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const entry = {
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    description: descriptionInput.value,
    date: dateInput.value || new Date().toISOString().split('T')[0],
    id: Date.now()
  };
  entries.push(entry);
  saveEntries();
  render();
  entryForm.reset();
});

function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function deleteEntry(id) {
  entries = entries.filter(entry => entry.id !== id);
  saveEntries();
  render();
}

function render() {
  entryTable.innerHTML = "";
  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
  let income = 0, expense = 0;
  let categoryTotals = {};

  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const thisYear = now.getFullYear();
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  let thisMonthExpense = 0;
  let lastMonthExpense = 0;

  sorted.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.amount.toLocaleString()}</td>
      <td>${entry.category}</td>
      <td>${entry.description}</td>
      <td><button onclick="deleteEntry(${entry.id})">삭제</button></td>
    `;
    entryTable.appendChild(row);

    const entryDate = new Date(entry.date);
    const entryMonth = entryDate.getMonth();
    const entryYear = entryDate.getFullYear();

    if (entry.amount >= 0) income += entry.amount;
    else expense += entry.amount;

    if (entry.amount < 0) {
      categoryTotals[entry.category] = (categoryTotals[entry.category] || 0) + Math.abs(entry.amount);

      if (entryMonth === thisMonth && entryYear === thisYear) {
        thisMonthExpense += Math.abs(entry.amount);
      } else if (entryMonth === lastMonth && entryYear === lastMonthYear) {
        lastMonthExpense += Math.abs(entry.amount);
      }
    }
  });

  incomeEl.textContent = income.toLocaleString();
  expenseEl.textContent = Math.abs(expense).toLocaleString();
  balanceEl.textContent = (income + expense).toLocaleString();
  renderChart(categoryTotals);
  renderMonthlyChange(thisMonthExpense, lastMonthExpense);
}

function renderMonthlyChange(thisMonth, lastMonth) {
  let message = "";
  if (lastMonth === 0) {
    message = `지난 달 지출 기록이 없습니다.`;
  } else {
    const change = thisMonth - lastMonth;
    const percent = ((change / lastMonth) * 100).toFixed(1);
    if (change > 0) {
      message = `지출이 지난 달 대비 ${change.toLocaleString()}원 증가 (+${percent}%) 했습니다.`;
    } else if (change < 0) {
      message = `지출이 지난 달 대비 ${Math.abs(change).toLocaleString()}원 감소 (${percent}%) 했습니다.`;
    } else {
      message = `지출이 지난 달과 동일합니다.`;
    }
  }
  let changeEl = document.getElementById("monthlyChange");
  if (!changeEl) {
    changeEl = document.createElement("p");
    changeEl.id = "monthlyChange";
    document.getElementById("summary").appendChild(changeEl);
  }
  changeEl.textContent = message;
}

let chart;
function renderChart(data) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels,
      datasets: [{ data: values }]
    }
  });
}

render();
