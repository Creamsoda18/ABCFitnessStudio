const CART_STORAGE_KEY = 'items';

let cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY) || '[]');

document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    const product = {
      name: button.dataset.product,
      price: parseFloat(button.dataset.price)
    };
    cart.push(product);
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    alert('Item added to the cart');
    updateCartDisplay();
  });
});


document.getElementById('Cart')?.addEventListener('click', () => {
  const modal = document.getElementById('CartMenu');
  cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY) || '[]');
  updateCartDisplay();
  modal.style.display = 'block';
});


document.getElementById('Cart-Clear')?.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('No items to clear');
  } else {
    cart = [];
    sessionStorage.removeItem(CART_STORAGE_KEY);
    alert('Cart cleared');
    updateCartDisplay();
    document.getElementById('CartMenu').style.display = 'none';
  }
});


document.getElementById('ProcessOrder')?.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Cart is empty');
  } else {
    alert('Thank you for your order');
    cart = [];
    sessionStorage.removeItem(CART_STORAGE_KEY);
    updateCartDisplay();
    document.getElementById('CartMenu').style.display = 'none';
  }
});


function updateCartDisplay() {
  const items = document.getElementById('items');
  if (items) {
    items.innerHTML = '';
    cart.forEach(item => {
      items.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
  }
}


document.querySelectorAll('.w-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput.value) {
      alert('Thank you for subscribing');
      emailInput.value = '';
    }
  });
});


const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
      timestamp: new Date().toISOString()
    };
    
    
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(formData);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    alert('Thank you for your message');
    contactForm.reset();
  });
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  const modal = document.getElementById('CartMenu');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});