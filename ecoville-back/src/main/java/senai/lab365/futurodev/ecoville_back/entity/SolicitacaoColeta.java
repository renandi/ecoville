package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SolicitacaoColeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idUsuario;  // Usuário Residencial
    private Long idColetor;  // Coletor que aceita a coleta

    private LocalDate dataSolicitacao;
    private LocalDate dataAgendada;

    private String observacoes;

    @Enumerated(EnumType.STRING)
    private StatusColeta status = StatusColeta.AGUARDANDO;

    @Column(nullable = true)
    private String feedback;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "solicitacao_id")
    private List<ItemColeta> items;

    // Métodos auxiliares

    public void setUsuarioResidencial(Long usuarioId) {
        this.idUsuario = usuarioId;
    }

    public void setColetor(Long coletorId) {
        this.idColetor = coletorId;
    }

    public void setItems(List<ItemColeta> items) {
        this.items = items;
    }

    public void adicionarFeedback(String feedback) {
        this.feedback = feedback;
    }

    public void aceitar(Long coletorId) {
        this.idColetor = coletorId;
        this.status = StatusColeta.ACEITA;
    }

    public void cancelar() {
        this.status = StatusColeta.CANCELADA;
    }

    public void finalizar() {
        this.status = StatusColeta.FINALIZADA;
    }
}