var helloworld1 = {
    

    // Application Constructor
initialize: function() {
    this.helloWorldData = "";
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    console.log("Initialising helloworld1 js app");
    helloWorldData = this.createStorage();
    var dataobj1 = {name:"test name",value:"test val"};
    helloWorldData.save({key:"1", value:dataobj1});
    helloWorldData.get("1", function (data){
        console.log(data);
    });
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
onDeviceReady: function() {
   
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
    
},
    
createStorage: function() {
    console.log("createStorage");
    var storage = Lawnchair({name:"helloworld",record:"hello",adapter:"indexed-db"}, function(){
        console.log("storage open");
    });
    return storage;
},

getStorageData: function() {
    helloWorldData.all(function(arrBeers){
        for(var i = 0; i<arrBeers.length;i++)
        {
          console.log(arrBeers[i]);
        }

    });
},
    
setStorageData: function() {
    var dataobj1 = {name:"test name2",value:"test val 2"};
    helloWorldData.save({key:"2", value:dataobj1});
}
    
};