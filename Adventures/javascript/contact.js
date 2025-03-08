document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (email && message) {
        alert("This form has been sent");
        document.getElementById("contactForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
});