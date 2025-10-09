package senai.lab365.futurodev.ecoville_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import senai.lab365.futurodev.ecoville_back.entity.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {
}
