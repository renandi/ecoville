package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String logradouro;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false, length = 100)
    private String cidade;

    @Column(nullable = false, length = 100)
    private String bairro;

    @Column(nullable = false, length = 10)
    private String numero;

    @Column(nullable = true, length = 100)
    private String complemento;

    @Column(nullable = false, precision = 5)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 5)
    private BigDecimal longitude;

}
