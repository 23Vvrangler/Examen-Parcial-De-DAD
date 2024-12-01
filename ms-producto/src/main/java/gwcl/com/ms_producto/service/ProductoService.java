package gwcl.com.ms_producto.service;

import gwcl.com.ms_producto.entity.Producto;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public interface ProductoService {
    List<Producto> lista();
    Producto guardar(Producto producto);
    Optional<Producto> buscarPorId(Integer id);
    Producto actualizar(Producto producto);
    void eleminar(Integer id);
}
