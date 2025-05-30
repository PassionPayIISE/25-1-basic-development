const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");

window.addEventListener("DOMContentLoaded", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies() {
  try {
    const response = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await response.json();
    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach((currency) => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;

      const option2 = option1.cloneNode(true);

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });


    fromCurrency.value = "USD";
    toCurrency.value = "KRW";
  } catch (error) {
    console.error("통화 데이터를 가져오는 데 실패했습니다.", error);
    result.textContent = "💥 통화를 불러오지 못했어요. 새로고침해주세요.";
  }
}

async function convertCurrency(event) {
  event.preventDefault();

  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    alert("⚠️ 유효한 금액을 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${from}`);
    const data = await response.json();
    const rate = data.rates[to];

    if (!rate) {
      result.textContent = "❌ 선택한 통화 간 환율을 찾을 수 없어요.";
      return;
    }

    const convertedAmount = (amount * rate).toFixed(2);

    result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    console.error("환율 변환 실패:", error);
    result.textContent = "💥 변환에 실패했습니다. 다시 시도해주세요.";
  }
}
