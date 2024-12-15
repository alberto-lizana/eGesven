document.addEventListener("DOMContentLoaded", async function() {

    const API = 'http://localhost:8080/api';

    // Buscar Usuario via Email
    const buscarUsuarioBtn = document.getElementById('buscarUsuarioBtn');

    // Crear Usuario Const
    const abrirFormularioBtn = document.getElementById('abrirFormularioBtn');
    const cerrarFormularioBtn = document.getElementById('cerrarFormularioBtn');
    const crearUsuarioForm = document.getElementById('crearUsuarioForm');
    const crearUsuarioBtn = document.getElementById('crearUsuarioBtn');

    // Mostrar todos los Roles
    const todosLosRolesBtn = document.getElementById('todosLosRolesBtn')

    // Tabla Tr y Td
    const tablaUsuario = document.getElementById('tablaUsuario');
    const tablaRol = document.getElementById('tablaRol')

    const rolTablaTBody = document.getElementById('rolTablaTBody');
    const usuarioTablaTBody = document.getElementById('usuarioTablaTBody')

    // Mostrar todos los usuarios Pageable
    const todosLosUsuariosBtn = document.getElementById('todosLosUsuariosBtn');
    const cargarMasBtn = document.getElementById('cargarMasBtn');
    let paginaActual = 1;
    const usuariosPorPagina = 5;

    // Crear Rol Botones abrir, cerrar, crear, borrar none y table Form
    const abrirFormularioCrearRolBtn = document.getElementById('abrirFormularioCrearRolBtn');
    const cerrarFormularioRolBtn = document.getElementById('cerrarFormularioRolBtn');
    const crearRolBtn = document.getElementById('crearRolBtn');
    const crearRolForm = document.getElementById('crearRolForm');

    // Mensaje Principal
    const mensajePrincipal = document.getElementById("mensajePrincipal");

    // Mensaje Crear Usuario
    const mensajeCrearUsuario = document.getElementById("mensajeCrearUsuario");

    // Mensaje Crear Rol
    const mensajeCrearRol = document.getElementById("mensajeCrearRol");


    // Buscar Usuario Por Email.
    buscarUsuarioBtn.addEventListener('click', async () => {
        const emailUsuario = document.getElementById('buscarPorEmailUsuario').value;

        quitarBotonCargarMas();
        limpiarTabla(usuarioTablaTBody);
        limpiarTabla(rolTablaTBody);

        // Validar email antes de proceder
        if (validarEmail(emailUsuario)) {
             mostrarTabla(tablaUsuario);
             buscarUsuarioEmailAPI(emailUsuario);
        } else {
                mostrarMensaje('El correo electrónico no tiene un formato válido.', mensajePrincipal);
        }
    });


    // Abrir Formulario
    abrirFormularioBtn.addEventListener('click', async () => {
        document.getElementById('formularioCrearUsuario').style.display = 'block';

        ocultarTablas();
        limpiarTabla(rolTablaTBody);
        limpiarTabla(usuarioTablaTBody);
        quitarBotonCargarMas();

        await cargarRolesSelect();
    });


    // Cerrar Formulario
    cerrarFormularioBtn.addEventListener('click', () => {
        document.getElementById('formularioCrearUsuario').style.display = 'none';
        limpiarFormCrearUsuario();
    });


    // Crear Usuario
    crearUsuarioBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        tomarDatosParaCrearUsuario();
    });


    // Mostrar a Todos Los Usuarios
    todosLosUsuariosBtn.addEventListener('click', async () => {
        paginaActual = 1;

        limpiarTabla(usuarioTablaTBody);
        limpiarTabla(rolTablaTBody);
        mostrarTabla(tablaUsuario);
        quitarBotonCargarMas();

        await cargarUsuarios(paginaActual, usuarioTablaTBody, usuariosPorPagina);
    });

    // Manejar clic en el botón "Cargar más"
    cargarMasBtn.addEventListener('click', async () => {
        paginaActual++;
        const nuevosUsuarios = await cargarUsuarios(paginaActual, usuarioTablaTBody);

        // Ocultar el botón si no hay más usuarios por cargar
        if (nuevosUsuarios.length === 0) {
            controlarBotonCargarMas(nuevosUsuarios);
        }
    });

    // Mostrar a Todos Los Roles
    todosLosRolesBtn.addEventListener('click', async () => {

        limpiarTabla(usuarioTablaTBody);
        limpiarTabla(rolTablaTBody);
        mostrarTabla(tablaRol);
        quitarBotonCargarMas();

        await cargarRoles(rolTablaTBody);
    });

    // Abrir Form Crear Rol
    abrirFormularioCrearRolBtn.addEventListener('click', async () => {

        formularioCrearRol.style.display = 'table';
        ocultarTablas();
        limpiarTabla(rolTablaTBody);
        limpiarTabla(usuarioTablaTBody);
        quitarBotonCargarMas();
    });

    // Cerrar Form Crear Rol
    cerrarFormularioRolBtn.addEventListener('click', async () => {
        formularioCrearRol.style.display = 'none';
        limpiarFormCrearRol();
    });

    // Crear Rol
    crearRolBtn.addEventListener('click', async () => {
        event.preventDefault();
        TomarNombreRol();
        limpiarFormCrearRol();

    });


    // Funciones
    // Borrar Rol
    async function eliminarRol(idRol, row) {
        try {
            const response = await fetch(`${API}/roles/${idRol}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Rol eliminado correctamente');
                row.remove();

            } else {
                alert('No se pudo eliminar el rol');
            }
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
            alert('Error al eliminar el rol');
        }
    }

    // crearRol
    async function CrearRol(nombreRol) {
        try {
            const response = await fetch(`${API}/roles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nombreRol),
            });

            if (response.ok) {
                const nuevoRol = await response.json();
                mostrarMensaje('Rol creado exitosamente', mensajeCrearRol);
                limpiarFormCrearRol();
            } else {
                const errorMessage = await response.text();
                mostrarMensaje(`Error al crear el rol: ${errorMessage}`, mensajeCrearRol);
            }
        } catch (error) {
            mostrarMensaje('Error de conexión con el servidor. Inténtalo de nuevo más tarde.', mensajeCrearRol);
        }
    }

    //Tomar nombreRol
    function TomarNombreRol(){
        const nombreRolInput = document.getElementById('nombreRol')
        const nombreRol = nombreRolInput.value.trim();

        if (!nombreRol) {
            mostrarMensaje('El nombre del rol no puede estar vacío.', mensajeCrearRol);
            return;
        }

        CrearRol(nombreRol);
    }

    // Consulta API Buscar Por Email
    async function buscarUsuarioEmailAPI(emailUsuario){
            try {
                const usuario = await obtenerUsuarioPorEmail(emailUsuario, mensajePrincipal);
                if (usuario) {
                    agregarUsuarioATabla(usuario, usuarioTablaTBody);
                }
            } catch (error) {
                mostrarMensaje('No se encontraron datos.', mensajePrincipal);
            }
    }

    // Tomar Datos Para Crear Usuario
    function tomarDatosParaCrearUsuario() {

        const nombreUsuario = document.getElementById('nombreUsuario').value;
        const celUsuario = document.getElementById('celUsuario').value;
        const direccionUsuario = document.getElementById('direccionUsuario').value;
        const emailUsuario = document.getElementById('emailUsuario').value;
        const contrasenaUsuario = document.getElementById('contrasenaUsuario').value;
        const rolUsuario = document.getElementById('rolUsuario').value;

        const usuarioData = {
            nombreUsuario,
            celUsuario,
            direccionUsuario,
            emailUsuario,
            contrasenaUsuario,
            rol: { idRol: rolUsuario }
        };

        crearUsuario(usuarioData);
    }


    async function crearUsuario(usuarioData) {
        try {
            const response = await fetch(`${API}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData)
            });

            console.log('Estado:', response.status);

            const data = await response.json();
            console.log('Respuesta:', data);

            if (response.status === 201) {
                mostrarMensaje('Usuario creado con éxito', mensajeCrearUsuario);
                limpiarFormCrearUsuario();
            } else if (response.status === 400) {
                // Itera sobre el mapa de errores y muestra cada mensaje.
                const mensajesErrores = Object.values(data).join(', ');
                mostrarMensaje(mensajesErrores, mensajeCrearUsuario);
                limpiarFormCrearUsuario();
            } else {
                mostrarMensaje('Hubo un error en el servidor.', mensajeCrearUsuario);
                limpiarFormCrearUsuario();
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarMensaje('Hubo un error de conexión.', mensajeCrearUsuario);
            limpiarFormCrearUsuario();
        }
    }


    // Cargar Todos Los Roles
    async function cargarRoles(rolTablaTBody) {
        try {
            const response = await fetch(`${API}/roles`);
            const roles = await response.json();

            mostrarRoles(roles, rolTablaTBody);

        } catch (error) {
            console.error('Error al cargar los roles:', error);
            mostrarMensaje('No se pudieron cargar los roles o no existen roles', mensajePrincipal);
        }
    }


    // Muestra Roles
    function mostrarRoles(roles, rolTablaTBody) {
        roles.forEach(rol => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rol.idRol}</td>
                <td>${rol.nombreRol}</td>
                <td>
                    <button class="btn btn-dark" data-id="${rol.idRol}"><i class="fas fa-user-plus asignar-rol"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" data-id="${rol.idRol}"><i class="fas fa-edit editar-rol"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" data-id="${rol.idRol}"><i class="fas fa-trash borrar-rol"></i></button>
                </td>
            `;
            rolTablaTBody.appendChild(row);

            const deleteRolButton = row.querySelector('.borrar-rol');
            deleteRolButton.addEventListener('click', function() {
                eliminarRol(rol.idRol, row);
            });
        });
    }


    // Mustra Usuarios en tabla (plural)
    function mostrarUsuarios(usuarios, usuarioTablaTBody) {

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
                    <button class="btn btn-dark" onclick="modificarUsuario(${usuario.idUsuario})"><i class="fas fa-edit editar-usuario"></i></button>
                </td>
                <td>
                    <button class="btn btn-dark" onclick="eliminarUsuario(${usuario.idUsuario})"><i class="fas fa-trash borrar-usuario"></i></button>
                </td>
            `;
            usuarioTablaTBody.appendChild(row);

            const deleteUsuarioButton = row.querySelector('.borrar-usuario');
            deleteUsuarioButton.addEventListener('click', function() {
                eliminarUsuario(usuario.idUsuario, row);

            });
        });
    }

    // Función para cargar usuarios desde el servidor
    async function cargarUsuarios(paginaActual, usuarioTablaTBody) {

        mostrarTabla(tablaUsuario);

        try {
            const response = await fetch(`${API}/usuarios/todos?page=${paginaActual - 1}&size=${usuariosPorPagina}`);
            if (response.ok) {
                const usuarios = await response.json();

                mostrarUsuarios(usuarios, usuarioTablaTBody);

                controlarBotonCargarMas(usuarios);
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

    // Función para mostrar u ocultar el botón "Cargar más"
    function controlarBotonCargarMas(totalUsuariosCargados) {
        if (totalUsuariosCargados < usuariosPorPagina) {
            quitarBotonCargarMas();
        } else {
            mostrarBotonCargarMas();
        }
    }

    // Mostrar Botón cargar más
    function mostrarBotonCargarMas(){
        cargarMasBtn.style.display = 'block';
    }

    function quitarBotonCargarMas(){
        cargarMasBtn.style.display = 'none';
    }

    // Function obtener usuarioPorEmail.
    async function obtenerUsuarioPorEmail(emailUsuario, mensajePrincipal) {

        mostrarTabla(tablaUsuario);

        try {
            const response = await fetch(`${API}/usuarios/${encodeURIComponent(emailUsuario)}`);
            if (response.status === 200) {
                return await response.json();
            } else {
                mostrarError(response.status, mensajePrincipal);
                return null;
            }
        } catch (error) {
            mostrarError('No se pudo conectar al servidor.', mensajePrincipal);
            throw error;
        }
    }

    // Function para Cargar Los Roles de Crear Usuario
    async function cargarRolesSelect() {
        try {
            const response = await fetch(`${API}/roles`);
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
            mostrarMensaje('No se encontraron roles disponibles', mensajePrincipal);
        }
    }

    // function para agregar solo un usuario a tabla
    function agregarUsuarioATabla(usuario, usuarioTablaTBody) {

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
                <button class="btn btn-dark" onclick="modificarUsuario(${usuario.idUsuario})"><i class="fas fa-edit editar-usuario"></i></button>
            </td>
            <td>
                <button class="btn btn-dark" data-id="${usuario.idUsuario}"><i class="fas fa-trash borrar-usuario"></i></button>
            </td>
        `;

            usuarioTablaTBody.appendChild(row);

            const deleteUsuarioButton = row.querySelector('.borrar-usuario');
            deleteUsuarioButton.addEventListener('click', function() {
                eliminarUsuario(usuario.idUsuario, row);
        });
    }

    // Eliminar Usuario
    async function eliminarUsuario(idUsuario, row) {
        try {
            const response = await fetch(`${API}/usuarios/${idUsuario}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Usuario eliminado correctamente');
                row.remove();

            } else {
                alert('No se pudo eliminar el Usuario');
            }
        } catch (error) {
            console.error('Error al eliminar el Usuario:', error);
            alert('Error al eliminar al Usuario');
        }
    }

    function limpiarTabla(tablaTBody) {
        tablaTBody.innerHTML = '';
    }

    function limpiarFormCrearUsuario() {
        document.getElementById('crearUsuarioForm').reset();
    }

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function limpiarFormCrearUsuario() {
        crearUsuarioForm.reset();
    }

    function limpiarFormCrearRol() {
        crearRolForm.reset();
    }

    function mostrarTabla(TablaUsORol) {

        const todasLasTablas = [tablaUsuario, tablaRol];
        todasLasTablas.forEach(tabla => {
            if (tabla) tabla.style.display = 'none';
        });

        if (TablaUsORol) {
            TablaUsORol.style.display = 'table';
        }
    }

    function mostrarMensaje(mensaje, contenedor) {
        contenedor.style.display = 'block';
        contenedor.innerHTML = mensaje;
        setTimeout(() => {
            contenedor.style.display = 'none';
        }, 5000);
    }

    function ocultarTablas() {
        const todasLasTablas = [tablaUsuario, tablaRol];
        todasLasTablas.forEach(tabla => {
            if (tabla) tabla.style.display = 'none';
        });
    }
});
