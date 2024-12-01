package gwcl.com.ms_categoria.service;


import gwcl.com.ms_categoria.entity.Categoria;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public interface CategoriaService {
    List<Categoria> lista();
    Categoria guardar(Categoria categoria);
    Optional<Categoria> buscarPorId(Integer id);
    Categoria actualizar(Categoria categoria);
    void eleminar(Integer id);
}
