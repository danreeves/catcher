var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    port: 8000
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
       reply('HAPI');
    }
});

server.start();
