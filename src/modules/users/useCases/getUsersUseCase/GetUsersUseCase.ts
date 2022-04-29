import { GetUsersMockApiData } from '@/utils/GetUsersMockApiData'
import { injectable } from 'tsyringe'
import { InvalidRequestError } from '../../errors/InvalidRequestError'

import { GetUserAddressUseCase } from '../getUserAddressUseCase/GetUserAddressUseCase'

@injectable()
class GetUsersUseCase {
  constructor (private readonly getUsersMockApiData: GetUsersMockApiData, private readonly getUserAddress: GetUserAddressUseCase) {}

  async execute (): Promise<any> {
    try {
      const users = await this.getUsersMockApiData.getUsersData()

      return users
    } catch (e: any) {
      throw new InvalidRequestError('Requisição inválida')
    }
  }
}

export { GetUsersUseCase }
