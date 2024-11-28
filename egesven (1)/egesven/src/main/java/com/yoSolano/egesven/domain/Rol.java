package com.yoSolano.egesven.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rol")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor

public class Rol {

    @Id
    @Column(name = "idRol")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRol;

    @Column(nullable = false, unique = true, name = "nombreRol")
    private String nombreRol;

}
