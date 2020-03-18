
const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    fetch('/weather?address='+ address.value +'').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.style.color = 'red';
            messageOne.textContent = data.error;
        } else {
            messageOne.style.color = 'blue';
            messageTwo.style.color = 'green';
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});
});