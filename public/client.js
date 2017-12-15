"use strict";
// logged in username global variable
var username = "";
var searchTerm = "";
//var seriesList = "";

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

// display book entry
function displayBooks(books) {
    var buildTheHtmlOutput = '';
    if (books.items == undefined) {
        var htmlOutput = "Sorry, no books!";
    } else {
        $.each(books.items, function (index, value) {
            console.log(value.volumeInfo);
            buildTheHtmlOutput += '<div class="book-entry col-12">';
            if (value.volumeInfo.imageLinks == undefined) {
                buildTheHtmlOutput += '<img src="images/no-image.gif">';
            } else {
                buildTheHtmlOutput += '<img src="' + value.volumeInfo.imageLinks.thumbnail + '">';
            }

            buildTheHtmlOutput += '<div class="book-info">';
            buildTheHtmlOutput += '<p class="book-title">' + value.volumeInfo.title + '</p>';
            buildTheHtmlOutput += '<p class="author">' + value.volumeInfo.authors + '</p>';
            buildTheHtmlOutput += '<p class="book-blurb">' + value.volumeInfo.description + '</p>';
            //            buildTheHtmlOutput += '<p class="book-blurb">' + value.volumeInfo.description '</p>';
            buildTheHtmlOutput += '<form class="add-to-favorites">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-title" value="' + value.volumeInfo.title + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-subtitle" value="' + value.volumeInfo.subtitle + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-author" value="' + value.volumeInfo.authors + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-publish-date" value="' + value.volumeInfo.publishedDate + '">';
            if (value.volumeInfo.imageLinks == undefined) {
                buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-thumbnail" value="images/no-image.gif">';
            } else {
                buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-thumbnail" value="' + value.volumeInfo.imageLinks.thumbnail + '">';
            }
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

function populateFavoritesContainer(username) {
    console.log("populateFavoritesContainer ran");
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
            //            displayBooksBySeries(result);
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
            if (value.bookSeries == "") {
                buildTheHtmlOutput += '<div class="book-entry col-4">';
                buildTheHtmlOutput += '<form action="#" name="delete-book" class="delete-book">';
                buildTheHtmlOutput += '<input type="hidden" class="formID" value="' + value._id + '">';
                buildTheHtmlOutput += '<button class="delete-series" type="submit"><i class="fa fa-trash" aria-hidden="true"></i></button>';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += '<div class="image-background">';
                buildTheHtmlOutput += '<img src="' + value.bookThumbnail + '">';
                buildTheHtmlOutput += '</div>';
                buildTheHtmlOutput += '<p class="book-title">' + value.bookTitle + '</p>';
                buildTheHtmlOutput += '<p class="author">' + value.bookAuthor + '</p>';
                buildTheHtmlOutput += '<form action="#" name="series-finder" class="series-finder">';
                buildTheHtmlOutput += '<input type="hidden" class="formID" value="' + value._id + '">';
                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-title" value="' + value.bookTitle + '">';
                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-subtitle" value="' + value.bookTitle + '">';
                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-author" value="' + value.bookAuthor + '">';
                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-thumbnail" value="' + value.bookThumbnail + '">';
                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-user" value="' + username + '">';
                buildTheHtmlOutput += '<select name="series-input" class="add-to-series-name" placeholder="select series">';
                buildTheHtmlOutput += '</select>';
                buildTheHtmlOutput += '<button class="assign-series" type="submit">Assign</button>';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += '</div>';
            }
        });
        populateSeriesDropdown();
        //use the HTML output to show it in the index.html
        $(".loose-books").html(buildTheHtmlOutput);
    }
}


function populateSeriesContainer(username) {
    console.log("populateSeriesContainer ran");
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
            displayBooksBySeries(result);
            // show/hide books in series
            $('.books-by-series .book-entry').hide();
            $('.series-title').on("click", this, function (event) {
                //    $(this).nextAll('.books-in-series').toggleClass("hidden")
                console.log("toggle books");
                $(this).nextUntil('.series-title').toggle();
            });
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

function displayBooksBySeries(books) {
    var buildTheHtmlOutput = '';
    console.log("displayBooksBySeries ran");
    console.log(books);
    console.log(books.bookSeries);
    let output = sortByKey(books, 'bookSeries');
    console.log(output);
    let currentSeries = "";
    let oldSeries = "";
    $.each(output, function (index, value) {
        if (value.bookSeries != "") {
            currentSeries = value.bookSeries;
            //            buildTheHtmlOutput += '<div class="series">';
            if (currentSeries != oldSeries) {
                buildTheHtmlOutput += '<div class="series-title col-12">';
                buildTheHtmlOutput += value.bookSeries + ',  ' + value.bookAuthor;
                buildTheHtmlOutput += '</div>';
            }
            //            buildTheHtmlOutput += '<p class="series-author">' + value.bookAuthor + '</p>';
            //            buildTheHtmlOutput += '<p class="series-name">' + value.bookSeries + '</p><br/>';
            //            buildTheHtmlOutput += '<div class="series-wrapper col-12">';
            //            buildTheHtmlOutput += '<div class="placeholder col-1">w</div>';
            //            buildTheHtmlOutput += '<div class="books-in-series col-11">';
            buildTheHtmlOutput += '<div class="book-entry col-3">';
            buildTheHtmlOutput += '<div class="image-background">';
            buildTheHtmlOutput += '<img src="' + value.bookThumbnail + '" />';
            buildTheHtmlOutput += '</div>';
            buildTheHtmlOutput += '<p class="book-title">' + value.bookTitle + '</p>';
            buildTheHtmlOutput += '<p class="author">' + value.bookAuthor + '</p>';
            //            buildTheHtmlOutput += '</div>';
            //            buildTheHtmlOutput += '</div>';
            //            buildTheHtmlOutput += '</div>';
            buildTheHtmlOutput += '</div>';
            oldSeries = currentSeries;
        }

    });
    $('.books-by-series').html(buildTheHtmlOutput);
}

function populateSeriesDropdown() {
    $.ajax({
            type: "GET",
            url: "/get-series/",
            dataType: 'json',
            contentType: 'application/json'
        })
        // if API call is successful
        .done(function (result) {
            // display search results
            console.log(result);
            displayDropdown(result);
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

function displayDropdown(series) {
    var buildTheHtmlOutput = '<option value="" disabled selected>Select a Series</option>';
    $.each(series, function (index, value) {
        buildTheHtmlOutput += '<option value="' + value.bookSeries + '">' + value.bookSeries + '</option>';
    });
    //use the HTML output to show it in the index.html
    $(".add-to-series-name").html(buildTheHtmlOutput);
}


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
                $('.my-profile').show();
                populateFavoritesContainer(username);
                populateSeriesContainer(username);
                //            sortBooksBySeries();

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
                searchInput = "";
                $("#search-input").val("");
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

//$("#author-search").on("submit", function (event) {
//    // take input from user
//    event.preventDefault();
//    var searchInput = $("#search-input").val();
//    console.log(searchInput);
//    // check username for spaces, empty, undefined
//    if (searchInput.length < 1) {
//        alert('Please enter a search term');
//    }
//    // if search is valid
//    else {
//        $.ajax({
//                type: "GET",
//                url: "/search/" + searchInput,
//                dataType: 'json',
//                contentType: 'application/json'
//            })
//            // if API call is successful
//            .done(function (result) {
//                // display search results
//                console.log(result);
//                displayBooks(result);
//                $('.dashboard').hide();
//                $('.search-results').show();
//            })
//            // if API call unsuccessful
//            .fail(function (jqXHR, error, errorThrown) {
//                // return errors
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//                alert('Something went wrong');
//            });
//    }
//});


// remove book entry from new releases
$('.remove').on("click", function (event) {
    $('.book-entry').eventCurrentTarget.hide();
});

$(document).on('submit', '.add-to-favorites', function (event) {
    event.preventDefault();
    var bookTitle = $(this).parent().find('.add-to-favorites-book-title').val();
    var bookSubtitle = $(this).parent().find('.add-to-favorites-book-subtitle').val();
    var bookAuthor = $(this).parent().find('.add-to-favorites-book-author').val();
    var bookThumbnail = $(this).parent().find('.add-to-favorites-book-thumbnail').val();
    var bookUser = $(this).parent().find('.add-to-favorites-book-user').val();
    var bookPublished = $(this).parent().find('.add-to-favorites-publish-date').val();

    var bookObject = {
        'bookTitle': bookTitle,
        'bookSubtitle': bookSubtitle,
        'bookAuthor': bookAuthor,
        'bookThumbnail': bookThumbnail,
        'bookUser': bookUser,
        'bookPublished': bookPublished,
        'bookSeries': ""
    };
    console.log(bookObject);

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



// populate the series dropdown
$("#create-series").on("submit", function (event) {
    event.preventDefault();
    var bookSeries = $("#series-input").val();
    // check for valid input
    //    if (bookSeries.length < 1) {
    //        alert('Please enter a series name');
    //    }
    // if series is valid
    //    else {
    $.ajax({
            type: "POST",
            url: "/series/create/" + bookSeries,
            dataType: 'json',
            contentType: 'application/json'
        })
        // if API call is successful
        .done(function (result) {
            // display series in dropdown
            console.log(result);
            populateSeriesDropdown();
        })
        // if API call unsuccessful
        .fail(function (jqXHR, error, errorThrown) {
            // return errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Something went wrong');
        });
    //    }
});



// classify books by series
$(document).on('submit', '.series-finder', function (event) {
    event.preventDefault();
    //        var bookTitle = $(this).parent().find('.add-to-favorites-book-title').val();
    //        var bookAuthor = $(this).parent().find('.add-to-favorites-book-author').val();
    //        var bookThumbnail = $(this).parent().find('.add-to-favorites-book-thumbnail').val();
    //        var bookUser = $(this).parent().find('.add-to-favorites-book-user').val();
    var bookSeries = $(this).parent().find('.add-to-series-name').val();
    //    var idFromButton = $('.book-entry').attr('id');
    let idParameter = $(this).parent().find('.formID').val();
    var updatedObject = {
        'bookSeries': bookSeries
    };
    console.log(updatedObject);
    $.ajax({
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(updatedObject),
            url: "/get-favorites/" + idParameter
            //            url: '/book/:id'
        })
        .done(function (result) {
            //            populateFavoritesContainer(username);
            //            populateBeenThereContainer();
            //            sweetAlert('Success!', 'Go explore!', 'success');

        });
});

// delete books
$(document).on('submit', '.delete-book', function (event) {
    event.preventDefault();
    let idParameter = $(this).parent().find('.formID').val();
    console.log(idParameter);
    //            var updatedObject = {
    //        'bookSeries': bookSeries
    //    };
    //    console.log(updatedObject);
    $.ajax({
            method: 'DELETE',
            //            dataType: 'json',
            //            contentType: 'application/json',
            //            data: JSON.stringify(updatedObject),
            url: "/get-favorites/" + idParameter
            //            url: '/book/:id'
        })

        .done(function (result) {
            //            populateFavoritesContainer(username);
            //            populateBeenThereContainer();
            //            sweetAlert('Success!', 'Go explore!', 'success');
            $(this).parent().find('.formID').hide()
        });
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
