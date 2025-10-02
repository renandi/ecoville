package senai.lab365.futurodev.ecoville_back.mappers;

import senai.lab365.futurodev.ecoville_back.dtos.UsuarioRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;

public class UsuarioMapper {

    public static UsuarioResponseDto toDto(Usuario usuario) {
        return new UsuarioResponseDto(
                usuario.getId(),
                usuario.getNome(),
                usuario.getNomeDeUsuario(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getPerfil(),
                usuario.getIdEndereco()
        );
    }

    public static Usuario toEntity (UsuarioRequestDto dto) {
        return new Usuario(
                dto.nome(),
                dto.nome_de_usuario(),
                dto.email(),
                dto.senha(),
                dto.perfil(),
                dto.idEndereco()
                );
    }
}
