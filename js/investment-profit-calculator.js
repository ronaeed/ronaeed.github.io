let investmentChart = null; // Holds the chart instance

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateInvestmentProfit').addEventListener('click', calculateAndDisplayResults);

    // Add input formatting event listeners
    const formatInputs = document.querySelectorAll('#initialInvestment, #monthlyAddition');
    formatInputs.forEach(input => {
        input.addEventListener('input', formatInputWithCommas);
    });

    // Trigger button click when Enter is pressed in any input field
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById('calculateInvestmentProfit').click();
            }
        });
    });
});

function calculateAndDisplayResults() {
    // Convert null or empty values to 0
    let initialInvestment = parseFloat(document.getElementById('initialInvestment').value.replace(/,/g, '') || 0);
    let returnRate = parseFloat(document.getElementById('returnRate').value.replace(/,/g, '') || 0) / 100;
    let investmentDuration = parseInt(document.getElementById('investmentDuration').value.replace(/,/g, '') || 0, 10);
    let monthlyAddition = parseFloat(document.getElementById('monthlyAddition').value.replace(/,/g, '') || 0);

    let totalMonthlyInvestments = 0;
    let currentValue = initialInvestment;
    let monthlyGrowthRate = returnRate / 12;
    let labels = ['התחלה'];
    let data = [initialInvestment];

    for (let month = 1; month <= investmentDuration * 12; month++) {
        currentValue += currentValue * monthlyGrowthRate + monthlyAddition;
        totalMonthlyInvestments += monthlyAddition;

        if (month % 12 === 0) {
            labels.push(`שנה ${month / 12}`);
            data.push(currentValue);
        }
    }

    let totalInvestment = initialInvestment + totalMonthlyInvestments;
    let profits = currentValue - totalInvestment;
    let cumulativeReturn = (((profits / totalInvestment) * 100) || 0).toFixed(2);

    displayGraph(labels, data.map(value => value.toFixed(2)));
    displayResults(initialInvestment, totalMonthlyInvestments, currentValue, profits, cumulativeReturn);
}

function displayGraph(labels, data) {
    const canvas = document.getElementById('investmentGraph');
    const ctx = canvas.getContext('2d');

    // Make the canvas visible
    canvas.style.display = 'block';

    // Destroy the existing chart if it exists
    if (investmentChart) {
        investmentChart.destroy();
    }

    // Create a new chart
    investmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'ערך ההשקעה לאורך זמן',
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: data,
                fill: false,
            }]
        },
        options: {}
    });
}

function displayResults(initialInvestment, totalMonthlyInvestments, finalValue, profits, cumulativeReturn) {
    document.getElementById('initialInvestmentResult').innerText = `השקעה ראשונית: ${formatNumber(initialInvestment)} ש״ח`;
    document.getElementById('totalInvestmentResult').innerText = `סך ההפקדות הנוספות: ${formatNumber(totalMonthlyInvestments)} ש״ח`;
    document.getElementById('finalValueResult').innerHTML = `<strong>סכום מצטבר: ${formatNumber(finalValue)} ש״ח</strong>`;
    document.getElementById('profitsResult').innerText = `רווחים: ${formatNumber(profits)} ש״ח`;
    document.getElementById('cumulativeReturnResult').innerText = `תשואה מצטברת: ${cumulativeReturn}%`;
}

// Helper function to format numbers to 2 decimal places and add commas
function formatNumber(num) {
    return Number(parseFloat(num).toFixed(2)).toLocaleString('en-US');
}

function formatInputWithCommas(event) {
    // Remove non-numeric characters except for commas
    let value = event.target.value.replace(/[^0-9,]/g, '');
    // Remove all commas, then format number with commas
    value = value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    event.target.value = value;
}