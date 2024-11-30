package com.yoSolano.egesven.controller;


import com.yoSolano.egesven.DTO.UsuarioDTO;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.yoSolano.egesven.service.UsuarioService;

@Controller
@RequestMapping("/auth")
public class RegistroController {

    private final UsuarioService usuarioService;

    public RegistroController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/registrar")
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new UsuarioDTO());
        return "registrar";

    }

    @PostMapping("/registrar")
    public String procesarFormulario(@Valid @ModelAttribute("usuario") UsuarioDTO usuario, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "registrar";
        }

        usuarioService.crearUsuario(usuario);
        return "redirect:/auth/iniciarSesion";
    }
}