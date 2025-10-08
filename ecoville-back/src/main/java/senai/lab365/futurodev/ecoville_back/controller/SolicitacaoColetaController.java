package senai.lab365.futurodev.ecoville_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaCadastroDTO;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.service.SolicitacaoColetaService;

import java.util.List;

@RestController
@RequestMapping("/api/coletas")
public class SolicitacaoColetaController {

    private final SolicitacaoColetaService solicitacaoService;

    public SolicitacaoColetaController(SolicitacaoColetaService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @PostMapping
    public ResponseEntity<SolicitacaoColeta> criarSolicitacao(@RequestParam Integer usuarioId,
                                                              @RequestBody SolicitacaoColetaCadastroDTO dto) {
        return ResponseEntity.ok(solicitacaoService.criarSolicitacao(usuarioId, dto));
    }

    @GetMapping("/minhas")
    public ResponseEntity<List<SolicitacaoColeta>> listarMinhas(@RequestParam Long usuarioId) {
        return ResponseEntity.ok(solicitacaoService.listarMinhasSolicitacoes(usuarioId));
    }

    @PatchMapping("/{id}/aceitar")
    public ResponseEntity<SolicitacaoColeta> aceitar(@PathVariable Integer id,
                                                     @RequestParam Long coletorId) {
        return ResponseEntity.ok(solicitacaoService.aceitarSolicitacao(id, coletorId));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<SolicitacaoColeta> cancelar(@PathVariable Integer id) {
        return ResponseEntity.ok(solicitacaoService.cancelarSolicitacao(id));
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<SolicitacaoColeta> finalizar(@PathVariable Integer id) {
        return ResponseEntity.ok(solicitacaoService.finalizarSolicitacao(id));
    }

    @PatchMapping("/{id}/feedback")
    public ResponseEntity<SolicitacaoColeta> feedback(@PathVariable Integer id,
                                                      @RequestParam String feedback) {
        return ResponseEntity.ok(solicitacaoService.adicionarFeedback(id, feedback));
    }
}
