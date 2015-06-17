var Hapi = require('hapi');
var fs = require('graceful-fs');
var IS_LOCAL = (process.argv.slice(2).indexOf('--local') > -1);

var log = fs.createWriteStream('log.txt', {'flags': 'a'});
log.write('Line\tMessage\tURL\n');
log.end();

var server = new Hapi.Server();

// locally it runs on 8080, dokku runs on 5000
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
        var log = fs.createWriteStream('log.txt', {'flags': 'a'});
        var line = '';
        Object.keys(request.query).forEach(function (key) {
            line += request.query[key] + '\t';
        });
        line += '\n';
        log.end(line);
        reply();
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
