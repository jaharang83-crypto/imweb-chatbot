window.ImwebChatbot = {
  async mount({ targetId, rulesUrl }) {
    const root = document.getElementById(targetId);
    if (!root) return;

    const rules = await fetch(rulesUrl).then(r => r.json());

    root.innerHTML = `
      <section class="hero">
        <div class="hero-content">
          <p class="hero-eyebrow">CUSTOMER SERVICE</p>
          <h1>
            기다리지 않고<br/>
            <span>빠르게</span><br/>
            도와드릴게요!
          </h1>

          <div class="chatbox">
            <input id="chat-input"
              placeholder="보험청구, 검사 비용이 궁금하신가요?" />
            <button id="chat-send">🔍</button>
          </div>

          <div class="quick-buttons">
            <button data-key="claim">보험청구 안내</button>
            <button data-key="test">검사 안내</button>
            <button data-key="human">상담 연결</button>
          </div>

          <div id="chat-result"></div>
        </div>
      </section>
    `;

    const resultBox = root.querySelector("#chat-result");

    root.querySelectorAll(".quick-buttons button").forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.key;
        resultBox.innerHTML = `
          <div class="chat-bubble">
            ${rules[key].text}
          </div>
        `;
      };
    });

    root.querySelector("#chat-send").onclick = () => {
      resultBox.innerHTML = `
        <div class="chat-bubble">
          원하시는 항목을 선택해주세요 😊
        </div>
      `;
    };
  }
};
