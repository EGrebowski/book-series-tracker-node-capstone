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
    var searchInput = $(".author-search-input").val();
    console.log(searchInput);
    // check username for spaces, empty, undefined
    if (searchInput.length < 1) {
        alert('Please enter a search term');
    }
    // if search is valid
    else {
        $.ajax({
                type: "GET",
                url: "/search/" + searchInput,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if API call is successful
            .done(function (result) {
                // display search results
                console.log(result);
                displayBooks(result);
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

$("#dashboard-author-search").on("submit", function (event) {
    // take input from user
    event.preventDefault();
    var searchInput = $(".author-search-input").val();
    console.log(searchInput);
    // check username for spaces, empty, undefined
    if (searchInput.length < 1) {
        alert('Please enter a search term');
    }
    // if search is valid
    else {
        $.ajax({
                type: "GET",
                url: "/search/" + searchInput,
                dataType: 'json',
                contentType: 'application/json'
            })
            // if API call is successful
            .done(function (result) {
                // display search results
                console.log(result);
                displayBooks(result);
                $('.dashboard').hide();
                $('.search-results').show();
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

// display book entry
function displayBooks(books) {
    var buildTheHtmlOutput = '';
    if (books.items == undefined) {
        var htmlOutput = "Sorry, no books!";
    } else {
        $.each(books.items, function (index, value) {
            console.log(value.volumeInfo);
            buildTheHtmlOutput += '<div class="book-entry">';
            buildTheHtmlOutput += '<img src="' + value.volumeInfo.imageLinks.thumbnail + '">';
            buildTheHtmlOutput += '<div class="book-info">';
            buildTheHtmlOutput += '<p class="book-title">' + value.volumeInfo.title + '</p>';
            buildTheHtmlOutput += '<p class="author">' + value.volumeInfo.authors + '</p>';
            buildTheHtmlOutput += '<p class="book-blurb">"The Eighth Story. Nineteen Years Later. Based on an original new story by J.K. Rowling, John Tiffany and Jack Thorne. It was always difficult being Harry Potter and it isn\'t much easier now that he is an overworked employee of the Ministry of Magic, a husband, and father of three school - age children.While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted.As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, more < /p>';
            buildTheHtmlOutput += '<form class="add-to-favorites">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-title" value="' + value.volumeInfo.title + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-author" value="' + value.volumeInfo.authors + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-thumbnail" value="' + value.volumeInfo.imageLinks.thumbnail + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-user" value="' + username + '">';
            buildTheHtmlOutput += '<button class="add" type="submit">Add to My Profile</button>';
            buildTheHtmlOutput += '</form>';
            buildTheHtmlOutput += '</div>';
            buildTheHtmlOutput += '</div>';
        });
        //use the HTML output to show it in the index.html
        $(".results").html(buildTheHtmlOutput);
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

$(document).on('submit', '.add-to-favorites', function (event) {
    event.preventDefault();
    var bookTitle = $(this).parent().find('.add-to-favorites-book-title').val();
    var bookAuthor = $(this).parent().find('.add-to-favorites-book-author').val();
    var bookThumbnail = $(this).parent().find('.add-to-favorites-book-thumbnail').val();
    var bookUser = $(this).parent().find('.add-to-favorites-book-user').val();

    var bookObject = {
        'bookTitle': bookTitle,
        'bookAuthor': bookAuthor,
        'bookThumbnail': bookThumbnail,
        'bookUser': bookUser,
        'bookSeries': ""
    };

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(bookObject),
            url: '/add-to-favorites/',
        })
        .done(function (result) {
            populateFavoritesContainer(username);
            //            populateBeenThereContainer();
            //            sweetAlert('Success!', 'Go explore!', 'success');
            console.log(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            sweetAlert('Oops...', 'Please try again', 'error');
        });
});

function populateFavoritesContainer(username) {
    $.ajax({
            type: "GET",
            url: "/get-favorites/" + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        // if API call is successful
        .done(function (result) {
            // display search results
            console.log(result);
            displayFavoritesContainer(result);
            //        $('.dashboard').hide();
            //        $('.search-results').show();
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

function displayFavoritesContainer(books) {
    var buildTheHtmlOutput = '';
    if (books.length == 0) {
        var htmlOutput = "Sorry, no books!";
    } else {
        $.each(books, function (index, value) {
            console.log(value.volumeInfo);
            buildTheHtmlOutput += '<div class="book-entry col-4">';
            buildTheHtmlOutput += '<div class="image-background">';
            buildTheHtmlOutput += '<img src="' + value.bookThumbnail + '">';
            buildTheHtmlOutput += '</div>';
            buildTheHtmlOutput += '<p class="book-title">' + value.bookTitle + '</p>';
            buildTheHtmlOutput += '<p class="author">' + value.bookAuthor + '</p>';
            buildTheHtmlOutput += '<form action="#" name="series-finder" class="series-finder">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-title" value="' + value.bookTitle + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-author" value="' + value.bookAuthor + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-thumbnail" value="' + value.bookThumbnail + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-user" value="' + username + '">';
            buildTheHtmlOutput += '<select name="series-input" class="add-to-series-name" id="series-input" placeholder="select series">';
            buildTheHtmlOutput += '<option value="" disabled selected>Select a Series</option>';
            buildTheHtmlOutput += '<option value="Harry Potter">Harry Potter</option>';
            buildTheHtmlOutput += '<option value="World of Harry Potter">World of Harry Potter</option>';
            buildTheHtmlOutput += '</select>';
            buildTheHtmlOutput += '<button type="submit">Assign</button>';
            buildTheHtmlOutput += '</form>';
            buildTheHtmlOutput += '</div>';
        });
        //use the HTML output to show it in the index.html
        $(".loose-books").html(buildTheHtmlOutput);
    }
}


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
