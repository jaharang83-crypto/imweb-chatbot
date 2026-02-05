let RULES = {};

fetch("https://cdn.jsdelivr.net/gh/jaharang83-crypto/imweb-chatbot@main/rules.json")
  .then(res => res.json())
  .then(data => RULES = data);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("chatbot-root");
  if (!root) return;

  root.innerHTML = `
    <div id="chatbot">
      <div id="chat-header">
        보험·검사 안내 챗봇
        <div class="notice">※ 본 챗봇은 의료·보험 판단을 제공하지 않습니다</div>
      </div>
      <div id="chat-body"></div>
      <div id="chat-input">
        <input id="chat-text" placeholder="궁금한 내용을 입력하세요" />
        <button id="chat-send">전송</button>
      </div>
    </div>
  `;

  document.getElementById("chat-send").onclick = handleMessage;
});

function handleMessage() {
  const input = document.getElementById("chat-text");
  const body = document.getElementById("chat-body");
  const message = input.value.trim();
  if (!message) return;

  body.innerHTML += `<div class="user">${message}</div>`;
  input.value = "";

  const reply = getRuleResponse(message);
  body.innerHTML += `<div class="bot">${reply}</div>`;
  body.scrollTop = body.scrollHeight;
}

function getRuleResponse(message) {
  const text = message.toLowerCase();

  for (const key in RULES) {
    const rule = RULES[key];
    if (rule.keywords.some(k => text.includes(k))) {
      return rule.response;
    }
  }

  return "문의하신 내용은 개인 상황이나 병원 정책에 따라 달라질 수 있습니다.\n자세한 안내는 병원으로 문의해 주세요.";
}
