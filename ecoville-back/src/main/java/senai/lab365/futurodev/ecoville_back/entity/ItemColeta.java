package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import senai.lab365.futurodev.ecoville_back.enums.TipoMaterial;

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
    @JoinColumn(nullable = false, name = "solicitacao_id")
    private SolicitacaoColeta id_solicitacao;


}
