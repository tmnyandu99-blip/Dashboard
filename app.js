
let dataStore = [];

async function loadData() {
    const response = await fetch('data.json');
    const data = await response.json();

    dataStore = Update app.js

Add this at the TOP:

let dataStore = [];
Replace inside loadData() after fetching data:

data;
        }

        if(due < today && item.status !== "Completed"){
            addItem('overdue', item);
        }

        if(due >= today && due <= week){
            addItem('week', item);
        }

        if(due.getMonth() === today.getMonth()){
            addItem('month', item);
        }

        if(item.type === "SARS"){
            addItem('sars', item);
        }

        if(item.type === "CIPC"){
            addItem('cipc', item);
        }

        addStaff(item);
    });

    document.getElementById("completionRate").innerText =
        Math.round((completed / data.length) * 100) + "% Completed";
}

function addItem(section, item){
    const ul = document.querySelector(`#${section} ul`);
    const li = document.createElement("li");
    li.innerText = `${item.client} - ${item.compliance} - ${item.dueDate}`;
    ul.appendChild(li);
}

const staffCount = {};

function addStaff(item){
    if(!staffCount[item.assigned]){
        staffCount[item.assigned] = 0;
    }
    staffCount[item.assigned]++;

    const ul = document.querySelector("#staff ul");
    ul.innerHTML = "";

    Object.keys(staffCount).forEach(name => {
        const li = document.createElement("li");
        li.innerText = `${name}: ${staffCount[name]} tasks`;
        ul.appendChild(li);
    });
}

function addNewItem(){
    const item = {
        client: document.getElementById("client").value,
        type: document.getElementById("type").value,
        compliance: document.getElementById("compliance").value,
        dueDate: document.getElementById("dueDate").value,
        assigned: document.getElementById("assigned").value,
        status: "Pending"
    };

    dataStore.push(item);

    clearDashboard();
    renderDashboard();
}

loadData();

function clearDashboard(){
    document.querySelectorAll(".card ul").forEach(ul => ul.innerHTML = "");
}

function renderDashboard(){
    const today = new Date();
    const week = new Date();
    week.setDate(today.getDate() + 7);

    let completed = 0;

    dataStore.forEach(item => {
        const due = new Date(item.dueDate);

        if(item.status === "Completed") completed++;

        if(due < today && item.status !== "Completed"){
            addItem('overdue', item);
        }

        if(due >= today && due <= week){
            addItem('week', item);
        }

        if(due.getMonth() === today.getMonth()){
            addItem('month', item);
        }

        if(item.type === "SARS") addItem('sars', item);
        if(item.type === "CIPC") addItem('cipc', item);

        addStaff(item);
    });

    document.getElementById("completionRate").innerText =
        Math.round((completed / dataStore.length) * 100) + "% Completed";
}
