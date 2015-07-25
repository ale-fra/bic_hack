/**
 * Created by alessandrofrancia on 24/07/15.
 */
var models_schema = require('mongoose').models_schema;
var User = models_schema.Users;
var Nfc_tag = models_schema.Nfc_tags;
module.exports = {
    'activate_machine': function (socket) {
        socket.on('request:activate_machine', function (data) {
            var machine_id = data.machine_id;
            var user_id = data.user_id;
            Nfc_tag.findById(machine_id, function (err, nfc_tag) {
                if (!nfc_tag) {
                    console.log('Nfc_tag not found');
                    socket.emit('send:activate_machine', {'result_code': -1, 'msg': 'Nfc_tag not found'});
                }

                User.findById(user_id, function (err, user) {
                    if (!user) {
                        console.log('User not found');
                        socket.emit('send:open_door', {'result_code': -1, 'msg': 'User not found'});

                        return;
                    }
                    if (user.role !== 0) {
                        Nfc_tag.find({'authorized._id': data.user_id}, function (err, nfc_tag) {
                            if (nfc_tag.length == 0) {
                                socket.emit('send:activate_machine', {'result_code': -1, 'msg': 'User non authorized'});
                            }
                        });
                    } else {


                        Nfc_tag.findById(machine_id, function (err, nfc_tag) {
                            nfc_tag.state = 1 ;
                            nfc_tag.in_use.push(user);
                            nfc_tag.save(function(err,nfc_tag){
                                socket.emit('send:activate_machine', {'result_code': 0, 'machine': nfc_tag});
                                //setTimeout(function(){
                                //    Nfc_tag.findById(machine_id, function (err, nfc_tag) {
                                //        nfc_tag.state = 0 ;
                                //        nfc_tag.save(function(err,nfc_tag){
                                //            socket.emit('send:deactivate_machine', {'result_code': 0, 'door_id': machine_id});
                                //        });
                                //    });
                                //},5*1000)
                            });
                        });

                    }


                });
            });


        });
    },
    'get-machines' : function(socket){
        socket.on('request:get-machines',function(){
            Nfc_tag.find({'type':1},function(err,machines){
                socket.emit('send:get-machines',machines);

            })
        })
    }


};

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