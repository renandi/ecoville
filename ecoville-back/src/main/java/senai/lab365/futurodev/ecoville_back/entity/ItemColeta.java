package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.TipoMaterial;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ItemColeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private TipoMaterial tipo;

    @Column(nullable = false)
    private Double quantidadeEstimadaKg;

    @Column(nullable = false)
    private Double quantidadeValidadaKg;

    @ManyToOne
    @JoinColumn(nullable = false, name = "solicitacaoId")
    private SolicitacaoColeta idSolicitacao;


    public void setSolicitacaoColeta(SolicitacaoColeta solicitacao) {
    }
}
