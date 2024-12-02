package com.yoSolano.egesven.service.impl;

import com.yoSolano.egesven.DTO.UsuarioDTO;
import com.yoSolano.egesven.domain.Rol;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.RestRegistroUsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RestRegistroUsuarioServiceImpl implements RestRegistroUsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public RestRegistroUsuarioServiceImpl(UsuarioRepository usuarioRepository,
                                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Usuario crearUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(usuarioDTO.getNombreUsuario());
        usuario.setCelUsuario(usuarioDTO.getCelUsuario());
        usuario.setDireccionUsuario(usuarioDTO.getDireccionUsuario());
        usuario.setEmailUsuario(usuarioDTO.getEmailUsuario());

        String contrasenaEncriptada = passwordEncoder.encode(usuarioDTO.getContrasenaUsuario());
        usuario.setContrasenaUsuario(contrasenaEncriptada);

        // Obtener el idRol desde el objeto Rol en el DTO
        Rol rol = new Rol();
        rol.setIdRol(usuarioDTO.getRol().getIdRol());

        usuario.setRol(rol);

        return usuarioRepository.save(usuario);
    }
}