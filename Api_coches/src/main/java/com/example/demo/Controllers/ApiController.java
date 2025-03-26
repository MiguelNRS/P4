package com.example.demo.Controllers;

import com.example.demo.Modelo.Coche;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/coches")
public class ApiController {
    private List<Coche> coches = new ArrayList<>();
    private int idCounter = 1;

    @PostMapping
    public Coche crearCoche(@RequestBody Coche coche) {
        coche.setId(idCounter++);
        coches.add(coche);
        return coche;
    }

    @GetMapping
    public List<Coche> obtenerCoches() {
        return coches;
    }

    @GetMapping("/{id}")
    public Coche obtenerCoche(@PathVariable int id) {
        for (Coche coche : coches) {
            if (coche.getId() == id) {
                return coche;
            }
        }
        return null;
    }

    @PutMapping("/{id}")
    public Coche actualizarCoche(@PathVariable int id, @RequestBody Coche cocheActualizado) {
        for (Coche coche : coches) {
            if (coche.getId() == id) {
                coche.setMarca(cocheActualizado.getMarca());
                coche.setModelo(cocheActualizado.getModelo());
                coche.setAño(cocheActualizado.getAño());
                return coche;
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String borrarCoche(@PathVariable int id) {
        boolean eliminado = coches.removeIf(coche -> coche.getId() == id);
        if(eliminado){
            return "Coche eliminado";
        }else{return "Coche no encontrado";}
    }
}

