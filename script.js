// chota sa dataset to compare bmi and other things in the stats page 
const gymBenchmarks = [
  { ageRange: "18-19", min: 18, max: 19, avgBMI: 24.77, avgDuration: 76, avgFreq: 3.2 },
  { ageRange: "20-29", min: 20, max: 29, avgBMI: 25.50, avgDuration: 75, avgFreq: 3.3 },
  { ageRange: "30-39", min: 30, max: 39, avgBMI: 25.18, avgDuration: 75, avgFreq: 3.4 },
  { ageRange: "40-49", min: 40, max: 49, avgBMI: 23.61, avgDuration: 77, avgFreq: 3.4 },
  { ageRange: "50-59", min: 50, max: 59, avgBMI: 25.48, avgDuration: 74, avgFreq: 3.3 }
];


let tempExercises = [];
let workoutData = [];

// function for all the navbars
function loadNavbar() {
    const navHTML = `
        <nav style="background: #333; padding: 10px; margin-bottom: 20px; font-family: sans-serif;">
            <a href="index.html" style="color: white; margin-right: 15px; text-decoration: none;">Home</a>
            <a href="routines.html" style="color: white; margin-right: 15px; text-decoration: none;">Routines (Plan)</a>
            <a href="logger.html" style="color: white; margin-right: 15px; text-decoration: none;">Logger (Track)</a>
            <a href="stats.html" style="color: white; text-decoration: none;">Stats (View)</a>
        </nav>
    `;
    
    document.getElementById('navbar-placeholder').innerHTML = navHTML;
}

document.addEventListener('DOMContentLoaded', loadNavbar);

// for the graph
function renderComparisonChart(userBMI, userDuration, userFreq, benchmark) {
    const ctx = document.getElementById('comparisonChart');

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['BMI', 'Duration (mins)', 'Freq (days/wk)'], 
            datasets: [
                {
                    label: 'You',
                    data: [userBMI, userDuration, userFreq], 
                    backgroundColor: '#FF6384', // Red for You
                    borderWidth: 1
                },
                {
                    label: `Avg (${benchmark.ageRange} yrs)`,
                    data: [benchmark.avgBMI, benchmark.avgDuration, benchmark.avgFreq],
                    backgroundColor: '#36A2EB',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true 
                }
            }
        }
    });
}

// ---- function to just add an exercise to be showed
function addExercise() {
    const exerciseInput = document.getElementById('exercise-input').value;
    const list = document.getElementById('exercise-list');
    if (list.firstElementChild && list.firstElementChild.innerText.includes("(No exercises added yet)")) {
        list.innerHTML = "";
    }
    if(exerciseInput === ""){
    alert("please type an exercise name")
    return;
  }
    tempExercises.push(exerciseInput);
    const newExercise = document.createElement('li');
    newExercise.innerText = exerciseInput;
    list.appendChild(newExercise);
    document.getElementById('exercise-input').value = "";
}

// ---- function to change the routine 
function saveRoutine(){
    const routineName = document.getElementById('routine-name').value;
     let newRoutine = {
       name: routineName,
       exercises: tempExercises
      };
    if(routineName === "" || tempExercises.length === 0){
    alert("not all input fields are filled")
    return;
  }
  const routineList = JSON.parse(localStorage.getItem('myRoutines')) || [];
  routineList.push(newRoutine);
  localStorage.setItem('myRoutines', JSON.stringify(routineList));
  alert("Routine Saved!");
  document.getElementById('routine-name').value = "";
  document.getElementById('exercise-list').innerHTML = "";
  document.getElementById('exercise-input').value = "";
  tempExercises = [];
};


// ---- get the dropdown working by fetching stuff from my routines
function populateDropdown() {
    const existingRoutines = JSON.parse(localStorage.getItem('myRoutines')) || [];
    const dropdown = document.getElementById('routine-dropdown');
    dropdown.innerHTML = '<option value="">-- Choose a Routine --</option>';
    existingRoutines.forEach(routine => {
        const optionHTML = `<option value="${routine.name}">${routine.name}</option>`;
        dropdown.innerHTML += optionHTML;
    });
}
if (document.getElementById('routine-dropdown')) {
    populateDropdown();
}

