document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
    // Clear old errors
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(el => el.remove());

    let isValid = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    //Simple email pattern
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    //Validate name
    if (name === "") {
        showError("name", "Please enter your name.");
        isValid = false;
    }

    //Validate email
    if (email === "") {
        showError("email", "Please enter your email.");
        isValid = false;
    } else if (!email.match(emailPattern)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }

    //Validate message
    if (message === "") {
        showError("message", "Please enter your message");
        isValid = false;
    }

    // If valid, send data to backend API
    if (isValid) {
        e.preventDefault();
        fetch('http://<your-server-ip>:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Message sent!');
                form.reset();
            } else {
                alert('There was an error sending your message.');
            }
        })
        .catch(() => {
            alert('Network error. Please try again later.');
        });
    } else {
        e.preventDefault();
    }
});

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement("span");
    error.classList.add("error-message");
    error.style.color = "red";
    error.style.fontSize = "0.875rem";
    error.textContent = message;
    field.parentElement.insertBefore(error, field.nextSibling);
}
});

fetch('http://<your-server-ip>:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  })
})
.then(res => res.json())
.then(data => {
  if (data.status === 'success') {
    alert('Message sent!');
  }
});