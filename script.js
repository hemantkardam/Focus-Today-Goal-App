const goalRadio = document.querySelectorAll('.goal-radio');
const goal = document.querySelectorAll('.goal');
const instruction = document.querySelector('.instruction');
const inputList = document.querySelectorAll('.goal-input');
const progressBar = document.querySelector('.progress-bar-value');
const progressBarDigit = document.querySelector('.progress-bar-digit');
const progressLabel = document.querySelector('.progress-label');

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, Keep going!',
  'Whoa! You just completed all the goals, time for chill',
];

progressLabel.innerText = allQuotes[completedGoalsCount];

progressBar.style.width = `${(completedGoalsCount / goal.length) * 100}%`;
progressBarDigit.innerText = `${completedGoalsCount}/${goal.length} Completed`;
if (completedGoalsCount < 1) {
  progressBarDigit.classList.add('hide');
}

goalRadio.forEach((e) => {
  e.addEventListener('click', (element) => {
    const allInputFilled = [...inputList].every((input) => {
      return input.value;
    });

    if (allInputFilled) {
      e.parentElement.classList.toggle('completed');
      const inputId = e.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressLabel.innerText = allQuotes[completedGoalsCount];

      if (completedGoalsCount < 1) {
        progressBarDigit.classList.add('hide');
      } else {
        progressBarDigit.classList.remove('hide');
      }
      progressBarDigit.innerText = `${completedGoalsCount}/${goal.length} Completed`;
      progressBar.style.width = `${(completedGoalsCount / goal.length) * 100}%`;
      localStorage.setItem(`allGoals`, JSON.stringify(allGoals));
    } else {
      instruction.classList.add('unhide');
    }
  });
});

inputList.forEach((input) => {
  input.addEventListener('focus', () => {
    instruction.classList.remove('unhide');
  });
  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }
    localStorage.setItem(`allGoals`, JSON.stringify(allGoals));
  });
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed');
    }
  }
});
