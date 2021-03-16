const axios = require('axios')

let data = ''

function searchCep(cep) {
    return axios.get(`http://brasilapi.com.br//api/cep/v1/${cep}`)
            .then((response) => { return response.data })
            .catch((error) => { return error })
}

module.exports = searchCep