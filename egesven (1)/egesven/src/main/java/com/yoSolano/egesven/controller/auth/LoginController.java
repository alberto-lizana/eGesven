package com.yoSolano.egesven.controller.auth;

import com.yoSolano.egesven.DTO.LoginDTO;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
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
        model.addAttribute("login", new LoginDTO());
        return "iniciarSesion";
    }

    @PostMapping("/iniciarSesion")
    public String procesarLogin(@ModelAttribute("login") LoginDTO loginDTO, Model model) {
        if (loginService.validarLogin(loginDTO)) {
            return "redirect:/auth";
        } else {
            model.addAttribute("error", "Credenciales inválidas");
            return "iniciarSesion";
        }
    }
}

