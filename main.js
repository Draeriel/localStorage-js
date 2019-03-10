shopsList = [];
shoppingList = [];

window.onload = function () {
    this.setShopsList();
    if (this.shopsList.length > 0) {
    this.updateShopsList();
    this.updateShoppingList();
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
        let shopsSelect = document.createElement('select');
        shopsSelect.setAttribute('id', 'shopsSelect');
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
}

function addShop() {
    let shopName = document.getElementById('shopName').value;
    this.shopsList.push({
        name: shopName,
        shoppingList: []
    });
    localStorage.setItem('shops', JSON.stringify(this.shopsList));
}

function updateShoppingList() {
    Object.keys(this.shopsList).forEach( shop => {
        console.log( this.shopsList[shop].name)
        if (this.shopsList[shop].name === document.getElementById('shopsSelect').value) {
            this.displayShoppingList(this.shopsList[shop].shoppingList);
        };
    });
}

function displayShoppingList(shoppingList) {
    let div = document.createElement('div');
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
    Object.keys(this.shopsList).map( shop => {
        if (this.shopsList[shop].name === document.getElementById('shopsSelect').value) {
            shoppingList = this.shopsList[shop].shoppingList;
            this.shopsList[shop].shoppingList.push(document.getElementById('shoppingListForm').value);           
        };
    });
    localStorage.setItem('shops', JSON.stringify(this.shopsList));
}


