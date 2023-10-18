
document.getElementById('open-cart').addEventListener('click', function () {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'block';
    cartContainer.classList.add('open');
});

document.getElementById('close-cart').addEventListener('click', function () {
    document.getElementById('cart-container').classList.remove('open');
});


const addButtons = document.querySelectorAll('.add-to-cart');

addButtons.forEach(button => {
    button.addEventListener('click', function () {
        const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'block';
    cartContainer.classList.add('open');
        const productCard = button.closest('.card-body');
        const productName = productCard.querySelector('.card-title').textContent;
        const productPrice = parseFloat(productCard.querySelector('.card-price').textContent.slice(7).replace('$', ''));

        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="cart-item-name">${productName}</span>
            <div class="cart-item-quantity">
                <button class="btn btn-sm btn-outline-secondary cart-decrement"><i class="fas fa-minus"></i></button>
                <span class="cart-quantity">1</span>
                <button class="btn btn-sm btn-outline-secondary cart-increment"><i class="fas fa-plus"></i></button>
            </div>
            <span class="cart-item-price">$${productPrice.toFixed(2)}</span>
        `;

        document.getElementById('cart-items').appendChild(cartItem);

        // Update quantity with +/- buttons
        const incrementButton = cartItem.querySelector('.cart-increment');
        const decrementButton = cartItem.querySelector('.cart-decrement');
        const quantityDisplay = cartItem.querySelector('.cart-quantity');
        let quantity = 1;

        incrementButton.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateTotal();
        });

        decrementButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateTotal();
            }
        });

        updateTotal();
    });
});

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(item => {
        const itemPrice = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
        const itemQuantity = parseInt(item.querySelector('.cart-quantity').textContent);
        total += itemPrice * itemQuantity;
    });

    document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
}
