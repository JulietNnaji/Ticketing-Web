"use strict";

$("document").ready(function () {
  // Initialize the form title and total price on page load
  var defaultTicketType = document.getElementById("ticketType").value;
  var defaultTicketPrice = defaultTicketType === "vip" ? 30000 : 10000;
  localStorage.setItem("ticketType", defaultTicketType);
  localStorage.setItem("ticketPrice", defaultTicketPrice);
  $("#formTitle").innerText = defaultTicketType.charAt(0).toUpperCase() + defaultTicketType.slice(1) + " Ticket Registration Form";
  document.getElementById("totalPrice").innerText = "N" + defaultTicketPrice; // Dynamically set the form title based on the ticket type

  function setTicketInfo(type, price) {
    localStorage.setItem("ticketType", type);
    localStorage.setItem("ticketPrice", price);
    document.getElementById("formTitle").innerText = type + " Ticket Registration Form";
    document.getElementById("totalPrice").innerText = "N" + price;
    window.location.href = "registeration.html";
  } // Update the ticket price based on the selected ticket type


  window.updateTicketPrice = function () {
    var ticketType = document.getElementById("ticketType").value;
    var ticketPrice = ticketType === "vip" ? 30000 : 10000; // Save ticket type and price to local storage

    localStorage.setItem("ticketType", ticketType);
    localStorage.setItem("ticketPrice", ticketPrice); // Update form title and total price

    document.getElementById("formTitle").innerText = ticketType.charAt(0).toUpperCase() + ticketType.slice(1) + " Ticket Registration Form";
    document.getElementById("totalPrice").innerText = "N" + ticketPrice; // Update the total price if tickets are already selected

    updateTotalPrice();
  }; // Update the total price when the number of tickets changes


  window.updateTotalPrice = function () {
    var numberOfTickets = document.getElementById("tickets").value;
    var ticketPrice = localStorage.getItem("ticketPrice");
    var totalPrice = numberOfTickets * ticketPrice;
    document.getElementById("totalPrice").innerText = "N" + totalPrice.toFixed(2);
  };
});

function submitForm() {}

document.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector(".container");
  container.addEventListener("scroll", function () {
    var arrow = document.querySelector(".arrow-down");

    if (container.scrollTop > 0) {
      arrow.style.display = "none";
    } else {
      arrow.style.display = "block";
    }
  });
});