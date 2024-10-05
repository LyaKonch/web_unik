// Task 1: Search for digits in words
let text1 = document.getElementById("task1").textContent;
let regex1 = /\b\w*\d\w*\b/g;
let result1 = text1.replace(regex1, match => `<mark>${match}</mark>`);
document.getElementById("task1").innerHTML = result1;

// Task 2: Search for IP addresses
let text2 = document.getElementById("task2").textContent;
let regex2 = /\b\d{1,3}\.0\.\d{1,3}\.\d{1,3}\b/g;
let result2 = text2.replace(regex2, match => `<mark>${match}</mark>`);
document.getElementById("task2").innerHTML = result2;

// Task 3: Validate phone number
function validatePhone() {
    let phone = document.getElementById("phone");
    let phoneRegex = /^\+\d{2}-\d{3}-\d{3}-\d{2}-\d{2}$/;
    if (phoneRegex.test(phone.value)) {
        phone.classList.add("valid");
        phone.classList.remove("invalid");
    } else {
        phone.classList.add("invalid");
        phone.classList.remove("valid");
    }
}

// Task 4: Validate Facebook profile URL
function validateFacebook() {
    let facebookUrl = document.getElementById("facebookUrl");
    let facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]{5,}$/;
    if (facebookRegex.test(facebookUrl.value)) {
        facebookUrl.classList.add("valid");
        facebookUrl.classList.remove("invalid");
    } else {
        facebookUrl.classList.add("invalid");
        facebookUrl.classList.remove("valid");
    }
}