const form = document.getElementById('contactForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});