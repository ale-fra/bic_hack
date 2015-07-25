/**
 * Created by alessandrofrancia on 22/07/15.
 */
var to_handle = {};
module.exports = {
    register: function (app) {


        return function (socket) {
            // Bind events to handlers
            for (var event_name in to_handle) {
                var fn = to_handle[event_name];
                fn(socket);

            }

            // Keep track of the socket
            //app.allSockets.push(socket);
        };
    },
    add : function(events){
        for(var event_name in events){
            to_handle[event_name] = events[event_name];
        }
    }

};