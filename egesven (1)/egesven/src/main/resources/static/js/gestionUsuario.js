document.addEventListener("DOMContentLoaded", async function() {
    const buscarUsuarioBtn = document.getElementById('buscarUsuarioBtn');
    const abrirFormularioBtn = document.getElementById('abrirFormularioBtn');
    const cerrarFormularioBtn = document.getElementById('cerrarFormularioBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const crearUsuarioBtn = document.getElementById('crearUsuarioBtn');
    const todosLosUsuariosBtn = document.getElementById('todosLosUsuariosBtn');
    const tablaUsuario = document.getElementById('tablaUsuario');
    const tablaRol = document.getElementById('tablaRol')
    const todosLosRolesBtn = document.getElementById('todosLosRolesBtn')
    const abrirFormulariocrearRolBtn = document.getElementById('abrirFormularioCrearRolBtn')


    const errorDiv = document.getElementById('error');
    const usuarioTabla = document.getElementById('usuarioTabla');

    const cargarMasBtn = document.getElementById('cargarMasBtn');
    let paginaActual = 1;
    const usuariosPorPagina = 5;


    // Buscar Usuario Por Email.
    buscarUsuarioBtn.addEventListener('click', async () => {
        const emailUsuario = document.getElementById('buscarPorEmailUsuario').value;

        ocultarBotonCargarMas();
        limpiarTabla(usuarioTabla);
        limpiarTabla(rolTabla);
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


    // Abrir Formulario
    abrirFormularioBtn.addEventListener('click', async () => {
        document.getElementById('formularioCrearUsuario').style.display = 'block';

        ocultarTablas();
        limpiarTabla(rolTabla);
        limpiarTabla(usuarioTabla)
        ocultarBotonCargarMas();
        await cargarRolesSelect();
    });


    // Cerrar Formulario
    cerrarFormularioBtn.addEventListener('click', () => {
        document.getElementById('formularioCrearUsuario').style.display = 'none';
        limpiarForm();
    });


    // Crear Usuario
    crearUsuarioBtn.addEventListener('click', async () => {

        ocultarTablas();
        ocultarBotonCargarMas();

        const nombreUsuario = document.getElementById('nombreUsuario').value;
        const celUsuario = document.getElementById('celUsuario').value;
        const direccionUsuario = document.getElementById('direccionUsuario').value;
        const emailUsuario = document.getElementById('emailUsuario').value;
        const contrasenaUsuario = document.getElementById('contrasenaUsuario').value;
        const rolUsuario = document.getElementById('rolUsuario').value;

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

    // Mostrar a Todos Los Usuarios
    todosLosUsuariosBtn.addEventListener('click', async () => {
        paginaActual = 1;

        ocultarBotonCargarMas();
        limpiarTabla(usuarioTabla);
        limpiarTabla(rolTabla);
        limpiarError(errorDiv);

        await cargarUsuarios(paginaActual, usuarioTabla);
    });

    // Manejar clic en el botón "Cargar más"
    cargarMasBtn.addEventListener('click', async () => {
        paginaActual++;
        const nuevosUsuarios = await cargarUsuarios(paginaActual, usuarioTabla);

        // Ocultar el botón si no hay más usuarios por cargar
        if (nuevosUsuarios.length === 0) {
            ocultarBotonCargarMas();
        }
    });

    // Mostrar a Todos Los Roles
    todosLosRolesBtn.addEventListener('click', async () => {

        ocultarBotonCargarMas();
        limpiarTabla(usuarioTabla);
        limpiarError(errorDiv);
        limpiarTabla(rolTabla);

        await cargarRoles(rolTabla);
    });



    // Funciones

    // Function que muestra Roles
    function mostrarRoles(roles, rolTabla) {

        mostrarTabla(tablaRol);

        roles.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rol.idRol}</td>
                <td>${rol.nombreRol}</td>
                <td>
                    <button class="btn btn-dark" onclick="asignarRol(${rol.idRol})"><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" onclick="modificarRol(${rol.idRol})"><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" onclick="eliminarRol(${rol.idRol})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            rolTabla.appendChild(row);
        });
    }

    // Cargar Todos Los Roles
    async function cargarRoles(rolTabla) {
        try {
            const response = await fetch(`http://localhost:8080/api/roles`);
            const roles = await response.json();

            mostrarRoles(roles, rolTabla);

        } catch (error) {
            console.error('Error al cargar los roles:', error);
            limpiarError(errorDiv); // Limpiar cualquier error previo
            mostrarError(errorDiv, 'No se pudieron cargar los roles');
        }
    }


    // Muestra Roles
    function mostrarRoles(roles, rolTabla) {

        mostrarTabla(tablaRol);

        roles.forEach(rol => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rol.idRol}</td>
                <td>${rol.nombreRol}</td>
                <td>
                    <button class="btn btn-dark" onclick="asignarRol(${rol.idRol})"><i class="fas fa-user-plus"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" onclick="modificarRol(${rol.idRol})"><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" onclick="eliminarRol(${rol.idRol})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            rolTabla.appendChild(row);
        });
    }

    // Mustra Usuarios en tabla (plural)
    function mostrarUsuarios(usuarios, usuarioTabla) {

        mostrarTabla(tablaUsuario);

        usuarios.forEach(usuario => {
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
                    <button class="btn btn-dark" onclick="modificarUsuario(${usuario.idUsuario})"><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" onclick="eliminarUsuario(${usuario.idUsuario})"><i class="fas fa-trash"></i></button>
                </td>
            `;
            usuarioTabla.appendChild(row);
        });
    }

    // Función para cargar usuarios desde el servidor
    async function cargarUsuarios(paginaActual, usuarioTabla) {

        mostrarTabla(tablaUsuario);

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/todos?page=${paginaActual - 1}&size=${usuariosPorPagina}`);
            if (response.ok) {
                const usuarios = await response.json();

                mostrarUsuarios(usuarios, usuarioTabla);

                if (usuarios.length > 0) {
                    mostrarBotonCargarMas();
                } else {
                    ocultarBotonCargarMas();
                }

                return usuarios; // Para usar en otras partes del código
            } else {
                console.error('Error al cargar usuarios:', response.status);
                return [];
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            return [];
        }
    }

    // Mostrar el botón "Cargar más"
    function mostrarBotonCargarMas() {
        cargarMasBtn.style.display = 'block';
    }

    // Ocultar el botón "Cargar más"
    function ocultarBotonCargarMas() {
        cargarMasBtn.style.display = 'none';
    }

    // Function obtener usuarioPorEmail.
    async function obtenerUsuarioPorEmail(emailUsuario, errorDiv) {

        mostrarTabla(tablaUsuario);

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
    async function cargarRolesSelect() {
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

    // function para agregar solo un usuario a tabla
    function agregarUsuarioATabla(usuario, usuarioTabla) {

        mostrarTabla(tablaUsuario);

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
                <button class="btn btn-dark" onclick="modificarUsuario(${usuario.idUsuario})"><i class="fas fa-edit"></i></button>
            </td>
            <td>
                <button class="btn btn-dark" onclick="eliminarUsuario(${usuario.idUsuario})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        usuarioTabla.appendChild(row);
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

    function mostrarTabla(tablaParaMostrar) {

        const todasLasTablas = [tablaUsuario, tablaRol];
        todasLasTablas.forEach(tabla => {
            if (tabla) tabla.style.display = 'none';
        });

        if (tablaParaMostrar) {
            tablaParaMostrar.style.display = 'table';
        }
    }

    function ocultarTablas() {
        if (tablaUsuario) {
            tablaUsuario.style.display = 'none';
        }
        if (tablaRol) {
            tablaRol.style.display = 'none';
        }
    }

});
