let countdownTime;  // Make countdownTime global to handle start/stop properly

document.getElementById("btn").addEventListener("click", function() {
    const btn = document.getElementById("btn");
    const targetDateInput = document.getElementById("datetime");

    // Check if the button is currently in "Start Countdown" mode or "Start Again" mode
    if (btn.textContent === "Start Countdown") {
        startCountdown(targetDateInput);
    } else if (btn.textContent === "Start Again") {
        resetCountdown();  // Reset countdown when "Start Again" is clicked
    }
});

function startCountdown(targetDateInput) {
    const targetDate = new Date(targetDateInput.value);

    // Validate date input
    if (isNaN(targetDate.getTime())) {
        alert("Please set a valid date and time.");
        return;
    }

    // If there's an existing countdown, clear it first
    if (countdownTime) {
        clearInterval(countdownTime);
    }

    // Disable the input and update the button
    targetDateInput.disabled = true;
    document.getElementById("btn").textContent = "Counting Down...";
    document.getElementById("btn").disabled = true;

    function updateCount() {
        const now = new Date().getTime();
        const timeRemaining = targetDate.getTime() - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownTime);
            document.getElementById('Display').innerHTML = "<h2>Countdown Ended!!</h2>";
            document.getElementById("btn").textContent = "Start Again";
            document.getElementById("btn").disabled = false;
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCount();  // Run once initially to avoid 1-second delay
    countdownTime = setInterval(updateCount, 1000);
}

function resetCountdown() {
    // Reset the display
    document.getElementById('Display').innerHTML = `
        <div class="time-box">
            <span id="days">00</span>
            <p>Days</p>
        </div>
        <div class="time-box">
            <span id="hours">00</span>
            <p>Hours</p>
        </div>
        <div class="time-box">
            <span id="minutes">00</span>
            <p>Minutes</p>
        </div>
        <div class="time-box">
            <span id="seconds">00</span>
            <p>Seconds</p>
        </div>
    `;

    // Re-enable the date-time input and update the button
    document.getElementById("datetime").disabled = false;
    document.getElementById("btn").textContent = "Start Countdown";
    document.getElementById("btn").disabled = false;
}
