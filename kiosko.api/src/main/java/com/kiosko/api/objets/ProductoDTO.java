package com.kiosko.api.objets;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500") // O simplemente "*" para todos los orígenes durante el desarrollo
@RequestMapping("/productos")
public class ProductoDTO {
        private String nombre;
        private Double precio;
        private String imagenUrl;
        private Categoria categoria;
        private Boolean conTacc;
        private Boolean alcoholicas;


        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }

        public Double getPrecio() { return precio; }
        public void setPrecio(Double precio) { this.precio = precio; }

        public String getImagenUrl() { return imagenUrl; }
        public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

        public Categoria getCategoria() { return categoria; }
        public void setCategoria(Categoria categoria) { this.categoria = categoria; }

        public Boolean getconTacc() {
                return conTacc;
        }
        public void setconTacc(Boolean conTacc) {
                this.conTacc = conTacc;
        }

        public Boolean getAlcoholicas() {
        return alcoholicas;
    }
        public void setAlcoholicas(Boolean alcoholicas) {
        this.alcoholicas = alcoholicas;
    }
}