function loadRoutineInputs() {
    const dropdown = document.getElementById('routine-dropdown');
    console.log(dropdown.value);
    const existingRoutines = JSON.parse(localStorage.getItem('myRoutines')) || [];
    const whatsRN = existingRoutines.find(potato => potato.name == dropdown.value); //found out you can use anything here, so potato it is lol
    console.log(whatsRN);
    if(whatsRN === undefined){
      return;
    }
    const container = document.getElementById('inputs-container');
    container.innerHTML = "";
    whatsRN.exercises.forEach(potato => {     //potato again, coz, why not? heh
    const card = document.createElement('div');
        card.style.border = "1px solid #ccc";
        card.style.margin = "10px";
        card.style.padding = "10px";
    const exerciseHeader = document.createElement('h3');
    exerciseHeader.innerText = potato;
    console.log(potato);
    card.appendChild(exerciseHeader);
    const weightInput = document.createElement('input');
    weightInput.type = "number";
    weightInput.placeholder = "set up that heavy ahh weight";
    card.appendChild(weightInput);
    const repInput = document.createElement("input");
    repInput.type = "number";
    repInput.placeholder = "reps?";
    card.appendChild(repInput);
    container.appendChild(card);
  })
}

function finishWorkout(){
    const dropdown = document.getElementById('routine-dropdown');
    const workout = dropdown.value;
    const cards = document.querySelectorAll('#inputs-container > div');
  const workoutData = [];
    cards.forEach(card => {
      const name = card.querySelector('h3').innerText;
      const inputs = card.querySelectorAll('input');
      const weight = inputs[0].value;
      const reps = inputs[1].value;
      console.log(inputs,weight,reps);
    if(weight && reps){
      workoutData.push({
        exercise: name,
        weight: weight,
        reps: reps
      });
    }
  });
  const today = new Date().toLocaleDateString();
  const session = {
    date: today,
    workout: workout,
    exercises: workoutData
  };
  const previousLogs = JSON.parse(localStorage.getItem('myWorkoutLogs')) || [];
  previousLogs.push(session);
  localStorage.setItem('myWorkoutLogs', JSON.stringify(previousLogs));
  alert("Workout Saved! Great job.");
  window.location.href = "index.html";

}

function compareStats(){
  const ageInput = document.getElementById('age-input');
  const weightInput = document.getElementById('weight-input');
  const heightInput = document.getElementById('height-input');
  const durationInput = document.getElementById('duration-input');
  const freqInput = document.getElementById('freq-input');

  const age = Number(ageInput.value);
  const weight = parseFloat(weightInput.value);
  const heightcm = parseFloat(heightInput.value);
  const duration = Number(durationInput.value);
  const freq = Number(freqInput.value);

  const heightM = heightcm / 100;
  const bmi = weight/ (heightM * heightM);
  console.log(bmi.toFixed());
  const benchmark = gymBenchmarks.find(b => age >= b.min  && age <= b.max);
  if(benchmark){
    console.log("Found benchmark:", benchmark);
    renderComparisonChart(bmi, duration, freq, benchmark);
  } else {
    alert("Sorry, we dont have that much data yet")
  }
}

function loadHistory() {
    const historyContainer = document.getElementById('history-list');
    if (!historyContainer) return;
    const logs = JSON.parse(localStorage.getItem('myWorkoutLogs')) || [];
    if (logs.length === 0) {
        historyContainer.innerHTML = "<p>No workouts found. Go lift something! 💪</p>";
        return;
    }
    historyContainer.innerHTML = '';
    logs.reverse().forEach(log => {
        const card = document.createElement('div');
        card.style.border = "1px solid #ddd";
        card.style.padding = "15px";
        card.style.borderRadius = "8px";
        card.style.background = "#fff";
        const exercisesHtml = log.exercises.map(ex => 
            `<li><strong>${ex.exercise}:</strong> ${ex.weight}kg x ${ex.reps} reps</li>`
        ).join('');
        card.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">${log.date} - ${log.workout}</h3>
            <ul style="padding-left: 20px; color: #555;">
                ${exercisesHtml}
            </ul>
        `;
        historyContainer.appendChild(card);
    });
}
loadHistory();

// ENABLE "ENTER" KEY TO ADD EXERCISE
const exerciseInput = document.getElementById('exercise-input');

if (exerciseInput) {
    exerciseInput.addEventListener('keyup', function(event) {
        // Check for "Enter" key
        if (event.key === 'Enter') {
            event.preventDefault(); // Stop any weird default browser behavior
            
            // Check if the box is empty (optional, but good UX)
            if (exerciseInput.value.trim() !== "") {
                console.log("Enter pressed! Adding exercise...");
                addExercise(); // <--- Calls your function directly!
            }
        }
    });
}
