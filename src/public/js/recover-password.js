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
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'El correo se envió con éxito, revisa tu casilla de mensajes',
                        position: 'top-end', 
                        showConfirmButton: false, 
                        timer: 2000,
                        width : "20rem"
                    });
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