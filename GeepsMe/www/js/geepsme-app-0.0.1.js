/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var geepsme = {
    // Application Constructor
    initialize: function() {
        this.dataStore = null;
        this.devicePosition = null;
        this.gpsWatchId=null;
        this.gpsIntervalId=null;
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        geepsme.receivedEvent('deviceready');
        
        //geepsme.storageInitialise();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    startLocationLog: function(){
        console.log("startLocationLog");
        var options = { enableHighAccuracy: true, timeout:10000, maximumAge:3000 };
        gpsWatchId = navigator.geolocation.watchPosition(this.onSuccess, this.onError, options);
        //gpsWatchId = navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, options);
        gpsIntervalId = setInterval(function()
         {
            geepsme.updatePosition(geepsme.devicePosition);
         }, 3000);
         
    },
    stopLocationLog: function(){
        console.log("stopLocationLog");
        if (gpsWatchId != null) {
            navigator.geolocation.clearWatch(gpsWatchId);
            gpsWatchId = null;
        }
       
        if (gpsIntervalId != null) {
            clearInterval(gpsIntervalId);
            gpsIntervalId = null;
        }
        
    },
    onSuccess: function(position){ 
        geepsme.devicePosition = position;
        //console.log("onSuccess");
        //can be used to control output frequecy for display updates if needed < 1 per second
        //which is the iphone simulations timeout (overriding options)
        //TODO: test on actual device
        //geepsme.updatePosition(position);
    },
    updatePosition: function(position){
      //this should only be called periodically according to timeout
        if (position != null){
            
            var gpsTime = moment(position.timestamp);
            
            console.log( 'TIMEOUT ' +
                        'Latitude: '           + position.coords.latitude              +
                        'Longitude: '          + position.coords.longitude             +
                        'Altitude: '           + position.coords.altitude              +
                        'Accuracy: '           + position.coords.accuracy              +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      +
                        'Heading: '            + position.coords.heading               +
                        'Speed: '              + position.coords.speed                 +
                        'Timestamp: '          + position.timestamp
            );
            
            $("#testoutput").append("<div data-role='collapsible' data-inset='false' data-mini='true'>" +
                                        "<h2>GPS data: "+ gpsTime.format("HH:mm:ss.SSS") +"</h2>" +
                                        "<ul data-role='listview'>" +
                                        "<li>Lat:"+ position.coords.latitude + "</li>" +
                                        "<li>Long:" + position.coords.longitude + "</li>" +
                                        "<li>Accuracy:" + position.coords.accuracy + "</li>" +
                                        "<li>Speed:" + position.coords.speed + "</li>" +
                                        "<li>Timestamp:" + position.timestamp + "</li>" +
                                        "</ul>" +
                                    "</div>").trigger("create");
        }
    },
    onError: function(error){
        console.log('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
    },
    //wrapper to setup local storage. current using lawnchair with indexed-db adapter
    storageInitialise: function(){
        dataStore = Lawnchair({name:"geepsme",record:"datastore",adapter:"indexed-db"}, function(){
            console.log("storage open");
        });
    },
    setStorageData: function(){
        var dataobj1 = {name:"test name",value:"test val"};
        dataStore.save({key:"1", value:dataobj1});
    },
    getStorageData: function(){
        dataStore.all(function(arrData){
            for(var i = 0; i<arrData.length;i++)
            {
            console.log(arrData[i]);
            }

        });
    }
};
