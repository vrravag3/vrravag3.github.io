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

function validateFname() 
{
    let fnameInput = document.getElementById("fname");
    let errorSpan = document.getElementById("fname-error");

    let pattern = /^[a-zA-Z' -]{1,30}$/; // Allows letters, apostrophes, dashes, and spaces
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

    let pattern = /^[a-zA-Z' -]*[2-5]{0,1}[a-zA-Z' -]*$/;
    if (!pattern.test(lnameInput.value.trim()) || lnameInput.value.length < 1 || lnameInput.value.length > 30) {
        errorSpan.textContent = Letters, apostrophes, dashes, and numbers 2-5 (e.g., '3rd')";
    } else {
        errorSpan.textContent = "";
    }
}
