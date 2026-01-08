const hackathonDate = new Date('2026-01-24T07:00:00-08:00').getTime();

const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = hackathonDate - now;

    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        displayEventStarted();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    updateElement('days', days);
    updateElement('hours', hours);
    updateElement('minutes', minutes);
    updateElement('seconds', seconds);
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        const displayValue = id === 'days' ? value : value.toString().padStart(2, '0');

        if (element.textContent !== displayValue.toString()) {
            element.textContent = displayValue;
        }
    }
}

function displayEventStarted() {
    const countdownSection = document.getElementById('countdown-container');

    if (countdownSection) {
        countdownSection.className = "text-center py-8";
        countdownSection.innerHTML = `
            <div class="w-full">
                <div class="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-4">
                    It's Live!
                </div>
                <p class="text-lg text-slate-600">
                    The hackathon has officially started. Good luck!
                </p>
            </div>
        `;
    }
    
    const challengeContent = document.getElementById('challenge-content');
    const challengeHiddenMessage = document.getElementById('challenge-hidden-message');
    if (challengeContent) challengeContent.classList.remove('hidden');
    if (challengeHiddenMessage) challengeHiddenMessage.classList.add('hidden');
    
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.href = "https://docs.google.com/forms/d/e/1FAIpQLSdd3baXpk2fH5qubkZAkHNPaVnae8yNJs0AFryhj5DAbOvTKQ/viewform?usp=publish-editor";
        submitButton.target = "_blank";
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        submitButton.textContent = "Submit Your Project";
    }
}

function displayEventEnded() {
    const countdownSection = document.getElementById('countdown-container');

    if (countdownSection) {
        countdownSection.className = "text-center py-8";
        countdownSection.innerHTML = `
            <div class="w-full">
                <div class="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-4">
                    Event Ended
                </div>
                <p class="text-lg text-slate-600">
                    Thank you for participating!
                </p>
            </div>
        `;
    }
}