import { IBlingOrder, IPipedriveResponseDeal } from '@infra/interfaces'

const blingHelper = {
  buildOrdersFromDeals: (deals: IPipedriveResponseDeal[]): IBlingOrder[] => {
    const newOrders: IBlingOrder[] = deals.map((deal) => ({
      pedido: {
        cliente: {
          nome: deal.person_id.name,
        },
        itens: {
          item: [
            {
              codigo: String(deal.id),
              descricao: deal.title,
              qtde: 1,
              vlr_unit: deal.value,
            },
          ],
        },
      },
    }))

    return newOrders
  },
}

export { blingHelper }
