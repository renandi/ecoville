package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.EstadoMaterial;
import senai.lab365.futurodev.ecoville_back.enums.TipoMaterial;

import java.math.BigDecimal;

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
    private BigDecimal quantidadeEstimadaKg;

    @Column(nullable = false)
    private BigDecimal quantidadeValidadaKg;

    @Enumerated(EnumType.STRING)
    private EstadoMaterial estado;

    @ManyToOne
    @JoinColumn(nullable = false, name = "solicitacaoId")
    private SolicitacaoColeta solicitacaoColeta;

}
