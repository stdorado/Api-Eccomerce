document.addEventListener('DOMContentLoaded', async function() {
    const usersContainer = document.getElementById('users');

    try {
        
        const response = await fetch('/api/users/allUsers');
        console.log(response)
        if (!response.ok) {
            throw new Error('Error al cargar usuarios');
        }
        
        
        const users = await response.json();

        
        const table = document.createElement('table');
        table.classList.add('table', 'w-full');
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="px-4 py-2">Nombre</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Rol</th>
                    <th class="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody id="usersBody">
                <!-- Aquí se agregarán dinámicamente las filas de usuarios -->
            </tbody>
        `;
        usersContainer.appendChild(table);

        const usersBody = table.querySelector('#usersBody');

        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border px-4 py-2">${user.first_Name} ${user.last_Name}</td>
                <td class="border px-4 py-2">${user.email}</td>
                <td class="border px-4 py-2">${user.role}</td>
                <td class="border px-4 py-2">
                    <button onclick="updateUserRole('${user._id}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Actualizar Usuario</button>
                    <button onclick="deleteUser('${user._id}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar Usuario</button>
                </td>
            `;
            usersBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
});

async function updateUserRole(userId) {
    try {
       
        const response = await fetch(`/api/users/${userId}/upgrade`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Error al actualizar usuario');
        }

       
        location.reload();
    } catch (error) {
        console.error('Error al actualizar usuario:', error);

    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/users/OneUserDelete/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }
        location.reload();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}
