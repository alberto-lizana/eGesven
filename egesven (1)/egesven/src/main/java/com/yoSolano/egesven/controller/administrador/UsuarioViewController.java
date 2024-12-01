package com.yoSolano.egesven.controller.administrador;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/administrador")
public class UsuarioViewController {

    @GetMapping
    public String gestionUsuario() {
        return "gestionUsuario"; // Renderiza "gestionUsuario.html"
    }

}
