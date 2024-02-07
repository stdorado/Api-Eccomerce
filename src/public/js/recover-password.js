document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const passwordContainer = document.getElementById('password-container');
    const passwordMessage = document.getElementById('password-message');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(forgotPasswordForm);
            const email = formData.get('email');

            try {
                const response = await fetch('/api/recover/password-resent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const password = data.password;

                    // Mostrar la contraseña en el contenedor
                    passwordMessage.textContent = `Tu contraseña es: ${password}`;
                    passwordContainer.style.display = 'block';

                    // También puedes ajustar cómo deseas mostrar la contraseña, como en un cuadro de diálogo modal, etc.
                } else {
                    const error = await response.json();
                    console.error('Error:', error.message);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        });
    }
});