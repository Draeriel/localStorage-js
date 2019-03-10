shopsList = [];
shoppingList = [];
currentShop = '';

window.onload = function () {
    this.setShopsList();
}

function setShopsList() {
    if (localStorage.getItem('shops')) {
        localStorage.getItem('shops').length > 1 ?
            this.shopsList = JSON.parse(localStorage.getItem('shops')) :
            this.shopsList.push(JSON.parse(localStorage.getItem('shops')))
    }
    if (this.shopsList.length > 0) {
        this.updateShopsList();
        }
}

function updateShopsList() {   
    this.removeElementById('shopsListContainer');
        let div = document.createElement('div');
        div.setAttribute('id', 'shopsListContainer');
        let shopsSelect = document.createElement('select');
        shopsSelect.setAttribute('id', 'shopsSelect');
        shopsSelect.setAttribute('onchange', 'changeShoppingList()');
        Object.keys(this.shopsList).forEach(shop => {
            let shopsOption = document.createElement('option');
            shopsOption.innerHTML = this.shopsList[shop].name;
            shopsSelect.appendChild(shopsOption);
        });
        let input = document.createElement('input');
        input.setAttribute('id', 'shoppingListForm');
        let button = document.createElement('button');
        button.innerHTML = "Añadit a la lista de la compra";
        button.setAttribute('onclick', 'addToShoppingList()');
        div.innerHTML = "Seleccione una tienda: ";
        div.appendChild(shopsSelect);
        div.appendChild(input);
        div.appendChild(button);

        document.body.insertBefore(div, document.getElementById('shopForm'));

        this.removeElementById('removeButton');
        let button2 = document.createElement('button');
        button2.innerHTML = 'Eliminar Tienda';
        button2.setAttribute('onclick', 'removeShop()');
        button2.setAttribute('id', 'removeButton');
        document.body.appendChild(button2);

        this.updateShoppingList();
}

function addShop() {
    let shopName = document.getElementById('shopName').value;
    document.getElementById('shopName').value = "";
    this.shopsList.push({
        name: shopName,
        shoppingList: []
    });
    localStorage.setItem('shops', JSON.stringify(this.shopsList));
    this.updateShopsList();
    this.currentShop = shopName;
    this.updateShoppingList();
}

function changeShoppingList() {
    this.currentShop = document.getElementById('shopsSelect').value;
    this.updateShoppingList();
}

function updateShoppingList() {
    if (this.currentShop) {
        document.getElementById('shopsSelect').value = this.currentShop;
    }
    this.removeElementById('currentShoppingList');
    Object.keys(this.shopsList).forEach( shop => {
        if (this.shopsList[shop].name === document.getElementById('shopsSelect').value) {
            this.displayShoppingList(this.shopsList[shop].shoppingList);
        };
    });
}

function displayShoppingList(shoppingList) {
    let div = document.createElement('div');
    div.setAttribute('id', 'currentShoppingList');
        let ul = document.createElement('ul');
    shoppingList.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = element;
        li.setAttribute('id', element);
        let a = document.createElement('a');
        a.innerHTML = ' X';
        a.href = '#'
        a.setAttribute('onclick', `removeShoppingListElement(${element})`);
        li.appendChild(a);
        ul.appendChild(li);
       
    });
    div.appendChild(ul);
    document.body.appendChild(div);
}

function addToShoppingList() {
    if (this.currentShop) {
        document.getElementById('shopsSelect').value = this.currentShop;
    }
    Object.keys(this.shopsList).map( shop => {
        if (this.shopsList[shop].name === document.getElementById('shopsSelect').value) {
            shoppingList = this.shopsList[shop].shoppingList;
            this.shopsList[shop].shoppingList.push(document.getElementById('shoppingListForm').value);           
        };
    });
    localStorage.setItem('shops', JSON.stringify(this.shopsList));
    this.setShopsList();
}

function removeElementById(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
    element.parentNode.removeChild(element);
    }
}

function removeShoppingListElement(elementId) {
    Object.keys(this.shopsList).map( shop => {
        if (this.shopsList[shop].name === document.getElementById('shopsSelect').value) {
            shoppingList = this.shopsList[shop].shoppingList;
            this.shopsList[shop].shoppingList = this.shopsList[shop].shoppingList.filter( element => element !== elementId.id);       
        };
    });
    localStorage.setItem('shops', JSON.stringify(this.shopsList));
    this.setShopsList();
}

function removeShop() {
    this.shopsList = Object.keys(this.shopsList).filter( shop => 
        this.shopsList[shop].name !== document.getElementById('shopsSelect').value   
   ).map( key  => this.shopsList[parseInt(key)]);
   if (this.shopsList[0]) {
        this.currentShop = this.shopsList[0].name;  
   } else {
    this.removeElementById('shopsListContainer');
    this.removeElementById('removeButton');
    this.removeElementById('currentShoppingList');
   }
   localStorage.setItem('shops', JSON.stringify(this.shopsList));
   this.setShopsList();
}


