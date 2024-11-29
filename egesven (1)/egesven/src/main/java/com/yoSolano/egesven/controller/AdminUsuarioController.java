package com.yoSolano.egesven.controller;

import com.yoSolano.egesven.domain.Usuario;
import com.yoSolano.egesven.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;


@RestController
@RequestMapping("/api/usuarios")
public class AdminUsuarioController {

    private final UsuarioRepository usuarioRepository;

    public AdminUsuarioController (UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
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
