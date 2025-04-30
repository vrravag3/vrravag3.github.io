/* 
Program name: homeworkExtraCred.js
Author: Vince Ravago
Date Created: 2/24/2025
Date Updated: 5/4/2025
Version: 5.0
Purpose: Javascript for the patientform.html
*/
const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("current-date").innerHTML = text;


let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};


function reviewInput() {
    var formcontent = document.getElementById("psignup");
    var formoutput = "<table class='output'><caption>Review Your Information</caption>";

    for (let i = 0; i < formcontent.length; i++) {
        let field = formcontent.elements[i];
        let type = field.type;
        let name = field.name.toLowerCase();

        if (["submit", "reset", "button"].includes(type)) continue;
        if (["password", "textarea"].includes(type)) continue;
        if (name.includes("password") || name.includes("ssn") || name.includes("social")) continue;
        if (type !== "checkbox" && type !== "radio" && field.value.trim() === "") continue;

        if (type === "checkbox" && field.checked) {
            formoutput += `<tr><td>${field.name}</td><td>&#x2713;</td></tr>`;
        } else if (type === "radio" && field.checked) {
            formoutput += `<tr><td>${field.name}</td><td>${field.value}</td></tr>`;
        } else if (type !== "checkbox" && type !== "radio") {
            formoutput += `<tr><td>${field.name}</td><td>${field.value}</td></tr>`;
        }
    }

    formoutput += "</table>";
    document.getElementById("modalFormOutput").innerHTML = formoutput;

    // Show the modal
    document.getElementById("reviewModal").style.display = "block";

    // Enable the submit button after reviewing input
    var submitButton = document.getElementById("submit");
    submitButton.disabled = false;  // Enable submit button after review
    console.log("Submit button enabled:", !submitButton.disabled);

    // Set up Go Back button to hide the modal
    document.getElementById("goBackBtn").onclick = function () {
        closeReview();
    };

    // Handle form submission inside the modal
    submitButton.onclick = function () {
        formcontent.submit();  // Submit the form when button is clicked
    };
}

function closeReview() {
    document.getElementById("showInput").innerHTML = "";
    document.getElementById("reviewModal").style.display = "none";
}

function fnameCheck() {
    let fnameInput = document.getElementById("fname");
    let errorSpan = document.getElementById("fname-error");

    let pattern = /^[a-zA-Z' -]{1,30}$/;
    if (!pattern.test(fnameInput.value.trim())) {
        errorSpan.textContent = "Letters, apostrophes and dashes only";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

function mnameCheck() {
    let mini = document.getElementById("mname").value;
    const namePattern = /^[A-Z]+$/;

    if (mini === "") {
        document.getElementById("mname-error").innerHTML = "";
        return true;
    }

    mini = mini.toUpperCase();
    document.getElementById("mname").value = mini;

    if (!mini.match(namePattern)) {
        document.getElementById("mname-error").innerHTML = 
        "Middle initial must be a single uppercase letter";
        return false;
    } else {
        document.getElementById("mname-error").innerHTML = "";
        return true;
    }
}

function lnameCheck() {
    let lnameInput = document.getElementById("lname");
    let errorSpan = document.getElementById("lname-error");

    let pattern = /^[a-zA-Z' -]*[2-5]?[a-zA-Z' -]*$/;
    let trimmedValue = lnameInput.value.trim();
    
    if (!pattern.test(trimmedValue) || trimmedValue.length < 1 || trimmedValue.length > 30) {
        errorSpan.textContent = "Letters, apostrophes, numbers 2 to 5, and dashes only";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

function dobCheck() {
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);
    let today = new Date();

    if (date > today) {
        document.getElementById("dob-error").innerHTML = "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}

function snnCheck() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if (!ssnR.test(ssn)) 
    {
        document.getElementById("ssn-error").innerHTML = "Please enter a valid SSN";
        return false;
    } else 
    {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}

function cityCheck() {
    city = document.getElementById("city").value.trim();

    if (!city) {
        document.getElementById("city-error").innerHTML = "City can't be blank";
        return false;
    } else {
        document.getElementById("city-error").innerHTML = "";
        return true;
    }
}

function zipCheck() {
    const zipInput = document.getElementById("zip");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("zip-error").innerHTML = 
        "Zip code can't be blank";
        return false;
    }

    zipInput.value = zip;
    document.getElementById("zip-error").innerHTML = "";
    return true;
}

function emailCheck() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    const emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "") 
    {
        document.getElementById("email-error").innerHTML = "Email is missing";
        return false;
    } 
    else if (!emailR.test(email)) 
    {
        document.getElementById("email-error").innerHTML = "Email is not valid";
        return false;
    } 
    else 
    {
        document.getElementById("email-error").innerHTML = "";
        return true;
    }
}

//Phone format code from https://learnersbucket.com/examples/javascript/how-to-format-phone-number-in-javascript/
function formatPhone(input) {
    let cleaned = input.value.replace(/\D/g, ''); 
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        input.value = `${match[1]}-${match[2]}-${match[3]}`; 
    } else {
        input.value = cleaned; 
    }
}

function phoneCheck(){
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    const phone = phoneInput.value.trim()
    
    if (phone === "") 
    {
        document.getElementById("phone-error").innerHTML = "Phone Number Missing";
        return false;
    } 
    else 
    {
        document.getElementById("phone-error").innerHTML = "";
        return true;
    }
}

function uidCheck() {
    
    uid = document.getElementById("uid").value.toLowerCase();
    document.getElementById("uid").value = uid;

    if (uid.length == 0) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't be blank";
        return false;
    }

    if (!isNaN(uid.charAt(0))) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't start with a number";
        return false;
    }

    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        document.getElementById("uid-error").innerHTML = 
        "No spaces or Special Characters (Dashes and Underlines allowed)";
        return false;
    } else if (uid.length < 5) {
        document.getElementById("uid-error").innerHTML = 
        "User ID must be at least 5 characters";
        return false;
    } else if (uid.length > 30) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't exceed 30 characters";
        return false;
    } else {
        document.getElementById("uid-error").innerHTML = "";
        return true;
    }
}

