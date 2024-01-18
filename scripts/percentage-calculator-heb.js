function formatNumberInput(event) {
    // Allow only digits and commas
    let value = event.target.value;
    value = value.replace(/[^0-9,]/g, '');

    // Remove all commas and reformat
    value = value.replace(/,/g, '');
    if (!isNaN(value) && value.length > 0) {
        value = parseFloat(value).toLocaleString();
    }

    event.target.value = value;
}


document.getElementById('percentOfTotal').addEventListener('input', formatNumberInput);
document.getElementById('totalForPercentage').addEventListener('input', formatNumberInput);
document.getElementById('amount').addEventListener('input', formatNumberInput);
document.getElementById('totalAmount').addEventListener('input', formatNumberInput);
document.getElementById('partialAmount').addEventListener('input', formatNumberInput);
document.getElementById('percentageOfTotal').addEventListener('input', formatNumberInput);

function calculatePercentageOfTotal() {
    var percent = document.getElementById('percentOfTotal').value.replace(/,/g, '');
    var total = document.getElementById('totalForPercentage').value.replace(/,/g, '');
    var result = (parseFloat(percent) / 100) * parseFloat(total);
    document.getElementById('resultPercentageOfTotal').innerText = `תוצאה: ${formatNumber(result)}`;
}

function calculateAmountAsPercentage() {
    var amount = document.getElementById('amount').value.replace(/,/g, '');
    var total = document.getElementById('totalAmount').value.replace(/,/g, '');
    var result = (parseFloat(amount) / parseFloat(total)) * 100;
    document.getElementById('resultAmountAsPercentage').innerText = `תוצאה: ${formatNumber(result.toFixed(2))}%`;
}

function calculateTotalFromPercentage() {
    var partialAmount = document.getElementById('partialAmount').value.replace(/,/g, '');
    var percentage = document.getElementById('percentageOfTotal').value.replace(/,/g, '');
    var result = (parseFloat(partialAmount) / parseFloat(percentage)) * 100;
    document.getElementById('resultTotalFromPercentage').innerText = `תוצאה: ${formatNumber(result)}`;
}

function formatNumber(number) {
    return number.toLocaleString();
}
document.querySelectorAll('input[type="text"]').forEach(item => {
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
