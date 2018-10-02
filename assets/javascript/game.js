$(document).ready(function () {



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyApLk8Q6AsYyaBWsfIcg4wNT5_9k1yhgEY",
        authDomain: "rock-paper-scissors-125125.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-125125.firebaseio.com",
        projectId: "rock-paper-scissors-125125",
        storageBucket: "rock-paper-scissors-125125.appspot.com",
        messagingSenderId: "304058644937"
    };
    var playerOneStatus = false;
    var playerTwoStatus = false;
    var check = true;

    firebase.initializeApp(config);


    //we need to track how many users are connected so we can start 
    //building rules for our game

    //initalize the database
    var database = firebase.database();

    //have a variable target the connections tab in the database
    var connectionsTab = database.ref("/Connections");
    //have a variable taraget the game mechanics tab in the database
    var gameMechanics = database.ref("/GameMechanics");

    //have a variable target when someone connects
    var whenConnected = database.ref(".info/connected");

    //check if anything changed within whenConnected
    whenConnected.on('value', function (snap) {
        //if snap val is true
        if (snap.val()) {
            //write data too the connections tab
            var con = connectionsTab.push({
                Status: true,
            })

            //we create another variable because we want to delete a specific one 
            //when the user dissconnects
            //this will remove the specific user that lef
            con.onDisconnect().remove();
        }
    })

    //we want to check if anything in connections tab has changed
    //we will store how many people are online here
    connectionsTab.on('value', function (snap) {
        var numOnline = snap.numChildren();
        if (check == true) {
            if (numOnline == 1) {
                gameMechanics.update({
                    playerOneStatus: true,
                });


            }
            if (numOnline == 2) {
                gameMechanics.update({
                    playerTwoStatus: true,
                });
                check = false;
            }
        }
        else {
            if (numOnline == 1) {
                gameMechanics.update({
                    playerTwoStatus: false,
                });
            }
            if (numOnline == 0) {
                gameMechanics.update({
                    playerOneStatus: false,
                });
            }
        }




    })





})