"use strict";

let foods = [];

fetch("http://localhost:8888/etelek").then(response => response.json()).then(data => foods = data).then(showDatas);

let categories = ["Főétel","Desszert","Leves"]

function showDatas() {
    const tbody = document.querySelector("#tbody");
    while(tbody.firstChild){
        tbody.firstChild.remove();
    }
    
    let i = 0;
    for(const item of foods){

        const tableRow = document.createElement('tr');
    
    
        const dishNameCell = document.createElement('td');
        dishNameCell.textContent = item["etelneve"];
        tableRow.append(dishNameCell);
    
        const badgeCell = document.createElement('td');
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'badge bg-success';
        badgeSpan.textContent = item["tipus"];
        badgeCell.append(badgeSpan);
        tableRow.append(badgeCell);
    
    
        const priceCell = document.createElement('td');
        priceCell.textContent = item["ar"]+" Ft";
        tableRow.append(priceCell);
    
    
        const buttonsCell = document.createElement('td');
        const btnGroupDiv = document.createElement('div');
        btnGroupDiv.className = 'btn-group';
        btnGroupDiv.setAttribute('role', 'group');
        btnGroupDiv.setAttribute('aria-label', 'Basic mixed styles example');
    
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = '🗑️';
        btnGroupDiv.append(deleteButton);
    
        const editButton = document.createElement('button');
        editButton.setAttribute('type', 'button');
        editButton.className = 'btn btn-warning';
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', `#exampleModal_${i}`);
        editButton.textContent = '✏️';
        btnGroupDiv.append(editButton);
    
        const modalDiv = document.createElement('div');
        modalDiv.className = 'modal fade';
        modalDiv.setAttribute('id', `exampleModal_${i}`);
        modalDiv.setAttribute('tabindex', '-1');
        modalDiv.setAttribute('aria-labelledby', 'exampleModalLabel');
        modalDiv.setAttribute('aria-hidden', 'true');
    
        const modalDialogDiv = document.createElement('div');
        modalDialogDiv.className = 'modal-dialog';
    
        const modalContentDiv = document.createElement('div');
        modalContentDiv.className = 'modal-content';
    
        const modalHeaderDiv = document.createElement('div');
        modalHeaderDiv.className = 'modal-header';
    
        const modalTitle = document.createElement('h1');
        modalTitle.className = 'modal-title fs-5';
        modalTitle.setAttribute('id', 'exampleModalLabel');
        modalTitle.textContent = `${item.etelneve} szerkesztése`;
    
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
    
        modalHeaderDiv.append(modalTitle);
        modalHeaderDiv.append(closeButton);
    
        const modalBodyDiv = document.createElement('div');
        modalBodyDiv.className = 'modal-body';

        
        const nameLabel = document.createElement("label");
        nameLabel.classList.add("form-label","my-2");
        nameLabel.htmlFor=`name_${i}`
        nameLabel.textContent = "Étel neve:"
        const nameInput = document.createElement("input");
        nameInput.value = item.etelneve;
        nameInput.type = "text";
        nameInput.id = `name_${i}`;
        nameInput.classList.add("form-control")
        nameInput.setAttribute("disabled","")

       
        const categoryLabel = document.createElement("label");
        categoryLabel.classList.add("form-label","my-2");
        categoryLabel.htmlFor=`categories_${i}`
        categoryLabel.textContent = "Étel kategóriája:"
        const categorySelect = document.createElement("select");
        categorySelect.id = `categories_${i}`;
        categorySelect.classList.add("form-select")
        for(const category of categories){
            if(item.tipus == category){
                categorySelect.innerHTML += `<option value="${category}" selected>${category}</option>`;
            }
        }
        categorySelect.setAttribute("disabled","") 

        const priceLabel = document.createElement("label");
        priceLabel.classList.add("form-label","my-2");
        priceLabel.htmlFor=`price_${i}`;
        priceLabel.textContent = "Étel ára:"
        const priceInput = document.createElement("input");
        priceInput.value=item.ar;
        priceInput.type = "number";
        priceInput.id = `price_${i}`;
        priceInput.classList.add("form-control")

        const descLabel = document.createElement("label");
        descLabel.classList.add("form-label","my-2");
        descLabel.htmlFor=`description_${i}`;
        descLabel.textContent = "Étel leírása:"
        const descInput = document.createElement("input");
        descInput.type = "text";
        descInput.value = item.leiras;
        descInput.id = `description_${i}`;
        descInput.classList.add("form-control")

        modalBodyDiv.append(nameLabel,nameInput,categoryLabel,categorySelect,priceLabel,priceInput,descLabel,descInput)

        const formRow = document.createElement('form');
        formRow.className = 'row';
    
        const modalFooterDiv = document.createElement('div');
        modalFooterDiv.className = 'modal-footer';
    
        const closeBtnModal = document.createElement('button');
        closeBtnModal.setAttribute('type', 'button');
        closeBtnModal.className = 'btn btn-danger';
        closeBtnModal.setAttribute('data-bs-dismiss', 'modal');
        closeBtnModal.textContent = 'Bezárás';
    
        const saveChangesBtn = document.createElement('button');
        saveChangesBtn.setAttribute('type', 'button');
        saveChangesBtn.className = 'btn btn-primary';
        saveChangesBtn.textContent = 'Változtatások mentése';

        saveChangesBtn.addEventListener("click",function(){

            fetch(`http://localhost:8888/etelek/${item.id}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type":"application/json"
                },
                body:
                    JSON.stringify({etelneve: nameInput.value,tipus:categorySelect.value,kep:item.kep,ar: priceInput.value,leiras:descInput.value})
            })
            .then(response=>response.json())
            .then(()=>{
                const index = foods.find(x=>x.id === item.id);
                index.ar = priceInput.value;
                index.leiras = descInput.value;
                
            })
            .then(location.reload());
            
        })
    
        modalFooterDiv.append(closeBtnModal);
        modalFooterDiv.append(saveChangesBtn);
    
        modalContentDiv.append(modalHeaderDiv);
        modalContentDiv.append(modalBodyDiv);
        modalContentDiv.append(modalFooterDiv);
    
        modalDialogDiv.append(modalContentDiv);
        modalDiv.append(modalDialogDiv);
    
        btnGroupDiv.append(modalDiv);
    
        buttonsCell.append(btnGroupDiv);
        tableRow.append(buttonsCell);
    
        tbody.append(tableRow);
        i++;
    }
}