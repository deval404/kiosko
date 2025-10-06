package com.kiosko.api.services;

import com.kiosko.api.objets.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsuarioAndPassword(String usuario, String password);
}