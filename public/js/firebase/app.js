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

messaging.requestPermission()
    .then(function () {
        console.log('Permissions Granted!');
        return messaging.getToken();
    })
    .then(function (token) {
        document.getElementById("message-1").innerHTML(token);
        console.log('token', token);
    })
    .catch(function (err) {
        console.log('error', err);

    });
messaging.onMessage(function (payload) {
    document.getElementById("message-2").innerHTML(payload.data.crop);
    console.log('onScreen Message', payload);
});