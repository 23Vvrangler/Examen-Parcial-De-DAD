package gwcl.com.ms_producto.entity;

import gwcl.com.ms_producto.dto.CategoriaDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String gwclNombre;
    private String gwclProducto;

    private Integer categoriaId;

    @Transient
    private CategoriaDto CategoriaDto
}