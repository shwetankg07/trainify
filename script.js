let tempExercises = [];


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
    const exerciseHeader = document.createElement('h3');
    exerciseHeader.innerText = potato;
    console.log(potato);
    container.appendChild(exerciseHeader);
  })
}
