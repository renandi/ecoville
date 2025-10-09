package senai.lab365.futurodev.ecoville_back.service;

import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;

import java.util.List;

public interface SolicitacaoColetaService {

    public SolicitacaoColetaResponseDto criarSolicitacao(Integer usuarioId, SolicitacaoColetaRequestDto dto);

    public List<SolicitacaoColeta> listarMinhasSolicitacoes(Long usuarioId);

    public SolicitacaoColeta aceitarSolicitacao(Integer idSolicitacao, Integer coletorId);

    public SolicitacaoColeta cancelarSolicitacao(Integer idSolicitacao);

    public SolicitacaoColeta finalizarSolicitacao(Integer idSolicitacao);

    public SolicitacaoColeta adicionarFeedback(Integer idSolicitacao, String feedback) ;
}
