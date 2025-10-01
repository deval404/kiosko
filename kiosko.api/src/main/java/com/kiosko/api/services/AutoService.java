package com.kiosko.api.services;

public class AutoService {
    public boolean esAdmin(String usuario, String password) {
        //  Aquí ponés la lógica real (ej: consultar DB, hash de password, etc.)
        return "admin".equals(usuario) && "3646".equals(password);
    }
}
