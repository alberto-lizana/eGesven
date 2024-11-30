package com.yoSolano.egesven.controller.auth;


import com.yoSolano.egesven.DTO.UsuarioDTO;
import com.yoSolano.egesven.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;

    public RegistroController(UsuarioService usuarioService,
                              PasswordEncoder passwordEncoder,
                              UsuarioRepository usuarioRepository) {

        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/registrar")
    public String mostrarFormulario(Model model) {
        model.addAttribute("usuario", new UsuarioDTO());
        return "registrar";

    }

    @PostMapping("/registrar")
    public String procesarFormulario(@Valid @ModelAttribute("usuario") UsuarioDTO usuario, BindingResult result) {
        // Verificar si el correo ya existe en la base de datos
        if (usuarioRepository.existsByEmailUsuario(usuario.getEmailUsuario())) {
            // Si el correo ya está registrado, agregamos un error al BindingResult
            result.rejectValue("emailUsuario", "error.usuario", "El correo electrónico ya está registrado.");
        }

        if(usuarioRepository.existsByCelUsuario(usuario.getCelUsuario()))
            result.rejectValue("celUsuario", "error.usuario", "El número de celular ya está registrado.");

        if (result.hasErrors()) {
            return "registrar";
        }

        String contrasenaEncriptada = passwordEncoder.encode(usuario.getContrasenaUsuario());
        usuario.setContrasenaUsuario(contrasenaEncriptada);

        usuarioService.crearUsuario(usuario);
        return "redirect:/auth/iniciarSesion";
    }
}