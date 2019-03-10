shopsList = [];
shoppingList = [];
currentShop = '';

window.onload = function () {
    this.setShopsList();
    if (this.shopsList.length > 0) {
    this.updateShopsList();
    }
    console.log(this.shoppingList)

}

function setShopsList() {
    //localStorage.setItem('shops', JSON.stringify({name: 'Lidl', shoppingList: {}}));  
    if (localStorage.getItem('shops')) {
        localStorage.getItem('shops').length > 1 ?
            this.shopsList = JSON.parse(localStorage.getItem('shops')) :
            this.shopsList.push(JSON.parse(localStorage.getItem('shops')))
    }
}

function updateShopsList() {   
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

        this.updateShoppingList();
}

function addShop() {
    let shopName = document.getElementById('shopName').value;
    this.shopsList.push({
        name: shopName,
        shoppingList: []
    });
    localStorage.setItem('shops', JSON.stringify(this.shopsList));
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
        console.log( this.shopsList[shop].name)
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
    this.removeElementById('shopsListContainer');
    this.updateShopsList();
}

function removeElementById(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
    element.parentNode.removeChild(element);
    }
}


