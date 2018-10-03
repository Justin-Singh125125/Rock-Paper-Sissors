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



    firebase.initializeApp(config);
    var totalConnected = 0;
    var playerOneStatus = false;
    var playerOneName = "";
    var playerTwoStatus = false;
    var playerTwoName


    //we need to track how many users are connected so we can start 
    //building rules for our game

    //initalize the database
    var database = firebase.database();

    //have a variable target the connections tab in the database
    var connectionsTab = database.ref("/Connections");
    var game = database.ref('/Game');


    //have a variable target when someone connects
    var whenConnected = database.ref(".info/connected");

    //check if anything changed within whenConnected
    whenConnected.on('value', function (snap) {
        //if snap val is true
        if (snap.val()) {
            //write data too the connections tab

            var con = connectionsTab.push({
                playerStatus: true,
            })

            //we create another variable because we want to delete a specific one 
            //when the user dissconnects
            //this will remove the specific user that lef
            con.onDisconnect().remove();
        }
    })

    connectionsTab.on('child_added', function () {
        totalConnected += 1;
        if (totalConnected == 1) {
            game.update({
                playerOneStatus: true,
            })
        }
        if (totalConnected == 2) {
            game.update({
                playerTwoStatus: true,
            })
        }
        console.log(totalConnected);
    })
    connectionsTab.on('child_removed', function () {
        totalConnected -= 1;
        if (totalConnected < 2) {
            game.update({
                playerTwoStatus: false,
            })
        }
        if (totalConnected < 1) {
            game.update({
                playerOneStatus: false,
            })
        }
        console.log(totalConnected);
    })

    //this will store the users text
    $('#username-btn').on('click', function (e) {
        e.preventDefault();
        var usernameText = $("#username-text").val().trim();
        console.log(usernameText);
        game.on('value', function (snap) {
            playerOneStatus = snap.val().playerOneStatus;
            playerTwoStatus = snap.val().playerTwoStatus;
        })

        if (playerOneStatus == true && playerTwoStatus == false) {
            $('#player-1-status').text(usernameText);
        }
    })



})






