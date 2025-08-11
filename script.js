const users = ["爸爸", "媽媽", "翔翔", "全全", "阿寶"];
let currentUser = "全全";

const medications = {
  "全全": [
    { time: "07:30", pills: 3, items: ["止痛藥", "抗發炎", "胃藥"] },
    { time: "08:00", pills: 1, items: ["新藥"] }
  ]
};

function renderUserButtons() {
  const container = document.getElementById("user-selector");
  container.innerHTML = "";
  users.forEach(name => {
    const btn = document.createElement("button");
    btn.className = "user-button";
    btn.textContent = name;
    btn.onclick = () => {
      currentUser = name;
      renderMedicationList();
    };
    container.appendChild(btn);
  });
}

function renderMedicationList() {
  const container = document.getElementById("medication-list");
  container.innerHTML = `<h2>${currentUser}的用藥清單</h2>`;
  const list = medications[currentUser] || [];
  if (list.length === 0) {
    alert("🚫 無提醒事項！");
    return;
  }
  list.forEach(entry => {
    const card = document.createElement("div");
    card.className = "med-card";
    card.innerHTML = `
  <strong>類型：</strong> ${entry.type || "藥物"}<br/>
  <strong>時間：</strong> ${entry.time}<br/>
  <strong>名稱：</strong> ${entry.items.join("、")}<br/>
  <strong>數量：</strong> ${entry.pills} 顆
`;
    container.appendChild(card);
  });
}

document.getElementById("dispense-button").onclick = () => {
  const list = medications[currentUser] || [];
  if (list.length === 0) {
    alert("🚫 無提醒事項！");
  } else {
    alert("💊 出藥完成，請記得服用！");
  }
};

document.getElementById("settings-button").onclick = () => {
  const editArea = document.getElementById("edit-area");
  editArea.classList.toggle("hidden");
  renderEditList();
};

document.getElementById("edit-form").onsubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const newEntry = {
    type: form.type.value,
    time: form.time.value,
    items: form.items.value.split("、"),
    pills: parseInt(form.pills.value)
  };
  medications[currentUser] = medications[currentUser] || [];
  medications[currentUser].push(newEntry);
  renderMedicationList();
  renderEditList();
  alert(`✅ 已新增${newEntry.type}項目！`);
  form.reset();
};

function renderEditList() {
  const container = document.getElementById("edit-list");
  container.innerHTML = "";
  const list = medications[currentUser] || [];
  list.forEach((entry, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
  ${entry.type === "營養品" ? "🍎" : "💊"} ${entry.items.join("、")} (${entry.pills} 顆) 🕒 ${entry.time}
  <button onclick="deleteMedication(${index})">🗑️ 刪除</button>
`;
    container.appendChild(div);
  });
}

function deleteMedication(index) {
  medications[currentUser].splice(index, 1);
  renderMedicationList();
  renderEditList();
}

function addUser() {
  const name = document.getElementById("new-user").value.trim();
  if (!name) return alert("請輸入新成員名稱");
  if (users.includes(name)) return alert("成員已存在");

  users.push(name);
  medications[name] = [];
  currentUser = name;

  renderUserButtons();
  renderMedicationList();
  renderEditList();

  document.getElementById("new-user").value = "";
  alert(`✅ 已新增成員「${name}」`);
}

renderUserButtons();
renderMedicationList();