"use strict";
// logged in username global variable
var username = "";
var searchTerm = "";

// Return to landing page
$("nav h3").on("click", function (event) {
    $(".header").show();
    $(".dashboard").hide();
    $(".search-results").hide();
    $(".my-profile").hide();
    $(".new-releases-full").hide();
    $(".login-box").hide();
});

// Switch login and signup forms
$('#to-login').on("click", function (event) {
    $('.signup-box').hide();
    $('.login-box').show();
});

$('#to-signup').on("click", function (event) {
    $('.login-box').hide();
    $('.signup-box').show();
});

// From login
$("#login-btn").on("click", function (event) {
    event.preventDefault();
    // take input from user
    var inputEmail = $('#login-username').val();
    var inputPassword = $('#login-password').val();
    console.log(inputEmail, inputPassword);
    // check username for spaces, empty, undefined
    if ((!inputEmail) || (inputEmail.length < 1) || (inputEmail.indexOf(' ') > 0)) {
        alert('Invalid username');
    }
    // check password for spaces, empty, undefined
    else if ((!inputPassword) || (inputPassword.length < 1) || (inputPassword.indexOf(' ') > 0)) {
        alert('Invalid password');
    }
    // if username and password are valid
    else {
        // create user object
        var usernamePwObject = {
            username: inputEmail,
            password: inputPassword
        };
        username = inputEmail;
        // make API call with user object
        $.ajax({
                type: "POST",
                url: "/login",
                dataType: 'json',
                data: JSON.stringify(usernamePwObject),
                contentType: 'application/json'
            })
            // if API call is successful
            .done(function (result) {
                // display result and login user
                console.log(result);
                username = result.username;
                $('.header').hide();
                $('.dashboard').show();
            })
            // if API call unsuccessful
            .fail(function (jqXHR, error, errorThrown) {
                // return errors
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Invalid user and password combination');
            });
    }
});

// From signup
$("#signup-btn").on("click", function (event) {
    event.preventDefault();
    // take input from user
    var inputEmail = $('#username').val();
    var inputPassword = $('#password').val();
    var confirmPassword = $('#confirm-password').val();
    console.log(inputEmail, inputPassword, confirmPassword);
    // validate email
    if ((!inputEmail) || (inputEmail.length < 1) || (inputEmail.indexOf(' ') > 0)) {
        alert('Invalid username');
    }
    // validate password
    else if ((!inputPassword) || (inputPassword.length < 1) || (inputPassword.indexOf(' ') > 0)) {
        alert('Invalid password');
    }
    // validate confirmPassword
    else if (inputPassword != confirmPassword) {
        alert('Passwords must match');
    }
    // if username and password are valid, make api call to create new user
    else {
        // generate user/password object
        var usernamePwObject = {
            username: inputEmail,
            password: inputPassword
        };
        // using user/password object, make the local login API call
        $.ajax({
                type: "POST",
                url: "/users/create",
                dataType: 'json',
                data: JSON.stringify(usernamePwObject),
                contentType: 'application/json'
            })
            // if login is successful
            .done(function (result) {
                // display results
                $('.header').hide();
                $('.search-results').show();
            })
            // if login is unsuccessful
            .fail(function (jqXHR, error, errorThrown) {
                // display errors
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

//Handle navbar links
//Navigate to dashboard from navbar
$('#nav-dashboard').on("click", function (event) {
    $('.header').hide();
    $(".search-results").hide();
    $(".my-profile").hide();
    $(".new-releases-full").hide();
    $('.dashboard').show();
});

// navigate to search page from navbar
$('#nav-search').on("click", function (event) {
    $('.dashboard').hide();
    $('.header').hide();
    $(".my-profile").hide();
    $(".new-releases-full").hide();
    $(".search-results").show();
});

// navigate to profile from navbar
$('#nav-profile').on("click", function (event) {
    $('.header').hide();
    $('.dashboard').hide();
    $(".search-results").hide();
    $(".new-releases-full").hide();
    $(".my-profile").show();
});

// navigate to new releases from navbar
$('#nav-new-releases').on("click", function (event) {
    $('.header').hide();
    $('.dashboard').hide();
    $(".search-results").hide();
    $(".my-profile").hide();
    $(".new-releases-full").show();
});

// search for books
$("#author-search").on("submit", function (event) {
    // take input from user
    event.preventDefault();
    var searchInput = $("#search-input").val();
    console.log(searchInput);
    // check username for spaces, empty, undefined
    if (searchInput.length < 1) {
        alert('Please enter a search term');
    }
    // if search is valid
    else {
        searchTerm = searchInput;
        // make API call with searchTerm
        $.ajax({
                type: "POST",
                url: "/search",
                dataType: 'json',
                data: JSON.stringify(searchTerm),
                contentType: 'application/json'
            })
            // if API call is successful
            .done(function (result) {
                // display search results
                console.log(result);
                //                username = result.username;
                //other stuff happens with successful API call (display results)
            })
            // if API call unsuccessful
            .fail(function (jqXHR, error, errorThrown) {
                // return errors
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Something went wrong');
            });
    }
});

// search from dashboard
$("#dashboard-search").on("click", function (event) {
    event.preventDefault();
    $('.dashboard').hide();
    $('.search-results').show();
});

// display book entry
function displayBooks(books) {
    var buildTheHtmlOutput = '';
    if (books.items == undefined) {
        var htmlOutput = "Sorry, no books!";
    } else {
        $.each(books.items, function (index, value) {
                console.log(value.volumeInfo);
                buildTheHtmlOutput += '<div class="result-box col-sm-6 col-md-4">';
            }
        }

        // remove book entry from new releases
        $('.remove').on("click", function (event) {
            $('.book-entry').eventCurrentTarget.hide();
        });

        // show/hide books in series
        $('.series-author, .series-name').on("click", this, function (event) {
            console.log("test");
            //    $(this).nextAll('.books-in-series').toggleClass("hidden")
            $(this).nextAll('.series-wrapper').toggle();
        });


        $(document).ready(function (event) {
            $(".dashboard").hide();
            $(".search-results").hide();
            $(".my-profile").hide();
            $(".new-releases-full").hide();
            $(".login-box").hide();
            //    $('.books-in-series').hide();
            $(".series-wrapper").hide();
        });


        // should I hide new releases that are removed or added, or should I prevent from populating with API call?
