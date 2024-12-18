package com.yoSolano.egesven.service.impl;

import com.yoSolano.egesven.DTO.UsuarioDTO;
import com.yoSolano.egesven.domain.Rol;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.RolRepository;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.UsuarioService;
import org.springframework.stereotype.Service;


@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, RolRepository rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    @Override
    public Usuario crearUsuario(UsuarioDTO usuarioDTO) {

        // Crear el nuevo usuario
        Usuario usuario = new Usuario();

        // Asignar los valores del DTO al usuario
        usuario.setNombreUsuario(usuarioDTO.getNombreUsuario());
        usuario.setCelUsuario(usuarioDTO.getCelUsuario());
        usuario.setDireccionUsuario(usuarioDTO.getDireccionUsuario());
        usuario.setEmailUsuario(usuarioDTO.getEmailUsuario());
        usuario.setContrasenaUsuario(usuarioDTO.getContrasenaUsuario());

        // Asignar el rol CLIENTE (id 1) por defecto ya que los roles estan guardados en la base de datos
        if (usuarioDTO.getRol() == null) {
            Rol rolUsuario = rolRepository.findById(1).orElseThrow(() ->
                    new RuntimeException("Rol CLIENTE no encontrado"));
            usuario.setRol(rolUsuario);
        } else {
            usuario.setRol(usuarioDTO.getRol());
        }

        return usuarioRepository.save(usuario);
    }


}