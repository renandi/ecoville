package senai.lab365.futurodev.ecoville_back.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioResponseDto;
import senai.lab365.futurodev.ecoville_back.service.UsuarioService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    @PostMapping
    public UsuarioResponseDto create(@RequestBody UsuarioRequestDto dto) {
        return service.create(dto);
    }

}
