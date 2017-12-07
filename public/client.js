"use strict";

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
    console.log("test login button");
    event.preventDefault();
    $('.header').hide();
    $('.dashboard').show();
});

// From signup
$("#signup-btn").on("click", function (event) {
    event.preventDefault();
    $('.header').hide();
    $('.search-results').show();
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

// search from dashboard
$("#dashboard-search").on("click", function (event) {
    console.log("test search button");
    event.preventDefault();
    $('.dashboard').hide();
    $('.search-results').show();

});

// remove book entry from new releases
$('.remove').on("click", function (event) {
    $('.book-entry').eventCurrentTarget.hide();
});

// show/hide books in series
$('.series-author, .series-name').on("click", this, function (event) {
    console.log("test");
    //    $(this).nextAll('.books-in-series').toggleClass("hidden");
    $(this).nextAll('.series-wrapper').toggleClass("hidden");
});


$(document).ready(function (event) {
    $(".dashboard").hide();
    $(".search-results").hide();
    $(".my-profile").hide();
    $(".new-releases-full").hide();
    $(".login-box").hide();
    //    $('.books-in-series').hide();
});


// should I hide new releases that are removed or added, or should I prevent from populating with API call?
