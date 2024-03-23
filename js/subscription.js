document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the actual form submission
        // Display the success message
        const successMessage = document.getElementById('success-message');
        successMessage.classList.remove('hidden');
        successMessage.classList.add('block');

        // Optionally, clear the input field
        document.querySelector('input[type="email"]').value = '';
    });
});