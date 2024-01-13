function calculatePercentageOfTotal() {
    var percent = document.getElementById('percentOfTotal').value;
    var total = document.getElementById('totalForPercentage').value;
    var result = (percent / 100) * total;
    document.getElementById('resultPercentageOfTotal').innerText = `Result: ${result}`;
}

function calculateAmountAsPercentage() {
    var amount = document.getElementById('amount').value;
    var total = document.getElementById('totalAmount').value;
    var result = (amount / total) * 100;
    document.getElementById('resultAmountAsPercentage').innerText = `Result: ${result.toFixed(2)}%`;
}

function calculateTotalFromPercentage() {
    var partialAmount = document.getElementById('partialAmount').value;
    var percentage = document.getElementById('percentageOfTotal').value;
    var result = (partialAmount / percentage) * 100;
    document.getElementById('resultTotalFromPercentage').innerText = `Result: ${result}`;
}

// Optional: Add event listeners for 'Enter' key in input fields
document.querySelectorAll('input[type="number"]').forEach(item => {
    item.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            item.nextElementSibling.click();
        }
    });
});
