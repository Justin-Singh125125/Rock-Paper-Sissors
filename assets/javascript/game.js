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

    //we need to track how many users are connected so we can start 
    //building rules for our game

    //initalize the database
    var database = firebase.database();
    var playerData = database.ref("All-Player-Data");
    //create a global connections tab
    var playerTab = "";
    //a variable to store the username
    var username = "";
    var playerOneSelection = "";
    var playerOneUsername = "";
    var playerTwoSelection = "";
    var playerTwoUsername = "";
    var playerCount = 0;
    var playerCountReached = false;
    var currentPlayer = 0;




    //this controls how many players are joined at a time
    $(document).on('click', '#username-btn', function (e) {
        e.preventDefault();
        //stores the text of the username entered
        username = $('#username-txt').val().trim();

        //if we have one or two playerse
        if (!playerCountReached) {
            //creates a new tab in the database that has the user logged in
            playerTab = database.ref("Players/" + username);
            //push the user setttings
            playerTab.set({
                username: username,
                wins: 0,
                losses: 0,
                selection: "",
            })

            //have a variable target when someone connects
            var whenConnected = database.ref(".info/connected");

            //check if anything changed within whenConnected
            whenConnected.on('value', function (snap) {
                //if snap val is true
                if (snap.val()) {
                    playerTab.onDisconnect().remove();

                }



            })
        }



        //this function keeps track of total players
        database.ref('Players').on('value', function (snap) {
            playerCount = snap.numChildren();
            console.log(playerCount);
            if (playerCount == 2) {
                playerCountReached = true;
            }
            if (playerCount == 1) {
                playerCountReached = false;
            }
        })







    })
    $(document).on('click', '#weapons', function (e) {
        e.preventDefault();
        console.log(playerCount);
        var selection = $(this).attr('data-value');
        if (playerCount == 1) {
            console.log('test');
            alert('Player One, select your weapon!');


            playerData.update({
                playerOneChoice: selection,
            })
        }
        if (playerCount == 2) {

            alert('Player Two, select your weapon!');
            playerData.update({
                playerTwoChoice: selection,
            })
        }


    })


})






