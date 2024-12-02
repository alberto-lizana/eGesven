package com.yoSolano.egesven.controller.administrador;

import com.yoSolano.egesven.DTO.UsuarioDTO;
import com.yoSolano.egesven.domain.Rol;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.RolRepository;
import com.yoSolano.egesven.repository.UsuarioRepository;
import com.yoSolano.egesven.service.RestRegistroUsuarioService;
import com.yoSolano.egesven.service.UsuarioService;
import jakarta.validation.Valid;
import jdk.jfr.ContentType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/usuarios")
public class RestUsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final RestRegistroUsuarioService restRegistroUsuarioService;

    public RestUsuarioController(UsuarioRepository usuarioRepository,
                                 RolRepository rolRepository,
                                 PasswordEncoder passwordEncoder,
                                 RestRegistroUsuarioService restRegistroUsuarioService) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.restRegistroUsuarioService = restRegistroUsuarioService;
    }


    @GetMapping("/{emailUsuario}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String emailUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findByEmailUsuario(emailUsuario);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Usuario>> getTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if (usuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(usuarios);
    }


    @PostMapping
    public ResponseEntity<?> createUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO, UriComponentsBuilder uriComponentsBuilder) {
        if (usuarioRepository.existsByEmailUsuario(usuarioDTO.getEmailUsuario())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email ya registrado"));
        }

        if (usuarioRepository.existsByCelUsuario(usuarioDTO.getCelUsuario())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Número ya registrado"));
        }

        Usuario nuevoUsuario = restRegistroUsuarioService.crearUsuario(usuarioDTO);

        URI location = uriComponentsBuilder.path("/api/usuarios/{id}").buildAndExpand(nuevoUsuario.getIdUsuario()).toUri();

        return ResponseEntity.created(location).body(nuevoUsuario);
    }


    @PutMapping("{idUsuario}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long idUsuario, @RequestBody Usuario usuario) {
        if (!usuarioRepository.existsById(idUsuario)) {
            return ResponseEntity.notFound().build();
        }
        usuario.setIdUsuario(idUsuario);
        Usuario updatedUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.ok(updatedUsuario);
    }

    @DeleteMapping("{idUsuario}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long idUsuario) {
        if (!usuarioRepository.existsById(idUsuario)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(idUsuario);
        return ResponseEntity.noContent().build();
    }
}
