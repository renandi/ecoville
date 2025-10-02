package senai.lab365.futurodev.ecoville_back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import senai.lab365.futurodev.ecoville_back.mappers.UsuarioMapper;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.repository.UsuarioRepository;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository repository;

    @Override
    public UsuarioResponseDto create (UsuarioRequestDto dto) {
        Usuario usuario = UsuarioMapper.toEntity(dto);

        return UsuarioMapper.toDto(repository.save(usuario));

    }

}
