package com.yoSolano.egesven.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    private String nombreUsuario;
    private String celUsuario;
    private String direccionUsuario;
    private String contrasenaUsuario;

    @ManyToOne
    @JoinColumn(name = "idRol", nullable = false)
    private Rol rol;

}
