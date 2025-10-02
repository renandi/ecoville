package senai.lab365.futurodev.ecoville_back.service;

import senai.lab365.futurodev.ecoville_back.dtos.UsuarioRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioResponseDto;

public interface UsuarioService {

    public UsuarioResponseDto create(UsuarioRequestDto dto);
}
