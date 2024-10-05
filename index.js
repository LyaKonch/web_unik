// Отримуємо всі елементи з класом "open-modal-btn"
let buttons = document.getElementsByClassName("open-modal-btn");

// Проходимося по кожному елементу та додаємо обробник подій
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        // Додаємо клас "open" до елемента з класом "my-modal"
        document.getElementById("my-modal").classList.add("open");

        // Отримуємо елемент iframe
        var iframe = document.querySelector('#my-modal iframe');

        // Встановлюємо src для iframe в залежності від класу кнопки
        if (this.classList.contains('signin')) {
            iframe.src = '/signinform.html';
        } else if (this.classList.contains('login')) {
            iframe.src = '/loginform.html';
        }
    });
}

// закрити вікно модальне
document.getElementById("close-my-modal-btn").addEventListener("click", function() {
    document.getElementById("my-modal").classList.remove("open")
})

// закрити на esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
});

// закрити поза областю
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});

const header = document.querySelector("header");
let lastScroll = window.scrollY;
let headerHeight = 80; // Висота заголовка

window.addEventListener("scroll", () => {
    if(document.querySelector('.burger').classList.contains('active')){
        console.log("cacnm")
    } else {
        const currentScrollPosition = window.scrollY;
        if (lastScroll < currentScrollPosition) {
            // Scrolling down
            header.style.transform = `translateY(-${Math.min(currentScrollPosition, 80)}px)`;
        } else {
            // Scrolling up
            header.style.transform = `translateY(0)`;
        }

        lastScroll = currentScrollPosition;
    }
});

if(window.innerWidth<768){
    const navElement = document.querySelector('header nav');

    // Get the nav_container element
    const navContainer = document.querySelector('.nav-container');
    // Move the nav element to the nav_container
    navContainer.appendChild(navElement);
}

document.querySelector('.burger').addEventListener("click", function() {
    this.classList.toggle('active');
    const navElement = document.querySelector(' nav');
    navElement.classList.toggle('open');
});

$(document).ready(function() {
    $('#login-form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "Please enter your username",
                minlength: "Username must be at least 3 characters long"
            },
            password: {
                required: "Please provide your password",
                minlength: "Password must be at least 6 characters long"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});

$(document).ready(function() {
    $.validator.addMethod("securePassword", function(value, element) {
        return this.optional(element) || (
            value.length >= 8 && // Мінімальна довжина 8 символів
            /[0-9]/.test(value) && // Наявність цифр
            /[!@#$%^&*(),.?":{}|<>]/.test(value) // Наявність спеціальних символів
        );
    }, "Пароль має містити принаймні 8 символів, одну цифру та один спеціальний символ.");
    
    $('#registration-form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,
                securePassword: true
            },
            confirm_password: {
                required: true,
                equalTo: "#register-password"
            },
            country: {
                required: true
            },
            birthdate: {
                required: true,
                date: true // Validate for a date format
            }
        },
        messages: {
            username: {
                required: "Please enter a username",
                minlength: "Username must be at least 3 characters long"
            },
            email: "Please enter a valid email address",
            password: {
                required: "Please provide a password",
                minlength: "Password must be at least 6 characters long"
            },
            confirm_password: {
                required: "Please confirm your password",
                equalTo: "Passwords do not match"
            },
            country: {
                required: "Please select a country"
            },
            birthdate: {
                required: "Please enter your birthdate",
                date: "Please enter a valid date"
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element); // Insert error message after the element
            error.hide(); // Hide the error message initially
            element.removeClass('valid').addClass('invalid'); // Add invalid class

            element.on('focus', function() {
                error.fadeOut(); // Fade out the error message on focus
            });
        },
        success: function(label, element) {
            $(element).removeClass('invalid').addClass('valid'); // Add valid class
            label.fadeIn(); // Fade in the success message
        },
        submitHandler: function(form) {
            // You can add form submission logic here if needed
            $(form).fadeOut("slow", function() {
                alert("Form submitted successfully!"); // For demonstration
                form.reset(); // Reset the form
                $(form).fadeIn(); // Fade in the form again
            });
        }
    });
});
  

