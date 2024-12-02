package com.yoSolano.egesven.service;

import com.yoSolano.egesven.DTO.UsuarioDTO;
import com.yoSolano.egesven.domain.Usuario;
import org.springframework.stereotype.Service;

@Service
public interface RestRegistroUsuarioService {
    Usuario crearUsuario(UsuarioDTO usuarioDTO);
}
