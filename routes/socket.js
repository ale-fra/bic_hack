/*
 * Serve content over a socket
 */


module.exports = {
    'send_name': function (socket) {
        socket.emit('send:name', {
            name: 'Bob'
        });
    },

    'send-name': function (socket) {
        socket.emit('send:name', {
            name: 'Lucsa'
        });
    },
    'send:time': function (socket) {
        setInterval(function () {
            socket.emit('send:time', {
                time: (new Date()).toString()
            })
        }, 1000)

    }

};


