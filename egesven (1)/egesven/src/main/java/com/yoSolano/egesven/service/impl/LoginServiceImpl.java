package com.yoSolano.egesven.service.impl;

import com.yoSolano.egesven.DTO.LoginDTO;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.LoginService;

import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    private final UsuarioRepository usuarioRepository;

    public LoginServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public boolean validarLogin(LoginDTO loginDTO) {
        Usuario usuario = usuarioRepository.findByEmailUsuario(loginDTO.getEmailUsuario());

        if (usuario != null && usuario.getEmailUsuario().equals(loginDTO.getEmailUsuario())
                && usuario.getContrasenaUsuario().equals(loginDTO.getContrasenaUsuario())) {
            return true;
        }

        return false;
    }
}
