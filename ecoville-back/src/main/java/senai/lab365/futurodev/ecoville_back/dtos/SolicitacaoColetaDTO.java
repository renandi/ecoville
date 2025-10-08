package senai.lab365.futurodev.ecoville_back.dto;

import lombok.Getter;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.dtos.ItemColetaDTO;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class SolicitacaoColetaDTO {
    private Long id;
    private StatusColeta status;
    private LocalDateTime dataSolicitacao;
    private LocalDate dataAgendada;
    private String observacoes;
    private String feedback;
    private List<ItemColetaDTO> itens;
}
