package com.yoSolano.egesven.repository;

import com.yoSolano.egesven.domain.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import com.yoSolano.egesven.domain.Usuario;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional <Usuario> findByEmailUsuario(String emailUsuario);
    boolean existsByEmailUsuario(String emailUsuario);
    boolean existsByCelUsuario(String celUsuario);

    List<Usuario> findByRol(Rol rol );
}
