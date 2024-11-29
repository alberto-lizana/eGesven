package com.yoSolano.egesven.controller;

import com.yoSolano.egesven.DTO.LoginDTO;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping
public class LoginController {

    private final LoginService loginService;
    private final UsuarioRepository usuarioRepository;

    public LoginController(LoginService loginService, UsuarioRepository usuarioRepository) {
        this.loginService = loginService;
        this.usuarioRepository = usuarioRepository;
    }
    @GetMapping
    public String inicio() {
        return "inicio";
    }

    @GetMapping("/iniciarSesion")
    public String mostrarFormularioLogin(Model model) {
        model.addAttribute("login", new LoginDTO()); // Asegúrate de crear el objeto LoginDTO
        return "iniciarSesion"; // Este es el nombre de tu vista (iniciarSesion.html)
    }

    @PostMapping("/iniciarSesion")
    public String procesarLogin(@ModelAttribute("login") LoginDTO loginDTO, Model model) {
        // Lógica para procesar el login
        if (loginService.validarLogin(loginDTO)) {
            return "redirect:/"; // Redirigir a una página de inicio si el login es exitoso
        } else {
            model.addAttribute("error", "Credenciales inválidas");
            return "iniciarSesion";
        }
    }
}

