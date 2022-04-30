import { Address } from '@/types/AddressType'
import { User } from '@/types/UserType'
import { GetUserAddressMockApiData } from '@/utils/GetUserAddressMockApiData'
import { injectable } from 'tsyringe'
import { InvalidRequestError } from '../../errors/InvalidRequestError'

@injectable()
class GetUserAddressUseCase {
  constructor (
    private readonly getUserAddressMockApiData: GetUserAddressMockApiData
  ) {}

  async execute (users: User[]): Promise<Address[]> {
    try {
      const address = await this.getUserAddressMockApiData.getUserAddressData(
        users
      )

      return address.flat(1).map((address) => {
        return {
          addressId: address.id as string,
          address: `${address.street} ${address.number}`,
          country: address.country,
          city: address.city,
          state: address.state,
          zipcode: address.zipcode,
          userId: address.userId
        }
      })
    } catch (e: any) {
      throw new InvalidRequestError(
        `Erro ao buscar os endereços dos usuários ${e}`
      )
    }
  }
}

export { GetUserAddressUseCase }
