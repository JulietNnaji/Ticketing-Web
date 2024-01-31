$("document").ready(function () {
  var ticketType = localStorage.getItem('ticketType');
  var ticketPrice = localStorage.getItem('ticketPrice');
  var ticketCount = 1;
  var totalPrice = 0;

  $('#ticketType').val(ticketType.toLowerCase()).change();

  $('#ticketType').on('change', function () {
    if (this.value == 'regular') {
      ticketPrice = 10000
    } else if (this.value == 'vip') {
      ticketPrice = 40000
    } else {
      ticketPrice = 0
    }
    updateTotalPrice();
  });

  $('#tickets').on('change', function () {
    ticketCount = this.value;
    updateTotalPrice();
  });


  function updateTotalPrice() {
    totalPrice = ticketPrice * ticketCount;
    $('#totalPrice').text(totalPrice);
  }

  $('#submit-form-button').click(function (e) {
    e.preventDefault();

    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    var name = $('#name').val();
    var phone = $('#phone').val();
    var email = $('#email').val();

    if (name == '') {
      alert('Fill name')
    } else if (phone == '') {
      alert('Fill phone')
    } else if (email == '') {
      alert('Fill email')
    } else if (!emailRegexp.test(email)) {
      alert('Invalid email');
    } else {
      var emails = [];
      for (let i = 0; i < ticketCount; i++) {
        emails.push(email);
      }
      $('#submit-form-button').attr('disabled', true).addClass('button--loading');
      initTickets(
        emails,
        ticketType,
        totalPrice,
        ticketCount,
        name,
        phone,
        email,
      );
    }

  });

  updateTotalPrice();
});
