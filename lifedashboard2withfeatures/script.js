// -------- SECTION --------
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

// -------- DARK MODE --------
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// -------- CLOCK --------
setInterval(() => {
    document.getElementById("clock").innerText =
        new Date().toLocaleTimeString();
}, 1000);

// -------- QUOTES --------
const quotes = ["Stay consistent 💪", "Glow daily 🌸", "You got this ✨"];
document.getElementById("quote").innerText =
    quotes[Math.floor(Math.random() * quotes.length)];


// ================= STORAGE =================
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}


// ================= GOALS =================
function renderGoals() {
    let goals = getData("goals");
    let list = document.getElementById("goalList");
    list.innerHTML = "";

    goals.forEach((g, i) => {
        let li = document.createElement("li");
        li.innerText = g.text;
        if (g.done) li.classList.add("done");

        li.onclick = () => {
            goals[i].done = !goals[i].done;
            saveData("goals", goals);
            renderGoals();
            updateStats();
        };

        let del = document.createElement("button");
        del.innerText = "❌";
        del.onclick = (e) => {
            e.stopPropagation();
            goals.splice(i, 1);
            saveData("goals", goals);
            renderGoals();
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}

function addGoal() {
    let input = document.getElementById("goalInput");
    let goals = getData("goals");

    goals.push({ text: input.value, done: false });
    saveData("goals", goals);

    input.value = "";
    renderGoals();
}


// ================= PLANS =================
function renderPlans() {
    let plans = getData("plans");
    let list = document.getElementById("planList");
    list.innerHTML = "";

    plans.forEach((p, i) => {
        let li = document.createElement("li");
        li.innerText = p.text;
        if (p.done) li.classList.add("done");

        li.onclick = () => {
            plans[i].done = !plans[i].done;
            saveData("plans", plans);
            renderPlans();
            updateStats();
        };

        let del = document.createElement("button");
        del.innerText = "❌";
        del.onclick = (e) => {
            e.stopPropagation();
            plans.splice(i, 1);
            saveData("plans", plans);
            renderPlans();
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}

function addPlan() {
    let input = document.getElementById("planInput");
    let plans = getData("plans");

    plans.push({ text: input.value, done: false });
    saveData("plans", plans);

    input.value = "";
    renderPlans();
}


// ================= HABITS =================
function renderHabits() {
    let habits = getData("habits");
    let list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((h, i) => {
        let li = document.createElement("li");

        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = h.done;

        cb.onchange = () => {
            habits[i].done = cb.checked;
            saveData("habits", habits);
            updateHabitStats();
            updateStreak();
        };

        li.appendChild(cb);
        li.append(" " + h.text);

        let del = document.createElement("button");
        del.innerText = "❌";
        del.onclick = () => {
            habits.splice(i, 1);
            saveData("habits", habits);
            renderHabits();
        };

        li.appendChild(del);
        list.appendChild(li);
    });

    updateHabitStats();
}

function addHabit() {
    let input = document.getElementById("habitInput");
    let habits = getData("habits");

    habits.push({ text: input.value, done: false });
    saveData("habits", habits);

    input.value = "";
    renderHabits();
}


// -------- HABIT STATS --------
function updateHabitStats() {
    let habits = getData("habits");
    let done = habits.filter(h => h.done).length;

    document.getElementById("habitStats").innerText =
        `Done: ${done}/${habits.length}`;
}


// -------- STREAK --------
function updateStreak() {
    let streak = localStorage.getItem("streak") || 0;
    document.getElementById("streak").innerText =
        `🔥 Streak: ${streak}`;
}


// ================= STATS =================
function updateStats() {
    let goals = getData("goals");
    let plans = getData("plans");

    let gDone = goals.filter(g => g.done).length;
    let pDone = plans.filter(p => p.done).length;

    document.getElementById("stats").innerText =
        `Goals ${gDone}/${goals.length} | Plans ${pDone}/${plans.length}`;
}
   //profile
function openProfile() {
    document.getElementById("profilePopup").style.display = "flex";
    loadProfile();
}

function closeProfile() {
    document.getElementById("profilePopup").style.display = "none";
}

// SAVE
function saveProfile() {
    let name = document.getElementById("profileNameInput").value;
    let number = document.getElementById("profileNumberInput").value;
    let bio = document.getElementById("profileBioInput").value;

    let profile = { name, number, bio };
    localStorage.setItem("profile", JSON.stringify(profile));

    loadProfile();
    document.getElementById("profileForm").style.display = "none";
}

// LOAD
function loadProfile() {
    let data = JSON.parse(localStorage.getItem("profile"));

    if (!data) {
        document.getElementById("profileForm").style.display = "block";
        return;
    }

    document.getElementById("displayName").innerText = data.name;
    document.getElementById("displayNumber").innerText = data.number;
    document.getElementById("displayBio").innerText = data.bio;

    document.getElementById("profileForm").style.display = "none";
}

// EDIT
function editProfile() {
    let data = JSON.parse(localStorage.getItem("profile"));
    if (!data) return;

    document.getElementById("profileNameInput").value = data.name;
    document.getElementById("profileNumberInput").value = data.number;
    document.getElementById("profileBioInput").value = data.bio;

    document.getElementById("profileForm").style.display = "block";
}

// CLEAR
function clearProfile() {
    localStorage.removeItem("profile");

    document.getElementById("displayName").innerText = "";
    document.getElementById("displayNumber").innerText = "";
    document.getElementById("displayBio").innerText = "";

    document.getElementById("profileForm").style.display = "block";
}


// -------- INIT --------
renderGoals();
renderPlans();
renderHabits();
updateStats();
loadProfile();
updateStreak();