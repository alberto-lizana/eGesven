package com.yoSolano.egesven.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column(nullable = false, name = "nombre_usuario")
    private String nombreUsuario;

    @Column(nullable = false, unique = true, name = "cel_usuario")
    private String celUsuario;

    @Column(nullable = false, name = "direccion_usuario")
    private String direccionUsuario;

    @Column(nullable = false, unique = true, name = "email_usuario")
    private String emailUsuario;

    @Column(nullable = false, name = "contrasena_usuario")
    private String contrasenaUsuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rol", referencedColumnName = "idRol", nullable = false)
    private Rol rol;


}
