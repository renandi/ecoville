package senai.lab365.futurodev.ecoville_back.mappers;

import senai.lab365.futurodev.ecoville_back.dtos.EnderecoRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.EnderecoResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.Endereco;

public class EnderecoMapper {

    public static Endereco toEntity(EnderecoRequestDto dto) {
        return new Endereco(
                dto.cep(),
                dto.logradouro(),
                dto.estado(),
                dto.cidade(),
                dto.bairro(),
                dto.numero(),
                dto.complemento(),
                dto.latitude(),
                dto.longitude()
        );
    }

    public static EnderecoResponseDto toDto(Endereco endereco) {
        return new EnderecoResponseDto(
                endereco.getId(),
                endereco.getCep(),
                endereco.getLogradouro(),
                endereco.getEstado(),
                endereco.getCidade(),
                endereco.getBairro(),
                endereco.getNumero(),
                endereco.getComplemento(),
                endereco.getLatitude(),
                endereco.getLongitude()
        );
    }
}
