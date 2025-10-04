package senai.lab365.futurodev.ecoville_back.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaCadastroDTO;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.service.SolicitacaoColetaService;

import java.util.List;

@RestController
@RequestMapping("/api/coletas")
@RequiredArgsConstructor
public class SolicitacaoColetaController {

    private final SolicitacaoColetaService solicitacaoService;

    // Criar nova solicitação
    @PostMapping
    public ResponseEntity<SolicitacaoColeta> criarSolicitacao(@RequestParam Long usuarioId,
                                                              @RequestBody SolicitacaoColetaCadastroDTO dto) {
        SolicitacaoColeta created = solicitacaoService.criarSolicitacao(usuarioId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Listar minhas solicitações
    @GetMapping("/minhas")
    public ResponseEntity<List<SolicitacaoColeta>> listarMinhas(@RequestParam Long usuarioId) {
        return ResponseEntity.ok(solicitacaoService.listarMinhasSolicitacoes(usuarioId));
    }

    // Atualizar solicitação
    @PutMapping("/minhas/{id}")
    public ResponseEntity<SolicitacaoColeta> atualizarSolicitacao(@PathVariable Long id,
                                                                  @RequestBody SolicitacaoColetaCadastroDTO dto) {
        SolicitacaoColeta updated = solicitacaoService.atualizarSolicitacao(id, dto);
        return ResponseEntity.ok(updated);
    }

    // Listar coletas disponíveis
    @GetMapping("/disponiveis")
    public ResponseEntity<List<SolicitacaoColeta>> listarDisponiveis() {
        return ResponseEntity.ok(solicitacaoService.listarDisponiveis());
    }

    // Aceitar coleta
    @PatchMapping("/{id}/aceitar")
    public ResponseEntity<SolicitacaoColeta> aceitarSolicitacao(@PathVariable Long id, @RequestParam Long coletorId) {
        SolicitacaoColeta accepted = solicitacaoService.aceitarSolicitacao(id, coletorId);
        return ResponseEntity.ok(accepted);
    }

    // Cancelar coleta
    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<SolicitacaoColeta> cancelarSolicitacao(@PathVariable Long id) {
        SolicitacaoColeta canceled = solicitacaoService.cancelarSolicitacao(id);
        return ResponseEntity.ok(canceled);
    }

    // Finalizar coleta
    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<SolicitacaoColeta> finalizarSolicitacao(@PathVariable Long id) {
        SolicitacaoColeta finished = solicitacaoService.finalizarSolicitacao(id);
        return ResponseEntity.ok(finished);
    }

    // Adicionar feedback
    @PatchMapping("/{id}/feedback")
    public ResponseEntity<SolicitacaoColeta> adicionarFeedback(@PathVariable Long id, @RequestBody String feedback) {
        SolicitacaoColeta withFeedback = solicitacaoService.adicionarFeedback(id, feedback);
        return ResponseEntity.ok(withFeedback);
    }
}