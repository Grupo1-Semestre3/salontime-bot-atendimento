const axios = require('axios')

/**
 * @title Cadastrar usuário
 * @category Integração
 * @author Seu_Nome
 * @param {string} nome - Nome do usuário
 * @param {string} email - E-mail do usuário
 * @param {string} telefone - Telefone do usuário
 * @param {string} senha - Senha do usuário
 */
const cadastrarUsuario = async () => {
  try {
    const nome = args.nome
    const email = args.email
    const telefone = args.telefone
    const senha = args.senha

    // Faz a requisição POST para cadastrar o usuário
    const { data } = await axios.post('http://localhost:8080/usuarios/cadastro', {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha
    })

    // Considera que o cadastro foi bem-sucedido se não lançou erro
    session.usuarioCadastrado = true
    session.dadosUsuario = data // salva os dados retornados

    return {
      cadastrado: true,
      usuario: data
    }
  } catch (err) {
    bp.logger.error('Erro ao cadastrar usuário:', err)

    session.usuarioCadastrado = false
    return {
      cadastrado: false,
      erro: err.message
    }
  }
}

return cadastrarUsuario()