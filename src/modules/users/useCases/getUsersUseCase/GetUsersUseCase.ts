
import { FormatedUser } from '@/types/FormatedUserType'
import { BuildFormatedResult } from '@/utils/BuildFormatedResult'
import { GetUsersMockApiData } from '@/utils/GetUsersMockApiData'
import { validatePageParameter } from '@/utils/ValidatePageParameter'

import { injectable } from 'tsyringe'
import { InvalidParamError } from '../../errors/InvalidParamError'
import { InvalidRequestError } from '../../errors/InvalidRequestError'

import { GetUserAddressUseCase } from '../getUserAddressUseCase/GetUserAddressUseCase'
import { GetUserContactsUseCase } from '../getUserContactsUseCase/GetUseContactsUseCase'

@injectable()
class GetUsersUseCase {
  constructor (
    private readonly getUsersMockApiData: GetUsersMockApiData,
    private readonly getUserAddress: GetUserAddressUseCase,
    private readonly getUserContacts: GetUserContactsUseCase
  ) {}

  async execute (page?: string, limit?: string, sortBy?: string, order?: string): Promise<FormatedUser[]> {
    try {
      if (page !== undefined && !validatePageParameter(page)) {
        throw new InvalidParamError('O parametro page só aceita números', 400)
      }

      if (limit !== undefined && Number(limit) > 15) {
        throw new InvalidParamError('O limite máximo por busca é de 15 registros', 400)
      }

      if (sortBy !== undefined && sortBy?.toLowerCase() === 'avatar') {
        throw new InvalidParamError('Não é possível ordenar pelo campo avatar', 400)
      }

      if (sortBy !== undefined && sortBy.toLowerCase() !== 'desc') {
        throw new InvalidParamError('as opções disponíveis para ordem dos dados são asc e desc', 400)
      }

      const users = await this.getUsersMockApiData.getUsersData(page, limit, sortBy, order)

      const addresses = await this.getUserAddress.execute(users)
      const contacts = await this.getUserContacts.execute(users)

      const formatedData = users.map((user) => {
        const address = addresses.filter((address) => address.userId === user.id)
        const contact = contacts.filter((contact) => contact.userId === user.id)

        return BuildFormatedResult(user, address, contact)
      })

      return formatedData
    } catch (e: any) {
      throw new InvalidRequestError(`Erro ao buscar os dados dos usuários, ${e}`, e.statusCode)
    }
  }
}

export { GetUsersUseCase }
