"use strict";

let etelek = [];

fetch("http://localhost:8888/etelek").then(response => response.json()).then(data => etelek = data).then(showDatas);

function showDatas(data) {
    const tbody = document.querySelector("#tbody");
    while(tbody.firstChild){
        tbody.firstChild.remove();
    }
    
    for(const item of etelek){

        var tableRow = document.createElement('tr');
    
    
        var dishNameCell = document.createElement('td');
        dishNameCell.textContent = item["etelneve"];
        tableRow.append(dishNameCell);
    
        var badgeCell = document.createElement('td');
        var badgeSpan = document.createElement('span');
        badgeSpan.className = 'badge bg-success';
        badgeSpan.textContent = item["tipus"];
        badgeCell.append(badgeSpan);
        tableRow.append(badgeCell);
    
    
        var priceCell = document.createElement('td');
        priceCell.textContent = item["ar"]+" Ft";
        tableRow.append(priceCell);
    
    
        var buttonsCell = document.createElement('td');
        var btnGroupDiv = document.createElement('div');
        btnGroupDiv.className = 'btn-group';
        btnGroupDiv.setAttribute('role', 'group');
        btnGroupDiv.setAttribute('aria-label', 'Basic mixed styles example');
    
        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = '🗑️';
        btnGroupDiv.append(deleteButton);
    
        var editButton = document.createElement('button');
        editButton.setAttribute('type', 'button');
        editButton.className = 'btn btn-warning';
        editButton.setAttribute('data-bs-toggle', 'modal');
        editButton.setAttribute('data-bs-target', '#exampleModal');
        editButton.textContent = '✏️';
        btnGroupDiv.append(editButton);
    
        var modalDiv = document.createElement('div');
        modalDiv.className = 'modal fade';
        modalDiv.setAttribute('id', 'exampleModal');
        modalDiv.setAttribute('tabindex', '-1');
        modalDiv.setAttribute('aria-labelledby', 'exampleModalLabel');
        modalDiv.setAttribute('aria-hidden', 'true');
    
        var modalDialogDiv = document.createElement('div');
        modalDialogDiv.className = 'modal-dialog';
    
        var modalContentDiv = document.createElement('div');
        modalContentDiv.className = 'modal-content';
    
        var modalHeaderDiv = document.createElement('div');
        modalHeaderDiv.className = 'modal-header';
    
        var modalTitle = document.createElement('h1');
        modalTitle.className = 'modal-title fs-5';
        modalTitle.setAttribute('id', 'exampleModalLabel');
        modalTitle.textContent = 'Étel szerkesztése';
    
        var closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
    
        modalHeaderDiv.append(modalTitle);
        modalHeaderDiv.append(closeButton);
    
        var modalBodyDiv = document.createElement('div');
        modalBodyDiv.className = 'modal-body';
        var formRow = document.createElement('form');
        formRow.className = 'row';
    
        var modalFooterDiv = document.createElement('div');
        modalFooterDiv.className = 'modal-footer';
    
        var closeBtnModal = document.createElement('button');
        closeBtnModal.setAttribute('type', 'button');
        closeBtnModal.className = 'btn btn-danger';
        closeBtnModal.setAttribute('data-bs-dismiss', 'modal');
        closeBtnModal.textContent = 'Bezárás';
    
        var saveChangesBtn = document.createElement('button');
        saveChangesBtn.setAttribute('type', 'button');
        saveChangesBtn.className = 'btn btn-primary';
        saveChangesBtn.textContent = 'Változtatások mentése';
    
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
    }

}