let rules = {};

fetch("https://cdn.jsdelivr.net/gh/jaharang83-crypto/imweb-chatbot/rules.json")
  .then(res => res.json())
  .then(data => {
    rules = data;
  });

function getAnswer(text) {
  for (const key in rules) {
    if (!rules[key].keywords) continue;
    for (const word of rules[key].keywords) {
      if (text.includes(word)) {
        return rules[key].message;
      }
    }
  }
  return rules.default.message;
}

function showMessage(message) {
  alert(message); // 👉 다음 단계에서 채팅 UI로 교체 가능
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("chat-send").onclick = () => {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;
    showMessage(getAnswer(text));
    input.value = "";
  };

  document.querySelectorAll(".hero-actions button").forEach(btn => {
    btn.onclick = () => {
      const type = btn.dataset.type;
      showMessage(rules[type].message);
    };
  });
});
