package com.kiosko.api.controllers;

import com.kiosko.api.services.AutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AutoController {

    private final AutoService autoService;

    public AutoController(AutoService autoService) {
        this.autoService = autoService;
    }

    //@PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String usuario, @RequestParam String password) {
        boolean valido = autoService.validarLogin(usuario, password);
        if (valido) {
            return ResponseEntity.ok("Acceso concedido");
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
}
