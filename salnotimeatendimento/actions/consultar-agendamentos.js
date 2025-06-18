const axios = require('axios')

/**
 * @title Buscar próximo agendamento do usuário
 * @category Integração
 * @author Seu_Nome
 * @param {number} id - ID do usuário
 */
const buscarProximoAgendamento = async () => {
  try {
    const id = args.id

    // Requisição GET ao endpoint com ID no path
    const { data } = await axios.get(`http://localhost:8080/agendamento/proximo-usuario/${id}`)

    session.proximoAgendamento = data

    return {
      sucesso: true,
      agendamento: data
    }
  } catch (err) {
    bp.logger.error('Erro ao buscar próximo agendamento:', err)

    session.proximoAgendamento = null
    return {
      sucesso: false,
      erro: err.message
    }
  }
}

return buscarProximoAgendamento()