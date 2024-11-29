package com.yoSolano.egesven.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yoSolano.egesven.domain.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmailUsuario(String emailUsuario);

}
