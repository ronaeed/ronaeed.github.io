function formatNumberInput(event) {
    let value = event.target.value;

    // Allow only digits, commas, and a dot
    value = value.replace(/[^0-9,.]/g, '');

    // Split the value into whole and decimal parts
    let parts = value.split('.');
    let wholePart = parts[0].replace(/,/g, '');
    let decimalPart = parts[1];

    // Format the whole part with commas
    if (!isNaN(wholePart) && wholePart.length > 0) {
        wholePart = parseInt(wholePart).toLocaleString();
    }

    // Reassemble the value
    value = wholePart;
    if (decimalPart !== undefined) {
        value += '.' + decimalPart;
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
            e.preventDefault(); // Prevent the default action to avoid submitting the form if any.
            let parentDiv = item.closest('div.bg-white.shadow-md.rounded-lg'); // Adjusted to target your specific calculator section more accurately
            let button = parentDiv.querySelector('button'); // Find the calculate button within the same calculator section
            if (button) {
                button.click(); // Programmatically click the calculate button
            }
        }
    });
});