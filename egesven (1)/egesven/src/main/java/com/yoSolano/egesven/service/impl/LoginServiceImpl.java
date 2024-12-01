package com.yoSolano.egesven.service.impl;

import com.yoSolano.egesven.DTO.LoginDTO;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.LoginService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginServiceImpl(UsuarioRepository usuarioRepository,
                            PasswordEncoder passwordEncoder) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean validarLogin(LoginDTO loginDTO) {
        Optional<Usuario> usuario = usuarioRepository.findByEmailUsuario(loginDTO.getEmailUsuario());

        // Verificar si el usuario existe y si las contraseñas coinciden
        if (usuario != null && passwordEncoder.matches(loginDTO.getContrasenaUsuario(), usuario.get().getContrasenaUsuario())) {
            return true;
        }

        return false;
    }
}
