socket examples:

in order to use easily the console dev of chrome, i put socket as global variable as sok,

open door: 

//this open the door for 5 sec
          
sok.emit('request:open_door',{door_id:'55b109fee34f02de0dcfdcda',user_id:'55b105b6ec1e92a90dccb764'})

//this set active a machine, and set in db who is  using it

 sok.emit('request:activate_machine',{machine_id:'55b257e677984aed55f8d337',user_id:'55b105b6ec1e92a90dccb764'})