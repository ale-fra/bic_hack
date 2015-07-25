///**
// * Created by alessandrofrancia on 23/07/15.
// */
//
//module.exports = {
//    'send_name': function (socket) {
//        socket.emit('send:name', {
//            name: 'Bob'
//        });
//    },
//    'test-send': function (socket) {
//        socket.on('send:test-send', function (data) {
//            console.error('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@test', data.to_log);
//        });
//    },
//    'send-name': function (socket) {
//        socket.emit('send:name', {
//            name: 'Lucsa'
//        });
//    },
//    'send:time': function (socket) {
//        //setInterval(function () {
//            socket.emit('send:time', {
//                time: (new Date()).toString()
//            });
//        //}, 1000)
//
//    }
//
//};
