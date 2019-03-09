shopsList = [];

window.onload = function () {
    this.setShopsList();
    this.updateShopsList();
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
    if (this.shopsList.length > 0) {
        let div = document.createElement('div');
        let shopsSelect = document.createElement('select');
        Object.keys(this.shopsList).forEach(shop => {
            let shopsOption = document.createElement('option');
            shopsOption.innerHTML = this.shopsList[shop].name;
            shopsSelect.appendChild(shopsOption);
        });
        div.innerHTML = "Seleccione una tienda: ";
        div.appendChild(shopsSelect);
        document.body.insertBefore(div, document.getElementById('shopForm'));
    }
}

function addShop() {
    let shopName = document.getElementById('shopName').value;
    this.shopsList.push({
        name: shopName,
        shoppingList: {}
    });
    localStorage.setItem('shops', JSON.stringify(this.shopsList));
    this.updateShopsList();
}

