document.addEventListener('DOMContentLoaded', () => {
    const currentAU = localStorage.getItem('currentAU');
    loadTimelineEvents(currentAU);
});

function addTimelineEvent() {
    const eventDate = document.getElementById('eventDate').value;
    const eventDescription = document.getElementById('eventDescription').value;

    if (!eventDate || !eventDescription) {
        alert("Please fill out both date and description.");
        return;
    }

    const timelineEvent = { date: eventDate, description: eventDescription };

    // Retrieve the existing timeline for the current AU
    const timeline = JSON.parse(localStorage.getItem('timeline')) || {};
    const currentAU = localStorage.getItem('currentAU');

    if (!timeline[currentAU]) {
        timeline[currentAU] = []; // Create a new timeline for the AU if it doesn't exist
    }

    // Add the new event and save to local storage
    timeline[currentAU].push(timelineEvent);
    timeline[currentAU].sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort events by date
    localStorage.setItem('timeline', JSON.stringify(timeline));

    // Clear input fields and reload the timeline
    document.getElementById('eventDate').value = '';
    document.getElementById('eventDescription').value = '';
    loadTimelineEvents(currentAU);
}

function loadTimelineEvents(currentAU) {
    const timelineDisplay = document.getElementById('timelineDisplay');
    timelineDisplay.innerHTML = ''; // Clear previous events

    const timeline = JSON.parse(localStorage.getItem('timeline')) || {};
    const auTimeline = timeline[currentAU] || [];

    if (auTimeline.length === 0) {
        timelineDisplay.innerHTML = '<p>No events added to the timeline.</p>';
        return;
    }

    auTimeline.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('timeline-event');
        eventElement.innerHTML = `
            <p><strong>${event.date}</strong>: ${event.description}</p>
        `;
        timelineDisplay.appendChild(eventElement);
    });
}
