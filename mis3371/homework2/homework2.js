/* 
Program name: homework2.js
Author: Vince Ravago
Date Created: 2/24/2025
Date Updated: 2/27/2025
Version: 1.0
Purpose: Javascript for the patientform.html
*/

const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("current-date").innerHTML = text;

let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value;

slider.oninput = function () 
{
    output.innerHTML = this.value;
};

function reviewInput() 
{
    var formcontent = document.getElementById("psignup");
    var formoutput = "<table class='output'><caption>Review Your Information</caption>";
    for (let i = 0; i < formcontent.length; i++) 
    {
        let fieldType = formcontent.elements[i].type;
        if (fieldType === "submit" || fieldType === "reset" || fieldType === "button") 
        {
            continue;
        }
        if (formcontent.elements[i].value !== "") 
        {
            switch (formcontent.elements[i].type) 
            {
                case "checkbox":
                    if (formcontent.elements[i].checked) 
                    {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>&#x2713;</td></tr>`;
                    }
                    break;
                case "radio":
                    if (formcontent.elements[i].checked) 
                    {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
                    }
                    break;
                default:
                    formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
            }
        }
    }
    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}

function removeReview() 
{
    document.getElementById("showInput").innerHTML = "";
}

function validateFname() 
{
    let fnameInput = document.getElementById("fname");
    let errorSpan = document.getElementById("fname-error");

    let pattern = /^[a-zA-Z' -]{1,30}$/;
    if (!pattern.test(fnameInput.value.trim())) {
        errorSpan.textContent = "Letters, apostrophes and dashes only";
    } else {
        errorSpan.textContent = "";
    }
}

function validateLname() 
{
    let lnameInput = document.getElementById("lname");
    let errorSpan = document.getElementById("lname-error");

    let pattern = /^[a-zA-Z' -]*[2-5]?[a-zA-Z' -]*$/;
    let trimmedValue = lnameInput.value.trim();
    
    if (!pattern.test(trimmedValue) || trimmedValue.length < 1 || trimmedValue.length > 30) {
        errorSpan.textContent = "Letters, apostrophes, numbers 2 to 5, and dashes only";
    } else {
        errorSpan.textContent = "";
    }
}

function validateDob() 
{
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
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

function validateSsn() 
{
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

function validateEmail() 
{
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
function formatPhone(input) 
{
    let cleaned = input.value.replace(/\D/g, ''); 
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        input.value = `${match[1]}-${match[2]}-${match[3]}`; 
    } else {
        input.value = cleaned; 
    }
}

function validatePhone()
{
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");

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