function pwordCheck() {
    let pword = document.getElementById("password").value;
    let errorMessage = [];
    let errorElement = document.getElementById("pword-error");
    let uid = "TestUser"; // Replace with actual user ID

    if (!pword.match(/[a-z]/)) errorMessage.push("At least one lowercase letter");
    if (!pword.match(/[A-Z]/)) errorMessage.push("At least one uppercase letter");
    if (!pword.match(/[0-9]/)) errorMessage.push("At least one number");
    if (!pword.match(/[!\@#\$%&*\-_\\.+\(\)]/)) errorMessage.push("At least one special character");
    if (pword.includes(uid)) errorMessage.push("Cannot contain user ID");
    if (pword.length < 8) errorMessage.push("Must be at least 8 characters long");

    if (errorMessage.length > 0) {
        errorElement.innerHTML = errorMessage.join("<br>"); // Display errors
        return false;
    } else {
        errorElement.innerHTML = "";
        return true;
    }
}

function confirmPword() {
    pword1 = document.getElementById("password").value;
    pword2 = document.getElementById("confirmpassword").value;

    if (pword1 !== pword2) {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords don't match";
        return false;
    } else {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords match";
        return true;
    }
}

function finalCheck() {
    let valid = true;

    if (!fnameCheck()) {
        valid = false;
    }
    if (!mnameCheck()) {
        valid = false;
    }
    if (!lnameCheck()) {
        valid = false;
    }
    if (!dobCheck()) {
        valid = false;
    }
    if (!snnCheck()) {
        valid = false;
    }
    if (!cityCheck()) {
        valid = false;
    }
    if (!zipCheck()) {
        valid = false;
    }
    if (!emailCheck()) {
        valid = false;
    }
    if (!phoneCheck()) {
        valid = false;
    }
    if (!uidCheck()) {
        valid = false;
    }
    if (!pwordCheck()) {
        valid = false;
    }
    if (!confirmPword()) {
        valid = false;
    }
    
    if (valid) {
        document.getElementById("submit").disabled = false;
        showGoodAlert()
    } else {
        document.getElementById("submit").disabled = true;
        showAlert();
    }
}

function showAlert() {
    alert("Please correct the errors before submitting.");
}

function showGoodAlert() {
    alert("Information is Correct and Ready to be Submitted.");
}

function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie (name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        while (cookie.charAt (0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

var inputs = [
    {id:"fname", cookieName: "firstname"},
    {id:"mname", cookieName: "middleinitial"},
    {id:"lname", cookieName: "lastname"},
    {id:"dob", cookieName: "dob"},
    {id:"ssn", cookieName: "ssn"},
    {id:"addr1", cookieName: "address1"},
    {id:"city", cookieName: "city"},
    {id:"zip", cookieName: "zipcode" },
    {id:"uid", cookieName: "userId" },
]

inputs.forEach(function (input) {
    var inputElement = document.getElementById(input.id);

    var cookieValue = getCookie(input.cookieName);
    if (cookieValue !== "") {
        inputElement.value = cookieValue;
    }

    inputElement.addEventListener("input", function () {
        setCookie(input.cookieName, inputElement.value, 30);
    });
});

var firstName = getCookie("firstname");

if (firstName && firstName.trim() !== "") {
    document.getElementById("welcome1").innerHTML = "Welcome back, " + firstName + "!<br>";
    document.getElementById("welcome2").innerHTML =
        "<a href='#' id='new-user'>Not " + firstName + "? Click here to start a new form.</a>";

    document.getElementById("new-user").addEventListener("click", function () {
        inputs.forEach(function (input) {
            setCookie(input.cookieName, "", -1);
        });
        location.reload();
    });
} else {
    document.getElementById("welcome1").innerHTML = "Welcome new user!<br>";
    document.getElementById("welcome2").innerHTML = "";
}

document.getElementById("remember-me").addEventListener("change", function () {
    const rememberMe = this.checked;

    if (!rememberMe) {
        deleteAllCookies();
        console.log("All cookies deleted because 'Remember Me' is unchecked.");
    } else {
        inputs.forEach(function (input) {
            const inputElement = document.getElementById(input.id);
            if (inputElement.value.trim() !== "") {
                setCookie(input.cookieName, inputElement.value, 30);
            }
        });
        console.log("Cookies saved because 'Remember Me' is checked.");
    }
});

function deleteAllCookies() {
    document.cookie.split(";").forEach(function (cookie) {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const rememberMe = document.getElementById("remember-me").checked;

    if (!rememberMe) {
        deleteAllCookies();
    }
});

function showAlert() {
    alert("Please correct the errors before submitting.");
}

function showGoodAlert() {
    alert("Information is Correct and Ready to be Submitted.");
}

function fillFromStorage() {
    const form = document.forms["psignup"];
    if (!form) return;
  
    for (let i = 0; i < form.elements.length; i++) {
      const input = form.elements[i];
      const key = input.id || input.name;
  
      if (!key) continue;
  
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = storedValue === "true" || input.value === storedValue;
        } else {
          input.value = storedValue;
        }
      }
    }
  
    const slider = document.getElementById("range");
    const display = document.getElementById("range-slider");
    if (slider && display) {
      display.textContent = slider.value;
    }
  }

window.addEventListener("DOMContentLoaded", () => {
  const form = document.forms["psignup"];
  if (!form) return;

  for (let i = 0; i < form.elements.length; i++) {
    const input = form.elements[i];
    const key = input.id || input.name;

    if (!key) continue;

    input.addEventListener("change", () => {
      if (input.type === "checkbox" || input.type === "radio") {
        localStorage.setItem(key, input.checked ? input.value || "true" : "false");
      } else {
        localStorage.setItem(key, input.value);
      }
    });

    if (input.type === "range" && input.id === "range") {
      input.addEventListener("input", () => {
        document.getElementById("range-slider").textContent = input.value;
      });
    }
  }
});

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    clock.innerHTML = `${hours}:${minutes}:${seconds} ${period}`;
}

updateClock();

setInterval(updateClock, 1000);

function updateProgressBar() {
    const form = document.getElementById("psignup");
    const requiredFields = form.querySelectorAll("[required]");
    let filledCount = 0;

    requiredFields.forEach(field => {
        if (field.type === "radio") {
            const group = form.querySelectorAll(`input[name='${field.name}']`);
            if ([...group].some(radio => radio.checked)) filledCount++;
        } else if (field.type === "checkbox") {
            if (field.checked) filledCount++;
        } else if (field.value.trim() !== "") {
            filledCount++;
        }
    });

    const percent = Math.round((filledCount / requiredFields.length) * 100);
    const bar = document.getElementById("progress-bar");
    bar.style.width = percent + "%";
    bar.textContent = percent + "%";
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("psignup");
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        input.addEventListener("input", updateProgressBar);
        input.addEventListener("change", updateProgressBar);
    });
    updateProgressBar();
});

document.getElementById("psignup").addEventListener("reset", function () {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = "0%";
    progressBar.textContent = "0%";
});

function confirmSubmit() {
    return confirm("Are you sure you want to submit the form?");
}

function confirmReset(event) {
    event.preventDefault();
    const confirmAction = confirm("Are you sure you want to reset the form?");
    if (confirmAction) {
        document.getElementById("psignup").reset();
    }
}

window.onload = function() {
    const formElements = document.querySelectorAll('input, select, textarea');

    formElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('show');
        }, index * 50); 
    });
};
