var Hapi = require('hapi');
var fs = require('graceful-fs');
var IS_LOCAL = (process.argv.slice(2).indexOf('--local') > -1);

var log = fs.createWriteStream('log.txt', {'flags': 'a'});
log.write('Line\tMessage\tURL\n');

var server = new Hapi.Server();

server.connection({
    port: (IS_LOCAL) ? 8080 : 5000,
    routes: {
        cors: true
    }
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        var line = '';
        Object.keys(request.query).forEach(function (key) {
            line += request.query[key] + '\t';
        });
        line += '\n';
        log.write(line);
        reply('200 OK');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
