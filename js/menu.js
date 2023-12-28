"use strict";

let osszesEtel = [];

let foetelek = [];
let levesek = [];
let desszertek = [];

let hetfo = [];
let kedd = [];
let szerda = [];
let csutortok = [];
let pentek = [];
let szombat = [];
let vasarnap = [];


function Sort(item)
{
        switch (item.tipus)
        {
            case "Főétel":
                foetelek.push(item);
                break;
            case "Leves":
                levesek.push(item);
                break;
            case "Desszert":
                desszertek.push(item);
                break;
        }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function RandomValaszto(honnan,nap)
{
    let elso = getRandomInt(honnan.length);
    nap.push(honnan[elso]);
    let masodik = getRandomInt(honnan.length);
    while (masodik==elso)
    {
        masodik = getRandomInt(honnan.length);
    }
    nap.push(honnan[masodik]);
}

function NapFeltoltes(nap)
{
    RandomValaszto(foetelek,nap);
    RandomValaszto(levesek,nap);
    RandomValaszto(desszertek,nap);
}

function NapokFeltoltese()
{
    NapFeltoltes(hetfo);
    NapFeltoltes(kedd);
    NapFeltoltes(szerda);
    NapFeltoltes(csutortok);
    NapFeltoltes(pentek);
    NapFeltoltes(szombat);
    NapFeltoltes(vasarnap);
}

fetch("http://localhost:8888/etelek").then(response => response.json()).then(data => data.forEach(elem => {
    osszesEtel.push(elem);
    Sort(elem);
})).then(NapokFeltoltese)
.then(() => NapKiiratas(1));

let hetfoLi = document.querySelector("#hetfo");
let keddLi = document.querySelector("#kedd");
let szerdaLi = document.querySelector("#szerda");
let csutortokLi = document.querySelector("#csutortok");
let pentekLi = document.querySelector("#pentek");
let szombatLi = document.querySelector("#szombat");
let vasarnapLi = document.querySelector("#vasarnap");



function NapKiiratas(id)
{
    ActiveRemover();
    switch(id)
    {
        case 1:
            drawCard(hetfo);
            hetfoLi.classList.add("active");
            break;
        case 2:
            drawCard(kedd);
            keddLi.classList.add("active");
            break;
        case 3:
            drawCard(szerda);
            szerdaLi.classList.add("active");
            break;
        case 4:
            drawCard(csutortok);
            csutortokLi.classList.add("active");
            break;
        case 5:
            drawCard(pentek);
            pentekLi.classList.add("active");
            break;
        case 6:
            drawCard(szombat);
            szombatLi.classList.add("active");
            break;
        case 7:
            drawCard(vasarnap);
            vasarnapLi.classList.add("active");
            break;
    }
}


function ActiveRemover()
{
    if (hetfoLi.classList.contains("active"))
    {
        hetfoLi.classList.remove("active");
    }
    if (keddLi.classList.contains("active"))
    {
        keddLi.classList.remove("active");
    }
    if (szerdaLi.classList.contains("active"))
    {
        szerdaLi.classList.remove("active");
    }
    if (csutortokLi.classList.contains("active"))
    {
        csutortokLi.classList.remove("active");
    }
    if (pentekLi.classList.contains("active"))
    {
        pentekLi.classList.remove("active");
    }
    if (szombatLi.classList.contains("active"))
    {
        szombatLi.classList.remove("active");
    }
    if (vasarnapLi.classList.contains("active"))
    {
        vasarnapLi.classList.remove("active");
    }
}


hetfoLi.addEventListener("click",function(){
    NapKiiratas(1);
});
keddLi.addEventListener("click",function(){
    NapKiiratas(2);
});
szerdaLi.addEventListener("click",function(){
    NapKiiratas(3);
});
csutortokLi.addEventListener("click",function(){
    NapKiiratas(4);
});
pentekLi.addEventListener("click",function(){
    NapKiiratas(5);
});
szombatLi.addEventListener("click",function(){
    NapKiiratas(6);
});
vasarnapLi.addEventListener("click",function(){
    NapKiiratas(7);
});

function drawCard(kiiratandoTomb) {

    const etelLista = document.querySelector("#etelek");
    while (etelLista.firstChild)
    {
        etelLista.firstChild.remove();
    }
    for(const item of kiiratandoTomb){

        
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