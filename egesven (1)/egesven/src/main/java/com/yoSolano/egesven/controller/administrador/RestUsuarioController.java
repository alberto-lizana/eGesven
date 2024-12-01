package com.yoSolano.egesven.controller.administrador;

import com.yoSolano.egesven.domain.Rol;
import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.RolRepository;
import com.yoSolano.egesven.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/usuarios/")
public class RestUsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    public RestUsuarioController(UsuarioRepository usuarioRepository,
                                 RolRepository rolRepository) {

        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    @GetMapping("/{emailUsuario}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String emailUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findByEmailUsuario(emailUsuario);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario){
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        URI location = URI.create(String.format("/usuarios/%d", nuevoUsuario.getIdUsuario()));
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
