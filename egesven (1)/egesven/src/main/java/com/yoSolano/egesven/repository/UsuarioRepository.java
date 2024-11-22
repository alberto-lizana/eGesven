package com.yoSolano.egesven.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yoSolano.egesven.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
