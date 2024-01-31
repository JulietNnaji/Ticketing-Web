const dev = "http://localhost:5000";
const render = "https://chronicles-of-ushebebe.onrender.com";
const baseUrl = render;

async function initTickets(
    emails,
    ticketName,
    pricePayed,
    ticketCount,
    ownerName,
    ownerPhone,
    ownerEmail
) {
    var ref = `${generateRef()}_ub24_${generateRef()}`;
    const data = {
        emails,
        ticketName,
        pricePayed,
        ticketCount,
        ownerName,
        ownerPhone,
        ownerEmail,
        paystackRef: ref,
    };
    // console.log(data);
    axios({
        method: "post",
        url: `${baseUrl}/api/v1/ticket/`,
        data: data,
    })
        .then(function (data) {
            const msg = data.data.msg;
            console.log(msg);

            console.log("Going to paystack");
            payWithPaystack(ref, pricePayed, ownerEmail);
        })
        .catch(function (err) {
            console.log("Got stuck herer");
            if (err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                alert(err);
            }
            stopLoading();
        });
}

async function payWithPaystack(ref, totalPrice, ownerEmail) {
    console.log(ref);
    console.log(totalPrice);

    var handler = PaystackPop.setup({
        key: "pk_live_4f91cde71d4cbc45664eba903cf3486117a7aed6",
        email: ownerEmail,
        amount: totalPrice * 100,
        currency: "NGN",
        ref,
        callback: function (response) {
            //this happens after the payment is completed successfully
            var reference = response.reference;
            updateTickets(reference);
        },
        onClose: function () {
            stopLoading();
            alert("Transaction was not completed, window closed.");
        },
    });
    handler.openIframe();
}

async function updateTickets(paystackRef) {
    axios({
        method: "patch",
        url: `${baseUrl}/api/v1/ticket/${paystackRef}`,
    })
        .then(function (data) {
            const msg = data.data.msg;
            console.log(msg);
            stopLoading();
            window.location.href = "successful_page.html";
        })
        .catch(function (err) {
            if (err.response.data.msg) {
                alert(err.response.data.msg);
            } else {
                alert(err);
            }
            stopLoading();
        });
}

function generateRef() {
    let characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let length = 10; // Customize the length here.
    for (let i = length; i > 0; --i)
        result += characters[Math.round(Math.random() * (characters.length - 1))];
    return result;
}

function storeTicketInfo(ticketType, ticketPrice) {
    localStorage.setItem("ticketType", ticketType);
    localStorage.setItem("ticketPrice", ticketPrice);
    window.location.href = "registeration.html";
}

function stopLoading() {
    $('#submit-form-button').removeClass('button--loading').attr('disabled', true);
}
