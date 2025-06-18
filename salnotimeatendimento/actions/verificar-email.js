const axios = require('axios')

/**
 * @title Verificar e-mail no banco
 * @category Integração
 * @param {string} email - E-mail do usuário a ser verificado
 */
const verificarEmail = async () => {
  try {
    const email = args.email

    const { data } = await axios.get(`http://localhost:8080/usuarios/verificar-email/${email}`)

    // Verifica se retornou um usuário
    const existe = data != null

    // Armazena nas variáveis de sessão
    session.existeEmail = existe
    session.usuarioEncontrado = existe ? data : null

    return {
      existe,
      usuario: session.usuarioEncontrado
    }
  } catch (err) {
    bp.logger.error('Erro ao verificar e-mail:', err)

    // Em caso de erro, assume que o e-mail não existe
    session.existeEmail = false
    session.usuarioEncontrado = null

    return {
      existe: false,
      usuario: null
    }
  }
}

return verificarEmail()