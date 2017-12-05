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

// search from dashboard
$('#dashboard-search').on("submit", function (event) {
    event.preventDefault();
    $('.dashboard').hide();
    $('.search-results').show();
});

// remove book entry from new releases
$('.remove').on("click", function (event) {
    $('.book-entry').eventCurrentTarget.hide();
});

// show/hide books in series
$('.series').on("click", function (event) {
    $('.')
})

$(document).ready(function (event) {
    //        $(".dashboard").hide();
    //        $(".search-results").hide();
    //        $(".my-profile").hide();
    //        $(".new-releases-full").hide();
});


// should I hide new releases that are removed or added, or should I prevent from populating with API call?
