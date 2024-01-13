function calculatePercentageOfTotal() {
    var percent = document.getElementById('percentOfTotal').value;
    var total = document.getElementById('totalForPercentage').value;
    var result = (percent / 100) * total;
    document.getElementById('resultPercentageOfTotal').innerText = `Result: ${formatNumber(result)}`;
}

function calculateAmountAsPercentage() {
    var amount = document.getElementById('amount').value;
    var total = document.getElementById('totalAmount').value;
    var result = (amount / total) * 100;
    document.getElementById('resultAmountAsPercentage').innerText = `Result: ${formatNumber(result.toFixed(2))}%`;
}

function calculateTotalFromPercentage() {
    var partialAmount = document.getElementById('partialAmount').value;
    var percentage = document.getElementById('percentageOfTotal').value;
    var result = (partialAmount / percentage) * 100;
    document.getElementById('resultTotalFromPercentage').innerText = `Result: ${formatNumber(result)}`;
}

function formatNumber(number) {
    return number.toLocaleString();
}
document.querySelectorAll('input[type="number"]').forEach(item => {
    item.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            let parentDiv = item.closest('div');
            let button = parentDiv.querySelector('button');
            if (button) {
                button.click();
            }
        }
    });
});
