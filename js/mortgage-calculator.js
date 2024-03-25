document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateMortgage').addEventListener('click', calculateMortgageDetails);

    // Unified event listener for formatting input with commas
    const numberInputs = document.querySelectorAll('#mortgageAmount, #ownCapital');
    numberInputs.forEach(input => {
        input.addEventListener('input', formatMortgageAmountInput);
    });

    // Handling Enter key press to trigger calculation
    document.querySelectorAll('#mortgageAmount, #interestRate, #mortgageTerm, #ownCapital, #maximumPropertyCost').forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculateMortgageDetails();
            }
        });
    });

    // Update the mortgage term display dynamically
    document.getElementById('mortgageTerm').addEventListener('input', function() {
        document.getElementById('mortgageTermValue').innerText = `${document.getElementById('mortgageTerm').value} שנים`;
    });

    // Initial calculation for maximum property cost
    calculateMaximumPropertyCost();
    // Recalculate maximum property cost when own capital changes
    document.getElementById('ownCapital').addEventListener('input', calculateMaximumPropertyCost);
});

function calculateMaximumPropertyCost() {
    const ownCapital = parseFloat(document.getElementById('ownCapital').value.replace(/,/g, '') || 0);
    const maximumPropertyCost = ownCapital * 4;
    document.getElementById('maximumPropertyCost').value = formatNumber(Math.round(maximumPropertyCost)) + " ש\"ח";
}


function calculateMortgageDetails() {
    const ownCapital = parseFloat(document.getElementById('ownCapital').value.replace(/,/g, '') || 0);
    const principal = parseFloat(document.getElementById('mortgageAmount').value.replace(/,/g, '') || 0);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value.replace(/,/g, '') || 0);
    const years = parseInt(document.getElementById('mortgageTerm').value, 10);

    if (principal > 0 && annualInterestRate > 0 && years > 0) {
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const numberOfPayments = years * 12;

        const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterestPaid = totalPayment - principal;

        document.getElementById('monthlyPaymentResult').innerText = `תשלום חודשי: ${formatNumber(monthlyPayment)} ש"ח`;
        document.getElementById('totalInterestPaidResult').innerText = `סך הריבית המשולמת: ${formatNumber(totalInterestPaid)} ש"ח`;
        document.getElementById('totalPaymentResult').innerText = `סכום כולל לתשלום: ${formatNumber(totalPayment)} ש"ח`;

        document.getElementById('mortgagePieChart').style.display = 'block';
        updatePieChart([totalInterestPaid, principal]);
    } else {
        alert('יש לוודא שכל הערכים הוזנו כהלכה, וששיעור הריבית גבוה מ-0.');
    }
}

function formatNumber(num) {
    return num.toLocaleString('he-IL');
}

function updatePieChart(data) {
    const ctx = document.getElementById('mortgagePieChart').getContext('2d');
    if (window.mortgagePieChartInstance) {
        window.mortgagePieChartInstance.destroy();
    }
    window.mortgagePieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['סך הריבית המשולמת', 'סכום ההלוואה'],
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

function formatMortgageAmountInput(event) {
    let input = event.target;
    let formattedInputValue = input.value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input.value = formattedInputValue;
}