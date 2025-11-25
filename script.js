// -------------------- VARIABLES --------------------
let cart = [];

const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.querySelector('.close-modal');
const checkoutForm = document.getElementById('checkoutForm');


// -------------------- UPDATE CART COUNT --------------------
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}


// -------------------- ADD TO CART BUTTONS --------------------
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {

const id = this.getAttribute('data-id');
const name = this.getAttribute('data-name');
const price = parseFloat(this.getAttribute('data-price'));
const image = this.closest(".product-card, .product-car").querySelector(".product-image").style.backgroundImage.slice(5, -2);


            let item = cart.find(p => p.id === id);

            if (!item) {
                item = { id, name, price, quantity: 1 };
                cart.push(item);
            }

            updateCartCount();

            // Replace Add to Cart button with counter UI
            this.outerHTML = `
                <div class="counter-box" data-id="${id}">
                    <button class="minus">-</button>
                    <span class="counter-number">${item.quantity}</span>
                    <button class="plus">+</button>
                </div>
            `;

            setupCounterEvents();
        });
    });
}


// -------------------- COUNTER EVENTS --------------------
function setupCounterEvents() {
    document.querySelectorAll('.counter-box').forEach(box => {
        const id = box.getAttribute('data-id');
        const minus = box.querySelector('.minus');
        const plus = box.querySelector('.plus');
        const num = box.querySelector('.counter-number');

        minus.addEventListener('click', () => {
            const item = cart.find(i => i.id === id);

            if (item.quantity > 1) {
                item.quantity--;
                num.textContent = item.quantity;
            } else {
                // Remove from cart + restore button
                cart = cart.filter(i => i.id !== id);

                box.outerHTML = `
                    <button class="btn add-to-cart" data-id="${id}" data-name="${item.name}" data-price="${item.price}">
                        Add to Cart
                    </button>
                `;

                updateCartCount();
                setupAddToCartButtons();
                return;
            }

            updateCartCount();
        });

        plus.addEventListener('click', () => {
            const item = cart.find(i => i.id === id);
            item.quantity++;
            num.textContent = item.quantity;
            updateCartCount();
        });
    });
}
// -------------------- SLIDING CART DRAWER --------------------

const cartDrawer = document.getElementById('cartDrawer');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeDrawer = document.getElementById('closeDrawer');

// 🟢 Open cart drawer
cartIcon.addEventListener('click', () => {
    updateCartDrawer();
    cartDrawer.classList.add('open');
});

// 🟢 Close drawer
closeDrawer.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
});

// 🟢 Update Cart Drawer with Image + Name + Price + Qty
function updateCartDrawer() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" class="cart-img">

                <div class="cart-info">
                    <p class="cart-name">${item.name}</p>
                    <p class="cart-qty">Qty: ${item.quantity}</p>
                </div>

                <p class="cart-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}



closeModal.addEventListener('click', function() {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});

checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your order!');

    cart = [];
    updateCartCount();
    checkoutModal.style.display = 'none';
    checkoutForm.reset();
});


// -------------------- NEWSLETTER --------------------
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    alert(`Thank you for subscribing with ${email}!`);
    this.reset();
});


// -------------------- RUN ON START --------------------
setupAddToCartButtons();
// -------------------- FADE-IN ANIMATION --------------------
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));
// -------------------- DISCOUNT POPUP --------------------
setTimeout(() => {
    document.getElementById("discountPopup").style.display = "flex";
}, 4000); // popup appears after 4 seconds

document.getElementById("popupClose").addEventListener("click", () => {
    document.getElementById("discountPopup").style.display = "none";
});
// back to top 
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// chat Bot
const chatBubble = document.getElementById("chatBubble");
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatBubble.addEventListener("click", () => {
    chatWindow.style.display =
        chatWindow.style.display === "flex" ? "none" : "flex";
});

// Auto-reply messages
function botReply(message) {
    const bot = document.createElement("div");
    bot.textContent = "Support: " + message;
    bot.style.color = "#444";
    bot.style.margin = "8px 0";
    chatMessages.appendChild(bot);
}

chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && this.value.trim() !== "") {
        
        // User message
        const user = document.createElement("div");
        user.textContent = "You: " + this.value;
        user.style.fontWeight = "bold";
        chatMessages.appendChild(user);

        let msg = this.value.toLowerCase();
        this.value = "";

        setTimeout(() => {
            if (msg.includes("order")) botReply("You can track your order in My Orders section.");
            else if (msg.includes("price")) botReply("All prices are mentioned under every product.");
            else botReply("Thanks for your message! We will contact you soon.");
        }, 500);
    }
});
