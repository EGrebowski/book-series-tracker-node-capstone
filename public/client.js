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

$('#nav-search').on("click", function (event) {
    $('.header').hide();
    $('.dashboard').show();
});

$('#dashboard-search').on("submit", function (event) {
    event.preventDefault();
    $('.dashboard').hide();
    $('.search-results').show();
    console.log("test");
});

$('.book-entry').on("")

$(document).ready(function (event) {
    //        $(".dashboard").hide();
    //        $(".search-results").hide();
    //        $(".my-profile").hide();
    //        $(".new-releases-full").hide();
});
