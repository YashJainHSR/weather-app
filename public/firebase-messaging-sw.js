importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDYb8OqS8mu3AQnBWGkM9MFjCGem1jc-Ew",
    authDomain: "yara-rice.firebaseapp.com",
    databaseURL: "https://yara-rice.firebaseio.com",
    projectId: "yara-rice",
    storageBucket: "yara-rice.appspot.com",
    messagingSenderId: "1045417038993",
    appId: "1:1045417038993:web:be5489bdbf5477d5de1b30"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const title = "Hello";
    const options = {
        body: payload.data.time
    }
    return self.registration.showNotification(title, options);
});