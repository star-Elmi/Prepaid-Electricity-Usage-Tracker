// Select DOM elements
const balanceDisplay = document.getElementById('balance');
const topUpAmountInput = document.getElementById('topUpAmount');
const usageAmountInput = document.getElementById('usageAmount');
const topUpBtn = document.getElementById('topUpBtn');
const usageBtn = document.getElementById('usageBtn');
const usageHistoryList = document.getElementById('usageHistory');

// Initialize balance and history from local storage
let balance = localStorage.getItem('electricityBalance') ? parseFloat(localStorage.getItem('electricityBalance')) : 0;
let usageHistory = localStorage.getItem('usageHistory') ? JSON.parse(localStorage.getItem('usageHistory')) : [];

// Update balance display
balanceDisplay.textContent = balance.toFixed(2);

// Function to update the local storage and UI
function updateLocalStorage() {
    localStorage.setItem('electricityBalance', balance);
    localStorage.setItem('usageHistory', JSON.stringify(usageHistory));
    updateUI();
}

// Function to update the UI
function updateUI() {
    balanceDisplay.textContent = balance.toFixed(2);
    usageHistoryList.innerHTML = '';

    usageHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.date} - ${item.usage} kWh`;
        usageHistoryList.appendChild(li);
    });
}

// Top-Up button event listener
topUpBtn.addEventListener('click', () => {
    const topUpAmount = parseFloat(topUpAmountInput.value);

    if (isNaN(topUpAmount) || topUpAmount <= 0) {
        alert('Please enter a valid top-up amount.');
        return;
    }

    balance += topUpAmount;
    updateLocalStorage();

    // Clear input field
    topUpAmountInput.value = '';
});

// Usage button event listener
usageBtn.addEventListener('click', () => {
    const usageAmount = parseFloat(usageAmountInput.value);

    if (isNaN(usageAmount) || usageAmount <= 0) {
        alert('Please enter a valid usage amount.');
        return;
    }

    if (usageAmount > balance) {
        alert('Insufficient balance!');
        return;
    }

    // Deduct usage and add to history
    balance -= usageAmount;

    const date = new Date().toLocaleDateString();
    usageHistory.push({ date: date, usage: usageAmount });

    updateLocalStorage();

    // Clear input field
    usageAmountInput.value = '';
});

// Initial UI update
updateUI();
