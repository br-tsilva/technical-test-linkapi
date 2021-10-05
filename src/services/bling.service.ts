import axios from 'axios'
import { IBlingOrder, IBlingCreateOrderResponse } from '@src/adapters'
import { convertObjectToXml } from '@src/utils'

const { BLING_API_HOST = '', BLING_API_TOKEN = '' } = process.env

const blingRest = {
  createOrder: (
    partialOrder: IBlingOrder,
  ): Promise<IBlingCreateOrderResponse> => {
    const encodedParamaters = new URLSearchParams()
    const orderParsedXml = convertObjectToXml(partialOrder)

    encodedParamaters.append('apikey', BLING_API_TOKEN)
    encodedParamaters.append('xml', orderParsedXml)

    return axios
      .post(`${BLING_API_HOST}/v2/pedido/json?${encodedParamaters}`)
      .then(({ data }) => data)
      .catch(({ response }) => response.data)
  },
}

export { blingRest }
