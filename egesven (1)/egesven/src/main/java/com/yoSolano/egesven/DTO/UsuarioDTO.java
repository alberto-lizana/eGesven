package com.yoSolano.egesven.DTO;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    @NotEmpty(message = "El nombre de usuario es obligatorio")
    @NotNull(message = "El nombre de usuario es obligatorio")
    @Size(min = 3, max = 50, message = "El nombre de usuario debe tener entre 3 y 50 caracteres")
    private String nombreUsuario;

    @NotEmpty(message = "El celular es obligatorio")
    @NotNull(message = "El celular es obligatorio")
    @Pattern(regexp = "^\\+\\d{11}$", message = "El número de teléfono debe comenzar con '+' seguido de 11 dígitos.")
    private String celUsuario;

    @NotEmpty(message = "La dirección es obligatoria")
    @NotNull(message = "La dirección es obligatoria")
    private String direccionUsuario;

    @NotEmpty(message = "El email es obligatorio")
    @Email(message = "Debe proporcionar un email válido")
    @NotNull(message = "El correo electrónico es obligatorio")
    private String emailUsuario;

    @NotEmpty(message = "La contraseña es obligatoria")
    @NotNull(message = "La contraseña es obligatoria")
    private String contrasenaUsuario;

    private Integer idRol;
}

