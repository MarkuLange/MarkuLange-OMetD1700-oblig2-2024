"use strict"

import {HOST} from "./config.js";

/* DOM-ELEMENTS */
const buyBtn = document.getElementById("buy")
const resetBtn = document.getElementById("reset")
const billetter = document.querySelector(".billetter")
const filmValg = document.getElementById("film")
const antall = document.getElementById("antall")
const fornavn = document.getElementById("fornavn")
const etternavn = document.getElementById("etternavn")
const telefonnr = document.getElementById("telefonnr")
const epost = document.getElementById("epost")

/* REGEX INFO, AND INITIALIZERS */
const info = [
    {el: filmValg, regex: /^[\w-]+$/},
    {el: antall, regex: /^[0-9]{1,2}$/},
    {el: fornavn, regex: /^[a-zA-ZøæåØÆÅ]+$/},
    {el: etternavn, regex: /^[a-zA-ZæøåÆØÅ]+$/},
    {el: telefonnr, regex: /^[0-9]{8}$/},
    {el: epost, regex: /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/}
]
let valid = true;

/* MAIN CODE */
const checkValid = function (input){
    const str = input.el.value;
    return !(!str || str === "placeholder" || !input.regex.test(str));
}

const buyTickets = async function () {
    valid = true;
    document.querySelectorAll(".error").forEach(e => e.remove());

    for(let i of info){
        if (!checkValid(i)){
            valid = false;
            displayError(i.el)
        }
    }
    if(valid) {
        const ticket = {
            fName: fornavn.value,
            lName: etternavn.value,
            eMail: epost.value,
            tlfNr: telefonnr.value,
            movie: filmValg.value.charAt(0).toUpperCase() + filmValg.value.slice(1),
            amount: antall.value
        }

        // REGISTER TICKET TO SERVER
       await fetch(`${HOST}/registerTicket`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(ticket)
        }).then(r => r.text()).then(data => console.log("response from server:", data))

        // GET TICKET ARRAY FROM SERVER
        const ticketArr= await fetch(`${HOST}/showTicket`).then(r => r.json());

        // SHOW TICKETS AND RESET INPUT BOXES
        showTicket(ticketArr);
        document.getElementById("order").reset();
    }
}


const showTicket = function (ticketArr) {
    billetter.innerHTML="";
    ticketArr.forEach(ticket => billetter.insertAdjacentHTML("afterbegin", `<li>${ticket.movie}: [${ticket.amount}] -
${ticket.fName} ${ticket.lName} | ${ticket.tlfNr} | ${ticket.eMail} </li>`))
}

const displayError = function (el){
    if(el.id === "film" || el.id === "antall") {
        el.insertAdjacentHTML("afterend", `<span class="error"> Vennligst velg ${el.name}</span>`);
    } else {
        el.insertAdjacentHTML("afterend", `<span class="error"> Vennligst skriv inn gyldig ${el.name}</span>`);
    }
}

/* EVENT LISTENERS */
buyBtn.addEventListener("click", function (e){
    e.preventDefault();
    buyTickets();
})
resetBtn.addEventListener("click", async function (){
    // REFACTOR TO EMPTY SERVER ARRAY
    await fetch(`${HOST}/clearTickets`,{
        method:"DELETE",
        headers: {
            "Content-type" : "application/json"
        }
    }).then(r => r.text()).then(d => console.log("Response: "+d));

    document.getElementById("order").reset();
    billetter.innerHTML="";
})

