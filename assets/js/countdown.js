// ============================================
// Washington State Hackathon - Countdown Timer
// ============================================

// Set the target date for the hackathon
// January 24, 2026 at 7:00 AM PST
const hackathonDate = new Date('2026-01-24T07:00:00-08:00').getTime();

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initial call to display immediately
updateCountdown();

function updateCountdown() {
    // Get current time
    const now = new Date().getTime();

    // Calculate time remaining
    const timeRemaining = hackathonDate - now;

    // If countdown is finished
    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        displayEventStarted();
        return;
    }

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update DOM elements
    updateElement('days', days);
    updateElement('hours', hours);
    updateElement('minutes', minutes);
    updateElement('seconds', seconds);
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        // Add leading zero for single digits (except days)
        const displayValue = id === 'days' ? value : value.toString().padStart(2, '0');

        // Only update if value changed (prevents unnecessary reflows)
        if (element.textContent !== displayValue.toString()) {
            element.textContent = displayValue;

            // Add pulse animation on change
            element.classList.add('pulse-animation');
            setTimeout(() => {
                element.classList.remove('pulse-animation');
            }, 300);
        }
    }
}

function displayEventStarted() {
    const countdownSection = document.querySelector('#hero .grid');

    if (countdownSection) {
        countdownSection.innerHTML = `
            <div class="col-span-4 text-center">
                <div class="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
                    🎉 The Hackathon Has Started! 🎉
                </div>
                <p class="text-xl text-white">
                    Good luck to all participants! Build something amazing!
                </p>
            </div>
        `;
    }

    // Reveal hidden challenge content
    const challengeContent = document.getElementById('challenge-content');
    const challengeHiddenMessage = document.getElementById('challenge-hidden-message');
    const faqCommunity = document.getElementById('faq-community');

    if (challengeContent) {
        challengeContent.classList.remove('hidden');
        
        // Re-trigger animations if AOS is available
        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 100);
        }
    }
    
    if (challengeHiddenMessage) {
        challengeHiddenMessage.classList.add('hidden');
    }

    if (faqCommunity) {
        faqCommunity.classList.remove('hidden');
    }

    // Enable Submit Button
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.href = "https://docs.google.com/forms/d/e/1FAIpQLSdd3baXpk2fH5qubkZAkHNPaVnae8yNJs0AFryhj5DAbOvTKQ/viewform?usp=publish-editor";
        submitButton.target = "_blank";
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        submitButton.classList.add('hover:shadow-xl', 'transition-all', 'hover:scale-105');
        submitButton.textContent = "Submit Your Project";

        // Update the message box above the button
        const messageContainer = submitButton.previousElementSibling;
        if (messageContainer) {
            messageContainer.className = "bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8 max-w-2xl mx-auto";
            messageContainer.innerHTML = `
                <p class="text-lg font-semibold text-green-800 mb-2">Submissions are Open!</p>
                <p class="text-slate-700">Ready to showcase your project? Click the button below to submit your video/presentation and project details.</p>
            `;
        }
    }
}

// ===== Alternative: Event has ended =====
function displayEventEnded() {
    const countdownSection = document.querySelector('#hero .grid');

    if (countdownSection) {
        countdownSection.innerHTML = `
            <div class="col-span-4 text-center">
                <div class="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
                    🏆 The Hackathon Has Ended! 🏆
                </div>
                <p class="text-xl text-white">
                    Thank you to all participants! Results coming soon.
                </p>
            </div>
        `;
    }
}

// ===== Get time until event =====
function getTimeUntilEvent() {
    const now = new Date().getTime();
    const timeRemaining = hackathonDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
        total: timeRemaining
    };
}

// ===== Format countdown as string =====
function formatCountdown() {
    const time = getTimeUntilEvent();

    if (time.total < 0) {
        return 'Event has started!';
    }

    let parts = [];

    if (time.days > 0) {
        parts.push(`${time.days} day${time.days !== 1 ? 's' : ''}`);
    }
    if (time.hours > 0) {
        parts.push(`${time.hours} hour${time.hours !== 1 ? 's' : ''}`);
    }
    if (time.minutes > 0) {
        parts.push(`${time.minutes} minute${time.minutes !== 1 ? 's' : ''}`);
    }
    if (time.seconds > 0 && parts.length === 0) {
        parts.push(`${time.seconds} second${time.seconds !== 1 ? 's' : ''}`);
    }

    return parts.join(', ');
}

// ===== Add urgency indicator =====
function addUrgencyIndicator() {
    const time = getTimeUntilEvent();
    const urgencyElement = document.getElementById('urgency-indicator');

    if (!urgencyElement) return;

    if (time.total < 0) {
        urgencyElement.textContent = '';
        return;
    }

    // Less than 1 day
    if (time.days < 1) {
        urgencyElement.textContent = '⚡ Less than 24 hours to go!';
        urgencyElement.className = 'urgency-high';
    }
    // Less than 7 days
    else if (time.days < 7) {
        urgencyElement.textContent = '🔥 Less than a week away!';
        urgencyElement.className = 'urgency-medium';
    }
    // Less than 30 days
    else if (time.days < 30) {
        urgencyElement.textContent = '📅 Coming up soon!';
        urgencyElement.className = 'urgency-low';
    }
}

// ===== Console countdown =====
console.log(`⏰ Time until hackathon: ${formatCountdown()}`);

// ===== Export functions for use in other scripts =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getTimeUntilEvent,
        formatCountdown,
        updateCountdown
    };
}
