package com.kiosko.api.services;

import com.kiosko.api.objets.Admin;
import com.kiosko.api.services.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AutoService {

    private final AdminRepository adminRepository;

    public AutoService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean validarLogin(String usuario, String password) {
        Optional<Admin> admin = adminRepository.findByUsuarioAndPassword(usuario, password);
        return admin.isPresent();
    }
}
