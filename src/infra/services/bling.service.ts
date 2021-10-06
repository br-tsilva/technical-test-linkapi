import axios from 'axios'
import { IBlingOrder, IBlingCreateOrderResponse } from '@infra/interfaces'
import { constants } from '@app/constants'
import { convertObjectToXml } from '@app/utils'

const {
  bling: { host, apiToken },
} = constants

const blingRest = {
  createOrder: (partialOrder: IBlingOrder): Promise<IBlingCreateOrderResponse> => {
    const encodedParamaters = new URLSearchParams()
    const orderParsedXml = convertObjectToXml(partialOrder)

    encodedParamaters.append('apikey', apiToken)
    encodedParamaters.append('xml', orderParsedXml)

    return axios
      .post(`${host}/v2/pedido/json?${encodedParamaters}`)
      .then(({ data }) => data)
      .catch(({ response }) => response.data)
  },
}

export { blingRest }
