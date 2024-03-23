document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateLoan').addEventListener('click', calculateLoanDetails);

    document.querySelectorAll('#loanAmount, #interestRate, #loanTerm').forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculateLoanDetails();
            }
        });
    });
});

function calculateLoanDetails() {
    const principal = parseFloat(document.getElementById('loanAmount').value.replace(/,/g, '') || 0);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value.replace(/,/g, '') || 0);
    const years = parseInt(document.getElementById('loanTerm').value.replace(/,/g, '') || 0, 10);

    if (principal > 0 && annualInterestRate > 0 && years > 0) {
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const numberOfPayments = years * 12;

        const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterestPaid = totalPayment - principal;

        document.getElementById('monthlyPaymentResult').innerText = `תשלום חודשי: ${formatNumber(monthlyPayment)} ש"ח`;
        document.getElementById('totalInterestPaidResult').innerText = `סך הריבית המשולמת: ${formatNumber(totalInterestPaid)} ש"ח`;
        document.getElementById('totalPaymentResult').innerText = `סכום כולל לתשלום: ${formatNumber(totalPayment)} ש"ח`;
    } else {
        alert('יש לוודא שכל הערכים הוזנו כהלכה, וששיעור הריבית גבוה מ-0.');
    }
}

function formatNumber(num) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}