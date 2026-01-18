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
    const cards = document.querySelectorAll('#inputs-container > div');
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
    workout: name,
    exercises: workoutData
  };
  const previousLogs = JSON.parse(localStorage.getItem('myWorkoutLogs')) || [];
  previousLogs.push(session);
  localStorage.setItem('myWorkoutLogs', JSON.stringify(previousLogs));
  alert("Workout Saved! Great job.");
  window.location.href = "index.html";

}
