package com.yoSolano.egesven.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRol")
    private Integer idRol;

    @NotNull(message = "El nombre del rol no puede ser nulo")
    @NotEmpty(message = "El nombre del rol no puede estar vacío")
    @Column(nullable = false, unique = true, name = "nombre_rol")
    private String nombreRol;

}
