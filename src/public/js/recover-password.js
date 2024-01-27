document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(forgotPasswordForm);
            const email = formData.get('email');

            // Aquí puedes enviar el formulario al servidor
            try {
                const response = await fetch('/api/recover/password-resent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    // Redireccionar manualmente después de que la solicitud sea exitosa
                    window.location.href = '/password-reset-sent';
                } else {
                    const error = await response.json();
                    // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                    console.error('Error:', error.message);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        });
    }
});
