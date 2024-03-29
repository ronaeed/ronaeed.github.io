const principal = 100000; // Initial amount
const annualRate = 8; // Annual interest rate
const years = 40; // Time period in years

const labels = Array.from({length: years + 1}, (_, i) => i === 0 ? "התחלה" : `שנה ${i}`);
const compoundInterestData = [principal];
const simpleInterestData = [principal];

for (let i = 1; i <= years; i++) {
    // Compound interest calculation
    compoundInterestData.push(principal * Math.pow(1 + annualRate / 100, i));
    // Simple interest calculation
    simpleInterestData.push(principal + (principal * annualRate / 100 * i));
}

const ctx = document.getElementById('interestChart').getContext('2d');
const interestChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'עם ריבית דריבית',
            data: compoundInterestData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: 'origin', // Fill the area under the line
        }, {
            label: 'ללא ריבית דריבית',
            data: simpleInterestData,
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            fill: 'origin', // Fill the area under the line
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});