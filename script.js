document.getElementById("btn").addEventListener("click", function() {
    const targetDateInput = document.getElementById("datetime");
    const targetDate = new Date(targetDateInput.value);
    
    if (isNaN(targetDate)) {
        alert("Please set a valid date and time.");
        return;
    }

    let countdownTime;
    function updateCount() {
        const now = new Date().getTime();
        const timeRemaining = targetDate.getTime() - now;

        if (timeRemaining < 0) {
            clearInterval(countdownTime);
            document.getElementById('Display').innerHTML = "<h2>Countdown Ended!!</h2>";
            document.getElementById("btn").textContent = "Start Again";
            document.getElementById("btn").disabled = false;
            targetDateInput.disabled = false; // Allow resetting the date-time input
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

    // If the countdown ends, and the user clicks the button again, restart the countdown
    if (countdownTime) {
        clearInterval(countdownTime);
    }

    document.getElementById("btn").disabled = true;
    document.getElementById("btn").textContent = "Counting Down...";
    targetDateInput.disabled = true; // Disable the date-time input while counting down
    updateCount();
    countdownTime = setInterval(updateCount, 1000);
});

// Reset the countdown when the button is clicked to "Start Again"
document.getElementById("btn").addEventListener("click", function() {
    if (this.textContent === "Start Again") {
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
        document.getElementById("btn").textContent = "Start Countdown"; // Reset button text
    }
});
