package com.kiosko.api.controllers;

import com.kiosko.api.services.AutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AdminController {

    private final AutoService authService;

    public AdminController(AutoService authService) {
        this.authService = authService;
    }

    // Simulación de login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String usuario,
                                        @RequestParam String password) {
        if (authService.esAdmin(usuario, password)) {
            return ResponseEntity.ok("Bienvenido al panel de administración");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Acceso restringido, solo admin.");
        }
    }

    // Ejemplo de endpoint solo para admins
    @GetMapping("/panel")
    public ResponseEntity<String> panel(@RequestParam String usuario,
                                        @RequestParam String password) {
        if (authService.esAdmin(usuario, password)) {
            return ResponseEntity.ok("Accediste al panel de administración");
        } else {
            throw new SecurityException("No tienes permisos para ver este recurso.");
        }
    }
}
