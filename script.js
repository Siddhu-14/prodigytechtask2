const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('laps');

let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isRunning = false;

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapTime);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Stop';
        interval = setInterval(updateDisplay, 10); // Update every 10 milliseconds
    } else {
        pauseStopwatch();
        startButton.textContent = 'Start';
    }
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(interval);
    startButton.textContent = 'Resume';
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsList.innerHTML = ''; // Clear lap times
    startButton.textContent = 'Start';
}

function updateDisplay() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    millisecondsDisplay.textContent = String(milliseconds).padStart(3, '0');
}

function lapTime() {
    if (isRunning) {
        const lapTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
        const listItem = document.createElement('li');
        listItem.textContent = lapTime;
        lapsList.prepend(listItem); // Add new lap to the top
    }
}