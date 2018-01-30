'use strict';
const sendMessageForm = document.querySelector('#contact-form');
const closeAlertButtons = [...document.querySelectorAll('.close-alert')];

closeAlertButtons.forEach((button) => button.addEventListener('click', closeAlert));
sendMessageForm.addEventListener('submit', sendMessage);

function closeAlert() {
    this.parentElement.classList.add('hidden');
}

async function sendMessage(e) { // jshint ignore:line
    e.preventDefault();

    const form = this;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;

    if (name.length > 0 && email.length > 0 && message.length > 0) {
        const data = {
            name,
            email,
            message
        };
        try {
            const res = await axios.post('/send-message', data); // jshint ignore:line

            form.querySelector('.message').innerText = res.message;
            form.querySelector('.alert').classList.remove('hidden');
        } catch (err) {
            console.log(err);
        }
    }
}