document.addEventListener("DOMContentLoaded", async function() {
    const buscarUsuarioBtn = document.getElementById('buscarUsuarioBtn');
    const abrirFormularioBtn = document.getElementById('abrirFormularioBtn');
    const cerrarFormularioBtn = document.getElementById('cerrarFormularioBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const crearUsuarioBtn = document.getElementById('crearUsuarioBtn');

    // Buscar Usuario Por Email.
    buscarUsuarioBtn.addEventListener('click', async () => {
        const emailUsuario = document.getElementById('buscarPorEmailUsuario').value;
        const errorDiv = document.getElementById('error');
        const usuarioTabla = document.getElementById('usuarioTabla');

        limpiarTabla(usuarioTabla);
        limpiarError(errorDiv);

        // Validar el formato del email
        if (!validarEmail(emailUsuario)) {
            mostrarError('Por favor, ingrese un email válido.', errorDiv);
            return;
        }

        try {
            const usuario = await obtenerUsuarioPorEmail(emailUsuario, errorDiv);
            if (usuario) {
                agregarUsuarioATabla(usuario, usuarioTabla);
            }
        } catch (error) {
            console.error('Error al conectar al servidor:', error);
            mostrarError('No se pudo conectar al servidor.', errorDiv);
        }
    });



    abrirFormularioBtn.addEventListener('click', async () => {
        document.getElementById('formularioCrearUsuario').style.display = 'block';
        await cargarRoles();
    });



    cerrarFormularioBtn.addEventListener('click', () => {
        document.getElementById('formularioCrearUsuario').style.display = 'none';
        limpiarForm();
    });



    crearUsuarioBtn.addEventListener('click', async () => {
          const nombreUsuario = document.getElementById('nombreUsuario').value;
          const celUsuario = document.getElementById('celUsuario').value;
          const direccionUsuario = document.getElementById('direccionUsuario').value;
          const emailUsuario = document.getElementById('emailUsuario').value;
          const contrasenaUsuario = document.getElementById('contrasenaUsuario').value;
          const rolUsuario = document.getElementById('rolUsuario').value;

          const errorDiv = document.getElementById('error');

          // Validación básica
          if (!validarEmail(emailUsuario)) {
              mostrarError('Por favor, ingrese un email válido.', errorDiv);
              return;
          }

          const usuarioData = {
              nombreUsuario,
              celUsuario,
              direccionUsuario,
              emailUsuario,
              contrasenaUsuario,
              rol: { idRol: rolUsuario }
          };

        try {
            const response = await fetch('http://localhost:8080/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData)
            });
        if (response.status === 201) {
              const nuevoUsuario = await response.json();
              console.log('Usuario creado con éxito:', nuevoUsuario);
              mostrarExito('Usuario creado con éxito');
           } else {
               const errorData = await response.json();
               mostrarError(errorData.error || 'Hubo un error al crear el usuario.', errorDiv);
           }
        } catch (error) {
            console.error('Error al conectar al servidor:', error);
            mostrarError('No se pudo conectar al servidor.', errorDiv);
        }
    });

    // Function obtener usuarioPorEmail.
    async function obtenerUsuarioPorEmail(emailUsuario, errorDiv) {
        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${encodeURIComponent(emailUsuario)}`);
            if (response.status === 200) {
                return await response.json();
            } else {
                manejarErroresDeRespuesta(response.status, errorDiv);
                return null;
            }
        } catch (error) {
            mostrarError('No se pudo conectar al servidor.', errorDiv);
            throw error;
        }
    }

    // Function para Cargar Los Roles de Crear Usuario
    async function cargarRoles() {
        try {
            const response = await fetch(`http://localhost:8080/api/roles`);
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const roles = await response.json();
            const select = document.getElementById('rolUsuario');

            select.innerHTML = '';

            roles.forEach((rol) => {
                const option = document.createElement('option');
                option.value = rol.idRol;
                option.textContent = rol.nombreRol;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error al obtener los roles:', error);
        }
    }


    function agregarUsuarioATabla(usuario, tabla) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.idUsuario}</td>
            <td>${usuario.nombreUsuario}</td>
            <td>${usuario.celUsuario}</td>
            <td>${usuario.direccionUsuario}</td>
            <td>${usuario.emailUsuario}</td>
            <td>********</td> <!-- Enmascarando la contraseña -->
            <td>${usuario.rol && usuario.rol.nombreRol ? usuario.rol.nombreRol : 'N/A'}</td>
            <td>
                <button class="btn btn-light" onclick="modificarUsuario(${usuario.idUsuario})"><i class="fas fa-edit"></i></button>
            </td>
            <td>
                <button class="btn btn-light" onclick="eliminarUsuario(${usuario.idUsuario})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tabla.appendChild(row);
    }

    // Funciones para modificar o eliminar usuarios (ejemplos)
    function modificarUsuario(id) {
        console.log('Modificar usuario con ID:', id);
        // Lógica para modificar el usuario
    }

    function eliminarUsuario(id) {
        console.log('Eliminar usuario con ID:', id);
        // Lógica para eliminar el usuario
    }

    function limpiarTabla(tabla) {
        tabla.innerHTML = '';
    }

    function limpiarError(errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }

    function validarEmail(emailUsuario) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(emailUsuario);
    }

    function manejarErroresDeRespuesta(status, errorDiv) {
        if (status === 404) {
            mostrarError('Usuario no encontrado.', errorDiv);
        } else if (status >= 500) {
            mostrarError('Error en el servidor. Por favor, inténtelo más tarde.', errorDiv);
        } else {
            mostrarError('Error al buscar el usuario.', errorDiv);
        }
    }

    function mostrarError(mensaje, errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
    }

    function mostrarExito(mensaje) {
        const exitoDiv = document.getElementById('exito');
        exitoDiv.textContent = mensaje;
        exitoDiv.style.display = 'block';
    }

    function limpiarForm() {
         document.getElementById('crearUsuarioForm').reset();
    }
});
