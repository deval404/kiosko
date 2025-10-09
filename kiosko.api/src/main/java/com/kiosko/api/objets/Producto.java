package com.kiosko.api.objets;

import jakarta.persistence.*;

@Table(name = "Producto")
@Entity

public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_produ;

    private double precio;
    private int cantidad;

    @Column(columnDefinition = "TEXT")
    private String imagenURL;

    private String nombre;
    private Boolean conTacc;
    private Boolean alcoholicas;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    public long getId() {
        return id_produ;
    }
    public void setId(int id_produ) {
        this.id_produ = id_produ;
    }

    public double getPrecio() {
        return precio;
    }
    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCantidad() {
        return cantidad;
    }
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getImagenURL() {
        return imagenURL;
    }
    public void setImagenURL(String imagenURL) {
        this.imagenURL = imagenURL;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Categoria getCategoria() {
        return categoria;
    }
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Boolean getConTacc() {
        return conTacc;
    }
    public void setConTacc(Boolean conTacc) {
        this.conTacc = conTacc;
    }

    public Boolean getAlcoholicas() {
        return alcoholicas;
    }
    public void setAlcoholicas(Boolean alcoholicas) {
        this.alcoholicas = alcoholicas;
    }
}