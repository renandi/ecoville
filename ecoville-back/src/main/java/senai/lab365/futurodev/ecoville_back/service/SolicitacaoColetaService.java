package senai.lab365.futurodev.ecoville_back.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaCadastroDTO;
import senai.lab365.futurodev.ecoville_back.entity.ItemColeta;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import senai.lab365.futurodev.ecoville_back.repository.SolicitacaoColetaRepository;
import senai.lab365.futurodev.ecoville_back.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class SolicitacaoColetaService {

    private final SolicitacaoColetaRepository solicitacaoRepository;
    private final UsuarioRepository usuarioRepository;

    public SolicitacaoColetaService(SolicitacaoColetaRepository solicitacaoRepository,
                                    UsuarioRepository usuarioRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public SolicitacaoColeta criarSolicitacao(Integer usuarioId, SolicitacaoColetaCadastroDTO dto) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        SolicitacaoColeta solicitacao = new SolicitacaoColeta();
        solicitacao.setUsuarioResidencial(usuario.getId().longValue());
        solicitacao.setDataSolicitacao(LocalDate.now());
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
        return solicitacaoRepository.findByIdUsuario(usuarioId);
    }

    @Transactional
    public SolicitacaoColeta aceitarSolicitacao(Integer idSolicitacao, Long coletorId) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.aceitar(coletorId);
        return solicitacaoRepository.save(solicitacao);
    }

    @Transactional
    public SolicitacaoColeta cancelarSolicitacao(Integer idSolicitacao) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.cancelar();
        return solicitacaoRepository.save(solicitacao);
    }

    @Transactional
    public SolicitacaoColeta finalizarSolicitacao(Integer idSolicitacao) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.finalizar();
        return solicitacaoRepository.save(solicitacao);
    }

    @Transactional
    public SolicitacaoColeta adicionarFeedback(Integer idSolicitacao, String feedback) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.adicionarFeedback(feedback);
        return solicitacaoRepository.save(solicitacao);
    }
}
