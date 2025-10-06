package com.kiosko.api.controllers;

import com.kiosko.api.services.AutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Permite acceso desde tu HTML
public class AdminController {

    private final AutoService authService;

    public AdminController(AutoService authService) {
        this.authService = authService;
    }

    //  Login de administrador
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String usuario,
                                        @RequestParam String password) {
        if (authService.validarLogin(usuario, password)) {
            return ResponseEntity.ok("Bienvenido al panel de administración");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales inválidas. Acceso restringido.");
        }
    }

    // Endpoint de prueba (solo admins)
    @GetMapping("/panel")
    public ResponseEntity<String> panel(@RequestParam String usuario,
                                        @RequestParam String password) {
        if (authService.validarLogin(usuario, password)) {
            return ResponseEntity.ok("Accediste al panel de administración");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No tienes permisos para acceder a este recurso.");
        }
    }
}
