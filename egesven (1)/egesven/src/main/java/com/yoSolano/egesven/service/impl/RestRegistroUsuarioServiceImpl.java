package com.yoSolano.egesven.service.impl;

import com.yoSolano.egesven.DTO.UsuarioDTO;
import com.yoSolano.egesven.domain.Rol;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.RolRepository;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.RestRegistroUsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RestRegistroUsuarioServiceImpl implements RestRegistroUsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolRepository rolRepository;

    public RestRegistroUsuarioServiceImpl(UsuarioRepository usuarioRepository,
                                          PasswordEncoder passwordEncoder,
                                          RolRepository rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;
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

        Rol rol = rolRepository.findById(usuarioDTO.getRol().getIdRol())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        usuario.setRol(rol);

        usuario.setRol(rol);

        return usuarioRepository.save(usuario);
    }
}