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
    public ResponseEntity<?> createRol(@RequestBody String nombreRol) {
        if (nombreRol == null || nombreRol.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre del rol no puede estar vacío.");
        }

        boolean exists = rolRepository.existsByNombreRol(nombreRol);
        if (exists) {
            return ResponseEntity.badRequest().body("El rol ya existe.");
        }

        Rol nuevoRol = new Rol();
        nuevoRol.setNombreRol(nombreRol);
        Rol savedRol = rolRepository.save(nuevoRol);

        URI location = URI.create(String.format("/api/roles/%d", savedRol.getIdRol()));
        return ResponseEntity.created(location).body(savedRol);
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
