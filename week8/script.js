const form = document.getElementById('transaction-form');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const balanceDisplay = document.getElementById('balance');
const tableBody = document.querySelector('#transaction-table tbody');
const categoryChart = document.getElementById('category-chart').getContext('2d');
const monthlyChangeDiv = document.getElementById('monthly-change');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateSummary() {
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
    incomeDisplay.textContent = income.toLocaleString();
    expenseDisplay.textContent = Math.abs(expense).toLocaleString();
    balanceDisplay.textContent = (income + expense).toLocaleString();
}

function renderTable() {
    tableBody.innerHTML = '';
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    sorted.forEach((t, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${t.date}</td>
      <td>${t.category}</td>
      <td>${t.description}</td>
      <td>${t.amount.toLocaleString()}원</td>
      <td><button onclick="deleteTransaction(${idx})">삭제</button></td>
    `;
        tableBody.appendChild(tr);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions();
    updateUI();
}

function renderChart() {
    const categoryTotals = {};
    transactions.forEach(t => {
        if (t.amount < 0) {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
        }
    });
    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [{
            label: '카테고리별 지출',
            data: Object.values(categoryTotals),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'],
        }]
    };
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(categoryChart, {
        type: 'pie',
        data
    });
}

function renderMonthlyChange() {
    const now = new Date();
    const thisMonth = now.getMonth();
    const lastMonth = (thisMonth + 11) % 12;

    const sum = (month) => transactions
        .filter(t => new Date(t.date).getMonth() === month)
        .reduce((sum, t) => sum + t.amount, 0);

    const thisTotal = sum(thisMonth);
    const lastTotal = sum(lastMonth);
    const diff = thisTotal - lastTotal;
    const msg = diff > 0 ? `지난달보다 ${diff.toLocaleString()}원 늘었어요.`
        : `지난달보다 ${Math.abs(diff).toLocaleString()}원 줄었어요.`;
    monthlyChangeDiv.textContent = msg;
}

function updateUI() {
    updateSummary();
    renderTable();
    renderChart();
    renderMonthlyChange();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value || new Date().toISOString().slice(0, 10);

    if (isNaN(amount)) return;

    transactions.push({ amount, category, description, date });
    saveTransactions();
    updateUI();
    form.reset();
});

updateUI();