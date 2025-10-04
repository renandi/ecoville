package senai.lab365.futurodev.ecoville_back.dtos;

import lombok.Getter;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.EstadoMaterial;
import senai.lab365.futurodev.ecoville_back.enums.TipoMaterial;
import java.math.BigDecimal;

@Getter
@Setter
public class ItemColetaDTO {
    private TipoMaterial tipo;
    private BigDecimal quantidadeEstimadaKg;
    private BigDecimal quantidadeValidadaKg;
    private EstadoMaterial estado;
}