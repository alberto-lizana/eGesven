package com.yoSolano.egesven.repository;

import com.yoSolano.egesven.domain.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    boolean existsByNombreRol(String nombreRol);
}
