/**
 * Created by alessandrofrancia on 22/07/15.
 */

module.exports ={
    'test-log': function (socket) {
        socket.on('send:client-log', function (data) {
            console.error('Client-Error : ', data.to_log);
        });
    }
}