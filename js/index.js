var app = {
    // Application Constructor
    initialize: function() {
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
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        
        





$("#loginForm").on("submit",function(e) {
	alert("submit was called!");
//disable the button so we can't resubmit while we wait
$("#submitButton",this).attr("disabled","disabled");
var u = $("#username", this).val();
var p = $("#password", this).val();
if(u != '' && p!= '') {
$.post("http://www.desy.de/~bvenne/sicher/", {username:u,password:p}, function(res) {
if(res == true) {
//$.mobile.changePage("some.html");
alert("GEHT!!!");
} else {
navigator.notification.alert("Your login failed", function() {});
alert("LOGIN FALSCH!");
}
$("#submitButton").removeAttr("disabled");
},"json");
}
return false;
});
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		console.log("Device is ready, yo!");
		/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		*/
        console.log('Received Event: ' + id);
    }
};
