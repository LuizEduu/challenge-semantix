
import { FormatedUser } from '@/types/FormatedUserType'
import { BuildFormatedResult } from '@/utils/BuildFormatedResult'
import { GetUsersMockApiData } from '@/utils/GetUsersMockApiData'

import { injectable } from 'tsyringe'
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
      throw new InvalidRequestError(`Requisição inválida ${e}`, 400)
    }
  }
}

export { GetUsersUseCase }
