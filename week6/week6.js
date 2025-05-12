const text = "PassionPay";
const typingTarget = document.getElementById("typing");

let index = 0;

function type() {
  if (index < text.length) {
    typingTarget.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 150);
  }
}

window.onload = type;
