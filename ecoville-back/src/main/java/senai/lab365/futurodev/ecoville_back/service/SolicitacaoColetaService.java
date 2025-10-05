package senai.lab365.futurodev.ecoville_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaCadastroDTO;
import senai.lab365.futurodev.ecoville_back.entity.ItemColeta;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import senai.lab365.futurodev.ecoville_back.repository.SolicitacaoColetaRepository;
import senai.lab365.futurodev.ecoville_back.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.List;

// Arrumar error Long / Integer

@Service
public class SolicitacaoColetaService {

    @Autowired
    private SolicitacaoColetaRepository solicitacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public SolicitacaoColeta criarSolicitacao(Integer usuarioId, SolicitacaoColetaCadastroDTO dto) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();

        SolicitacaoColeta solicitacao = new SolicitacaoColeta();
        solicitacao.setUsuarioResidencial(Long.valueOf(usuario.getId()));
        solicitacao.setDataSolicitacao(LocalDateTime.now().toLocalDate());
        solicitacao.setDataAgendada(dto.getDataAgendada());
        solicitacao.setObservacoes(dto.getObservacoes());
        solicitacao.setStatus(StatusColeta.AGUARDANDO);

        List<ItemColeta> itens = dto.getItens().stream().map(i -> {
            ItemColeta item = new ItemColeta();
            item.setTipo(i.getTipo());
            item.setQuantidadeEstimadaKg(i.getQuantidadeEstimadaKg());
            item.setSolicitacaoColeta(solicitacao);
            return item;
        }).toList();

        solicitacao.setItems(itens);
        return solicitacaoRepository.save(solicitacao);
    }

    public List<SolicitacaoColeta> listarMinhasSolicitacoes(Long usuarioId) {
        return solicitacaoRepository.findByUsuarioResidencialId(Math.toIntExact(usuarioId));
    }

    public SolicitacaoColeta atualizarSolicitacao(Long id, SolicitacaoColetaCadastroDTO dto) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(Math.toIntExact(id)).orElseThrow();
        solicitacao.setDataAgendada(dto.getDataAgendada());
        solicitacao.setObservacoes(dto.getObservacoes());

        List<ItemColeta> itens = dto.getItens().stream().map(i -> {
            ItemColeta item = new ItemColeta();
            item.setTipo(i.getTipo());
            item.setQuantidadeEstimadaKg(i.getQuantidadeEstimadaKg());
            item.setSolicitacaoColeta(solicitacao);
            return item;
        }).toList();

        solicitacao.setItems(itens);
        return solicitacaoRepository.save(solicitacao);
    }

    public List<SolicitacaoColeta> listarDisponiveis() {
        return solicitacaoRepository.findByStatus(StatusColeta.AGUARDANDO);
    }

    public SolicitacaoColeta aceitarSolicitacao(Long id, Long coletorId) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(Math.toIntExact(id)).orElseThrow();
        Usuario coletor = usuarioRepository.findById(Math.toIntExact(coletorId)).orElseThrow();
        solicitacao.setColetor(Long.valueOf(coletor.getId()));
        solicitacao.setStatus(StatusColeta.ACEITA);
        return solicitacaoRepository.save(solicitacao);
    }

    public SolicitacaoColeta cancelarSolicitacao(Long id) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(Math.toIntExact(id)).orElseThrow();
        solicitacao.setStatus(StatusColeta.CANCELADA);
        return solicitacaoRepository.save(solicitacao);
    }

    public SolicitacaoColeta finalizarSolicitacao(Long id) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(Math.toIntExact(id)).orElseThrow();
        solicitacao.setStatus(StatusColeta.FINALIZADA);
        return solicitacaoRepository.save(solicitacao);
    }

    public SolicitacaoColeta adicionarFeedback(Long id, String feedback) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(Math.toIntExact(id)).orElseThrow();
        solicitacao.setFeedback(feedback);
        return solicitacaoRepository.save(solicitacao);
    }
}