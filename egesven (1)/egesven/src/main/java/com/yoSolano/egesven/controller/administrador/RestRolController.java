package com.yoSolano.egesven.controller.administrador;

import com.yoSolano.egesven.domain.Rol;
import com.yoSolano.egesven.repository.RolRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collections;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/roles")
public class RestRolController {

    private RolRepository rolRepository;

    public RestRolController(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @GetMapping
    public ResponseEntity<List<Rol>> getRoles() {
        try {
            List<Rol> roles = rolRepository.findAll();
            if (roles.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(roles);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @GetMapping("/{idRol}")
    public ResponseEntity<Rol> getRol(@PathVariable Integer idRol){
        return rolRepository.findById(idRol)
                .map(rol -> ResponseEntity.ok(rol))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Rol> createRol(@RequestBody Rol rol) {
        Rol nuevoRol = rolRepository.save(rol);
        URI location = URI.create(String.format("/roles/%d", nuevoRol.getIdRol()));
        return ResponseEntity.created(location).body(nuevoRol);
    }

    @PutMapping("/{idRol}")
    public ResponseEntity<Rol> updateRol(@PathVariable Integer idRol, @RequestBody Rol rol) {
        if(!rolRepository.existsById(idRol)){
            return ResponseEntity.notFound().build();
        }
        rol.setIdRol(idRol);
        Rol updatedRol = rolRepository.save(rol);
        return ResponseEntity.ok(updatedRol);
    }

    @DeleteMapping("/{idRol}")
    public ResponseEntity<Void> deleteRol(@PathVariable Integer idRol) {
        if(!rolRepository.existsById(idRol)) {
            return ResponseEntity.notFound().build();
        }
        rolRepository.deleteById(idRol);
        return ResponseEntity.noContent().build();
    }
}
