export enum BlingCustomerCustomerType {
  FISICA = 'F',
  JURIDICA = 'J',
}

export enum BlingCustomerCustomerContribution {
  ICMS = '1',
  ISENTO_ICMS = '2',
  NAO_CONTRIBUINTE = '9',
}

export interface IBlingCustomer {
  id?: number
  nome: string
  tipoPessoa?: BlingCustomerCustomerType
  cpf_cnpj?: string
  ie?: string
  rg?: string
  contribuinte?: BlingCustomerCustomerContribution
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cep?: string
  cidade?: string
  uf?: string
  fone?: string
  celular?: string
  email?: string
}

export interface IBlingTransport {
  transportadora?: string
  tipo_frete?: string
  servico_correios?: string
  codigo_cotacao?: string
  peso_bruto?: number
  qtde_volumes?: number
  dados_etiqueta?: {
    nome?: string
    endereco?: string
    numero?: string
    complemento?: string
    municipio?: string
    uf?: string
    cep?: string
    bairro?: string
  }
  volumes?: {
    volume: {
      servico: string
      codigoRastreamento?: string
    }[]
  }
}

export interface IBlingOrderItems {
  item: {
    codigo: string
    descricao: string
    un?: string
    qtde: number
    vlr_unit: number
    vlr_desconto?: number
  }[]
}

export interface IBlingOrderInstallments {
  dias?: number
  data?: Date
  vlr: number
  obs?: string
  forma_pagamento?: {
    id?: number
  }
}

export interface IBlingOrderIntermediary {
  cnpj?: string
  nomeUsuario?: string
  cnpjInstituicaoPagamento?: string
}

export interface IBlingOrder {
  pedido: {
    data?: Date
    data_saida?: Date
    data_prevista?: Date
    numero?: string
    numero_loja?: string
    loja?: number
    nat_operacao?: string
    vendedor?: string
    cliente: IBlingCustomer
    transporte?: IBlingTransport
    itens: IBlingOrderItems
    idFormaPagamento?: number
    parcelas?: IBlingOrderInstallments[]
    vlr_frete?: number
    vlr_desconto?: string
    obs?: string
    obs_internas?: string
    numeroOrdemCompra?: string
    outrasDespesas?: number
    intermediador?: IBlingOrderIntermediary
  }
}

export interface IBlingResponseOrder {
  pedido: {
    numero: string
    idPedido: number
    codigos_rastreamento: {
      codigo_rastreamento: string
    }
    volumes: [
      {
        volume: {
          servico: string
          codigoRastreamento: string
        }
      }[],
    ]
  }
}

export interface IBlingResponseError {
  erro: Record<string, unknown>
}

export interface IBlingCreateOrderResponse {
  retorno: {
    pedidos: Array<IBlingResponseOrder>
    erros: Array<IBlingResponseError>
  }
}
