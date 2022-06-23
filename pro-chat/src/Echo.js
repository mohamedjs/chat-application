/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo'

window.io = require('socket.io-client');

const Echojs = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
    forceTLS: true,
    wsPort: 6001,
    wssPort: 6001,
    enabledTransports: ['ws', 'wss'],
    wsHost: window.location.hostname,
    transports: ['websocket', 'polling', 'flashsocket'], // Fix CORS error!
    logToConsole: true,
    // authEndpoint: '/custom/endpoint/auth'
    // namespace: 'App.Events'
    // disableStats: true,
    // encrypted: true,
    // cluster: 'eu',
    // logToConsole: true
    // auth: {
    //     headers: {
    //         /** I'm using access tokens to access  **/
    //         Authorization: "Bearer " + Cookies.get('access_token')
    //     }
    // }
});

export default Echojs;
