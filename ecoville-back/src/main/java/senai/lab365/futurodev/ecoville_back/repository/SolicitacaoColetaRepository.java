package senai.lab365.futurodev.ecoville_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import java.util.List;

public interface SolicitacaoColetaRepository extends JpaRepository<SolicitacaoColeta, Integer> {
    List<SolicitacaoColeta> findByUsuarioResidencialId(Integer usuarioId);
    List<SolicitacaoColeta> findByStatus(StatusColeta status);
}