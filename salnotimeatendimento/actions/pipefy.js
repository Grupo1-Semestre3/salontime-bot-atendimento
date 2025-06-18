
  /**
   * @title Pipefy
   * @category Integração
   * @author Elerson
   * @param {string} nome - Nome do usuário
   * @param {string} email - E-mail do usuário
   * @param {string} telefone - Telefone do usuário
   */
  const enviarAgendamento = async () => {
    const axios = require('axios')

    const PIPE_ID = 306299956
    const PIPEFY_TOKEN =
      'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3NDkwNzExNzEsImp0aSI6ImNlMmFiMGE1LTYzNGQtNDllNi1hMWEzLTY3NTY5MTMyNDY2OCIsInN1YiI6MzA2NTcxNjQ3LCJ1c2VyIjp7ImlkIjozMDY1NzE2NDcsImVtYWlsIjoiZWxlcnNvbi5hbHZlc0BzcHRlY2guc2Nob29sIn19.Yg6HxZGSePYFAnsEK3RIjMwlhhVdreDlyZb4EhmmOPbBSQQvwHEs8BSKCLXKZUX-iV3q2dzDJ3yIeKiKd9ZQow'

    const { nome, email, telefone } = args

    const query = `
    mutation {
      createCard(input: {
        pipe_id: ${PIPE_ID},
        fields_attributes: [
          {field_id: "qual_o_seu_nome", field_value: ${JSON.stringify(nome)}},
          {field_id: "email", field_value: ${JSON.stringify(email)}},
          {field_id: "n_mero_de_telefone", field_value: ${JSON.stringify(telefone)}}
        ]
      }) {
        card {
          id
        }
      }
    }
  `

    try {
      const response = await axios.post(
        'https://api.pipefy.com/graphql',
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PIPEFY_TOKEN}`
          }
        }
      )

      bp.logger.info('Agendamento enviado com sucesso ao Pipefy:', response.data)
      return response.data
    } catch (err) {
      const errorMessage = err.response && err.response.data ? err.response.data : err.message
      bp.logger.error('Erro ao enviar agendamento ao Pipefy:', JSON.stringify(errorMessage))
      return { erro: true, mensagem: 'Erro ao enviar agendamento.' }
    }
  }

  return enviarAgendamento()