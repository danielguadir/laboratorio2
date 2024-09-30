document.addEventListener('DOMContentLoaded', loadEvents);

document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const titleInput = document.getElementById('event-title');
    const dateInput = document.getElementById('event-date');

    const title = titleInput.value;
    const date = dateInput.value;

    if (title && date) {
        addEventToList(title, date);
        saveEventToLocal(title, date);
        titleInput.value = '';
        dateInput.value = '';
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => addEventToList(event.title, event.date));
}

function saveEventToLocal(title, date) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ title, date });
    localStorage.setItem('events', JSON.stringify(events));
}

function addEventToList(title, date) {
    const eventList = document.getElementById('event-list');
    const eventItem = document.createElement('div');
    eventItem.classList.add('event-item');

    eventItem.innerHTML = `
        <span>${title} - ${new Date(date).toLocaleDateString()}</span>
        <button class="delete-btn" onclick="deleteEvent(this)">Eliminar</button>
    `;

    eventList.appendChild(eventItem);
}

function deleteEvent(button) {
    const eventItem = button.parentElement;
    eventItem.classList.add('fade-out');

    setTimeout(() => {
        eventItem.remove();
        removeEventFromLocal(eventItem.firstChild.textContent);
    }, 500); // Espera a que la animación termine antes de eliminar
}

function removeEventFromLocal(eventText) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => `${event.title} - ${new Date(event.date).toLocaleDateString()}` !== eventText);
    localStorage.setItem('events', JSON.stringify(events));
}

function filterEvents() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const eventItems = document.querySelectorAll('.event-item');

    eventItems.forEach(item => {
        const text = item.firstChild.textContent.toLowerCase();
        item.style.display = text.includes(searchInput) ? '' : 'none';
    });
}

