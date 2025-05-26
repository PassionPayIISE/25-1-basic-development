// 요소 선택
const form = document.getElementById('transaction-form');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const incomeTotal = document.getElementById('income-total');
const expenseTotal = document.getElementById('expense-total');
const balance = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
const chartCanvas = document.getElementById('category-chart');
const monthlyDiff = document.getElementById('monthly-diff');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// 오늘 날짜 기본 설정
dateInput.valueAsDate = new Date();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;
  if (!amount || !date) return;

  const transaction = { id: Date.now(), amount, category, description, date };
  transactions.push(transaction);
  saveAndRender();
  form.reset();
  dateInput.valueAsDate = new Date();
});

function saveAndRender() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
  renderSummary();
  renderChart();
  renderMonthlyDiff();
}

function renderTransactions() {
  transactionList.innerHTML = '';
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  sorted.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.date}</td>
      <td>${t.category}</td>
      <td class="${t.amount > 0 ? 'income' : 'expense'}">${t.amount.toLocaleString()}원</td>
      <td>${t.description}</td>
      <td><button onclick="deleteTransaction(${t.id})">삭제</button></td>
    `;
    transactionList.appendChild(tr);
  });
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveAndRender();
}

function renderSummary() {
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
  incomeTotal.textContent = income.toLocaleString();
  expenseTotal.textContent = Math.abs(expense).toLocaleString();
  balance.textContent = (income + expense).toLocaleString();
}

function renderChart() {
  const ctx = chartCanvas.getContext('2d');
  const expenseByCategory = {};
  transactions.filter(t => t.amount < 0).forEach(t => {
    expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + Math.abs(t.amount);
  });

  const data = {
    labels: Object.keys(expenseByCategory),
    datasets: [{
      data: Object.values(expenseByCategory),
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6']
    }]
  };

  if (window.pieChart) window.pieChart.destroy();
  window.pieChart = new Chart(ctx, {
    type: 'pie',
    data,
    options: { responsive: false }
  });
}

function renderMonthlyDiff() {
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const getMonthSum = (month) => transactions
    .filter(t => new Date(t.date).getMonth() === month && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const current = getMonthSum(currentMonth);
  const prev = getMonthSum(lastMonth);
  const diff = current - prev;

  monthlyDiff.textContent = `지난달 대비 ${diff >= 0 ? '+' : ''}${diff.toLocaleString()}원 지출 ${diff >= 0 ? '증가' : '감소'}`;
}

// 초기 렌더링
saveAndRender();
