/**
 * Created by alessandrofrancia on 23/07/15.
 */
var models_schema = require('mongoose').models_schema;
var User = models_schema.Users;
var Nfc_tag = models_schema.Nfc_tags;
module.exports = {
    'open_door': function (socket) {
        socket.on('request:open_door', function (data) {
            var door_id = data.door_id;
            var user_id = data.user_id;
            //locking for the nfc_tag on db
            Nfc_tag.findById(door_id, function (err, nfc_tag) {
                if (!nfc_tag) {
                    console.log('Nfc_tag not found');
                    socket.emit('send:open_door', {'result_code': -1, 'msg': 'Nfc_tag not found'});

                    return;
                }
                //locking dor USER
                User.findById(user_id, function (err, user) {
                    if (!user) {
                        //if dont found user send error to client
                        console.log('User not found');
                        socket.emit('send:open_door', {'result_code': -1, 'msg': 'User not found'});

                        return;
                    }

                        //lock if user have permision to open it
                        Nfc_tag.find({'authorized._id': data.user_id}, function (err, nfc_tag) {
                            //if dont find it send client error
                            if (nfc_tag.length == 0) {
                                socket.emit('send:open_door', {'result_code': -1, 'msg': 'User non authorized'});
                            }else {
                                //if find set state 1 (1 is active, 0 is not active, 2 error)
                                nfc_tag.state = 1;
                                nfc_tag.save(function (err, nfc_tag) { //Save it on db
                                    //Send open door to client
                                    socket.emit('send:open_door', {'result_code': 0, 'door_id': door_id});

                                    setTimeout(function () { //After few second the door have to be locked

                                        Nfc_tag.findById(door_id, function (err, nfc_tag) {
                                            nfc_tag.state = 0;
                                            nfc_tag.save(function (err, nfc_tag) {
                                                socket.emit('send:close_door', {'result_code': 0, 'door_id': door_id});
                                            });
                                        });
                                    }, 5 * 1000)
                                });
                            }
                        });
                });
            });


        });
    },

    //gets all doors
    'get-doors' : function(socket){
        socket.on('request:get-doors',function(){
            Nfc_tag.find({'type':0},function(err,doors){
                socket.emit('send:get-doors',doors);

            })
        })
    }


};


// var room_1 = {
//     'name' :  'room_1',
//     'capacity' : 50
// };
// function create_room(name,capacity,other){

//     return{
//         'name': name,
//         'capacity':
//     }
// }

/*
 sok.on('send:open_door', function (data) {
 if(data.result_code ==0){
 alert('aprendo la porta : ' + data.door_id);
 }else if(result_code == -1){
 alert('Error : ' + data.msg);
 }
 });


 sok.emit('request:open_door',{door_id:'55b109fee34f02de0dcfdcda',user_id:'55b105b6ec1e92a90dccb764'})
 */