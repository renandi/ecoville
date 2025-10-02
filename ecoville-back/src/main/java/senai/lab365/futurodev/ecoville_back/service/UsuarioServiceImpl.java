package senai.lab365.futurodev.ecoville_back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import senai.lab365.futurodev.ecoville_back.entity.Endereco;
import senai.lab365.futurodev.ecoville_back.mappers.UsuarioMapper;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.repository.EnderecoRepository;
import senai.lab365.futurodev.ecoville_back.repository.UsuarioRepository;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final EnderecoRepository enderecoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public UsuarioResponseDto create (UsuarioRequestDto usuarioDto) {

        Endereco endereco = enderecoRepository.save(usuarioDto.endereco());

        Usuario usuario = UsuarioMapper.toEntity(usuarioDto);

        return UsuarioMapper.toDto(usuarioRepository.save(usuario));

    }

}
