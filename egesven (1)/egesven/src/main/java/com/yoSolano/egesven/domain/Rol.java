package com.yoSolano.egesven.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rol")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor


public class Rol {

    @Id
    @Column(name = "idRol")
    private Integer idRol;

    @Column(nullable = false, unique = true, name = "nombre_rol")
    private String nombreRol;

}
