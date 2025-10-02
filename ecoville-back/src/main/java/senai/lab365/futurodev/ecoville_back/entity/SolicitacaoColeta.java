package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class SolicitacaoColeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private StatusColeta status = StatusColeta.AGUARDANDO;

    @Column(nullable = false)
    private LocalDateTime dataSolicitacao;

    @Column(nullable = false)
    private LocalDate dataAgendada;

    @Column(nullable = false, length = 500)
    private String observacoes;

    @Column(nullable = false, length = 500)
    private String feedback;

    @ManyToOne
    @JoinColumn(name = "usuarioResidencialId")
    private Usuario idUsuario;

    @ManyToOne
    @JoinColumn(name="coletorId")
    private Usuario idColetor;


}
