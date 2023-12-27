"use strict";

let osszesEtel = [];

fetch("http://localhost:8888/etelek").then(response => response.json()).then(data => osszesEtel = data).then(data => drawCard(data));

let hetfo = [];
let kedd = [];
let szerda = [];
let csutortok = [];
let pentek = [];
let szombat = [];
let vasarnap = [];


function drawCard(data) {

    for(const item of osszesEtel){

        const etelLista = document.querySelector("#etelek");
        
        const div = document.createElement('div');
        div.className = 'col-md-6 my-2';
    
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card text-bg-light m-3 etel';
    
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row g-0';
    
        const colDiv1 = document.createElement('div');
        colDiv1.className = 'col-lg-5';
    
        const colDiv2 = document.createElement('div');
        colDiv2.className = 'col-lg-7';
    
        const img = document.createElement('img');
        img.src = item.kep;
        img.className = 'img-fluid';
        img.id = 'kep';
        img.alt = item.etelneve;
    
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
    
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = item.etelneve;
    
        const text1 = document.createElement('p');
        text1.className = 'card-text';
        text1.textContent = item.leiras;
    
        const text2 = document.createElement('p');
        text2.className = 'card-text';
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `${item.ar} Ft`;
        text2.appendChild(priceSpan);
    
        colDiv1.appendChild(img);
        colDiv2.appendChild(cardBodyDiv);
        cardBodyDiv.appendChild(title);
        cardBodyDiv.appendChild(text1);
        cardBodyDiv.appendChild(text2);
    
        rowDiv.appendChild(colDiv1);
        rowDiv.appendChild(colDiv2);
    
        cardDiv.appendChild(rowDiv);
    
        div.appendChild(cardDiv);
    
        etelLista.append(div);
    }
}