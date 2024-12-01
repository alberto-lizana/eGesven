document.getElementById('buscarUsuarioBtn').addEventListener('click', async () => {
    const emailUsuario = document.getElementById('emailUsuario').value;
    const usuarioTabla = document.getElementById('usuarioTabla');
    const errorDiv = document.getElementById('error');

    // Limpiar cualquier mensaje de error previo
    errorDiv.textContent = '';
    usuarioTabla.innerHTML = '';  // Limpiar la tabla antes de mostrar resultados

    // Validar el formato del email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailUsuario || !emailRegex.test(emailUsuario)) {
        errorDiv.textContent = 'Por favor, ingrese un email válido.';
        errorDiv.style.display = 'block';
        return;
    }

    try {
        // Solicitud al servidor con el email como parámetro
        const response = await fetch(`http://localhost:8080/api/usuarios/${encodeURIComponent(emailUsuario)}`);

        console.log('Status de la respuesta:', response.status);

        if (response.status === 200) {
            const usuario = await response.json();
            console.log('Usuario encontrado:', usuario);

            // Crear una nueva fila con los datos del usuario
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.idUsuario}</td>
                <td>${usuario.nombreUsuario}</td>
                <td>${usuario.celUsuario}</td>
                <td>${usuario.direccionUsuario}</td>
                <td>${usuario.emailUsuario}</td>
                <td>********</td> <!-- Enmascarando la contraseña -->
                <td>${usuario.rolUsuario ? usuario.rolUsuario.nombreRol : 'N/A'}</td>
                <td>
                    <button class="btn btn-warning" onclick="modificarUsuario(${usuario.idUsuario})"><i class="fas fa-edit"></i> Modificar</button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarUsuario(${usuario.idUsuario})"><i class="fas fa-trash"></i> Eliminar</button>
                </td>
            `;
            usuarioTabla.appendChild(row);
        } else if (response.status === 404) {
            errorDiv.textContent = 'Usuario no encontrado.';
            errorDiv.style.display = 'block';
        } else if (response.status >= 500) {
            errorDiv.textContent = 'Error en el servidor. Por favor, inténtelo más tarde.';
            errorDiv.style.display = 'block';
        } else {
            errorDiv.textContent = 'Error al buscar el usuario.';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al conectar al servidor:', error);
        errorDiv.textContent = 'No se pudo conectar al servidor.';
        errorDiv.style.display = 'block';
    }
});

// Funciones para modificar o eliminar usuarios (ejemplos)
function modificarUsuario(id) {
    console.log('Modificar usuario con ID:', id);
    // Lógica para modificar el usuario
}

function eliminarUsuario(id) {
    console.log('Eliminar usuario con ID:', id);
    // Lógica para eliminar el usuario
}
