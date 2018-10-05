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
    //create a global connections tab
    var playerTab = "";
    //a variable to store the username
    var username = "";
    var playerOneSelection = "";
    var playerOneUsername = "";
    var playerTwoSelection = "";
    var playerTwoUsername = "";
    $(document).on('click', '#username-btn', function (e) {
        e.preventDefault();
        //stores the text of the username entered
        username = $('#username-txt').val().trim();
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
                //if the connecion drops, remove the player that was added
                playerTab.onDisconnect().remove();
            }


            alert('player one: select weapon!');
            alert('player two: select weapon!');

        })
        $(document).on('click', '#weapons', function (e) {
            e.preventDefault();
            var selection = $(this).attr('data-value');
            playerTab.update({
                selection: selection,
            })
        })



        playerTab.on('value', function (snapshot) {

        });



    })


})






