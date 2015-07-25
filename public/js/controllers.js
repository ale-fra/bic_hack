'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AppCtrl', ['$scope', 'socket', 'toaster','$location', function ($scope, socket, toaster,$location) {
        socket.on('send:name', function (data) {
            $scope.name = data.name;
        });
        socket.on('goto:profile',function(){
            $scope.go('/user_detail');
        });
        $scope.go = function (path) {
            $location.path(path);
        };
    }]).
    controller('MyCtrl1', ['$scope', 'socket', 'toaster', function ($scope, socket, toaster) {
        window.sok = socket; //TODO TEST

        $scope.hours = [6,7,8,9,10,11,12,1,2,3,4,5]

        socket.emit('request:get-doors');
        socket.on('send:get-doors', function (data) {
            var door = $scope.doors = {};
            data.forEach(function (a) {
                door[a._id] = a;
            })
        })
        socket.emit('request:get-machines');
        socket.on('send:get-machines', function (data) {
            var door = $scope.machines = {};
            data.forEach(function (a) {
                door[a._id] = a;
            })
        })

        socket.on('send:time', function (data) {
            $scope.time = data.time;

        });
        socket.on('send:door-change-state', function (data) {
            $scope.name = data.name;
        });
        $scope.doorClick = function (id) {
            console.log(id);
        };


        //TODO MOVE ON MOBILE DEVICE
        socket.on('send:open_door', function (data) {
            if (data.result_code == 0) {
                //alert('aprendo la porta : ' + data.door_id);
                toaster.pop('success', "Approved", 'aprendo la porta : ' + data.door_id);
                $scope.doors[data.door_id].state = 1;

            } else if (data.result_code == -1) {
                //alert('Error : ' + data.msg);
                toaster.pop('error', "Error", data.msg);

            }
        });
        socket.on('send:close_door', function (data) {

            if (data.result_code == 0) {
                //alert('aprendo la porta : ' + data.door_id);
                toaster.pop('success', "Approved", 'chiudendo la porta : ' + data.door_id);
                $scope.doors[data.door_id].state = 0;

            }
        });


        setTimeout(function () {
            socket.emit('send:test-send', {
                to_log: 'looooging'
            });
        }, 10000);

    }]).
    controller('MyCtrl2', ['$scope', 'socket', 'toaster', 'uiCalendarConfig', function ($scope, socket, toaster, uiCalendarConfig) {
        window.sok = socket; //TODO TEST

        function room(name, current, cap) {
            this.name = name;
            this.current = current;
            this.capacity = cap;
        }

        // socket.emit('request:get-rooms');
        // socket.on('send:get-rooms',function(data){
        //     var door = $scope.rooms= {};
        //     data.forEach(function(a,b,c){
        //         door[a._id] = new room(a,b,c);
        //     })
        // })
        //calendar
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            console.log(date.title + ' was clicked ');
        };
        $scope.calendarConfig = {
            height: 450,
            editable: true,
            header: {
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender,

            'businessHours': {
                start: '10:00', // a start time (10am in this example)
                end: '18:00', // an end time (6pm in this example)

                dow: [1, 2, 3, 4, 5]
                // days of week. an array of zero-based day of week integers (0=Sunday)
                // (Monday-Thursday in this example)
            },
            'dayNames': ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Domenica"],
            'dayNamesShort': ["Dom", "Lub", "Mar", "Mer", "Gio", "Ven", "Sab"]

        };
        $scope.eventSources = [];
        if (uiCalendarConfig.calendars['myCalendar1']) {
             uiCalendarConfig.calendars['myCalendar1'].fullCalendar('render');
        }

        setTimeout(function () {
            uiCalendarConfig.calendars['myCalendar1'].fullCalendar('changeView', 'agendaWeek');
        }, 0);
        $scope.rooms = [];
        $scope.rooms.push(new room('Stanza 1', 7, 8));
        $scope.rooms.push(new room('Stanza 2', 3, 8));
        $scope.rooms.push(new room('Stanza 3', 4, 12));
        $scope.rooms.push(new room('Stanza 4', 4, 6));

        $scope.getTimes = function (n) {
            var array = new Array(n)

            for (var i = 0; i < n; i++) {
                array[i] = i + 1;
            }

            return array
        };
    }]).
    controller('UserCtrl', ['$scope', 'socket', '$modal', '$location','uiCalendarConfig', function ($scope, socket, $modal, $location,uiCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        $scope.go = function (path) {
            $location.path(path);
        };


        $scope.open_calendar= function(){
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/partials/myUserCalendar',
                controller: 'UserCtrl',
                size: 'lg'

            });
        };



        $scope.calendarConfig = {
            height: 700,
            editable: true,
            header: {
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender,

            'businessHours': {
                start: '10:00', // a start time (10am in this example)
                end: '18:00', // an end time (6pm in this example)

                dow: [1, 2, 3, 4, 5]
                // days of week. an array of zero-based day of week integers (0=Sunday)
                // (Monday-Thursday in this example)
            },
            'dayNames': ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Domenica"],
            'dayNamesShort': ["Dom", "Lub", "Mar", "Mer", "Gio", "Ven", "Sab"]

        };

        //$scope.events : [
        //
        //    {title: 'TEST',start: new Date(2015, 7, 25, 19, 0),end: new Date(2015, 7, 25, 22, 30),allDay: false}
        //    //{title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        //];

        $scope.users = [{
            'Professione': 'CEO presso SmartBadge',
            'Data di registrazione': '06/11/2014',
            'Data di nascita': '28/07/1994',
            'Sesso' :   'Uomo',
            'Residenza': 'Roma, Via Merulana 199, 00100',
            'Email': 'edoardo.vallebella@gmail.com',
            'Cellulare': '339-2951740 (cell)'
        }];
        // fill calendar with fake events
        $scope.eventSources = [[

             {title: 'Stampa 3D',start: new Date(y, m, 1),end: new Date(y, m, 2)},
             {title: 'Postazione',start: new Date(y, m, 3),end: new Date(y, m, 4)},
            {title: 'Cutter',start: new Date(y, m, 6),end: new Date(y, m, 7)},

            {title: 'Postazione',start: new Date(y, m, 7),end: new Date(y, m, 8)},
             {title: 'Postazione',start: new Date(y, m, 14),end: new Date(y, m, 15)},
             {title: 'Stampa 3D',start: new Date(y, m, 15),end: new Date(y, m, 16)},
            {title: 'Lab',start: new Date(y, m, 19),end: new Date(y, m, 20)},
            {title: 'Hackhaton',start: new Date(y, m, 24),end: new Date(y, m, 26)}

        ]];
        if (uiCalendarConfig.calendars['myCalendar1']) {

                uiCalendarConfig.calendars['myCalendar1'].fullCalendar('render');
        }

    }]
);
