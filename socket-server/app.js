'use strict';
const fs = require('fs');
var app = require('express')();
var HttpsServer = require('http')
const server = HttpsServer.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
require('dotenv').config();

var redisPort = process.env.REDIS_PORT;
var redisHost = process.env.REDIS_HOST;

var ioRedis = require('ioredis');
var redis = new ioRedis(redisPort, redisHost);

redis.psubscribe('*', (err, count) => {
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message);
    } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
    }
});

redis.on('pmessage', function(subscribed, channel, message) {
    const event = JSON.parse(message);
    io.emit(event.event, channel, event.data);
    console.log('Event: ' + event.event);
    console.log('channel: ' + channel);
    console.log('message: ' + event.data);
});

var broadcastPort = process.env.BROADCAST_PORT;

server.listen(broadcastPort, function() {
    console.log("server is runing");
});
