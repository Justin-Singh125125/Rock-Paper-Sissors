$(document).ready(function () {
    console.log('test');


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

    //create a database
    var database = firebase.database();


    var p1Wins = 0;
    var p1Losses = 0;
    var p1Name = 0;
    var p1Choice = "";

    var p2Wins = 0;
    var p2Losses = 0;
    var p2Name = 0;
    var p2Choice = "";

    var playerTurn = 0;
    var whoAmI = "none";

    var theme = 1;

    var numOnline = 0;
    //this button will initialize the whole entire database for the players
    $(document).on('click', '#playerNameButton', function (e) {
        //stops the webpage from refresing
        e.preventDefault();
        var playerName = $('#getPlayerName').val().trim();
        //store information in database
        //this will initialize all of the player data
        database.ref().on('value', function (snap) {
            numOnline = snap.val().count;
        })
        numOnline++;
        database.ref().update({
            Name: playerName,
            Wins: 0,
            Loses: 0,
            playerTurn: playerTurn,
            count: numOnline,

        })


    })




})