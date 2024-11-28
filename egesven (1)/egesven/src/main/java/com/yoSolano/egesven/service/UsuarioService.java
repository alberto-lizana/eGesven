package com.yoSolano.egesven.service;

import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.DTO.UsuarioDTO;
import org.springframework.stereotype.Service;

@Service
public interface UsuarioService {
    Usuario crearUsuario(UsuarioDTO usuarioDTO);
}