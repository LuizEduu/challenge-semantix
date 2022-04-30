import { Address } from '@/types/AddressType'
import { User } from '@/types/UserType'
import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'
import axios from 'axios'
import { injectable } from 'tsyringe'

@injectable()
class GetUserAddressMockApiData {
  async getUserAddressData (users: User[]): Promise<Address[]> {
    try {
      const result = await Promise.all(users.map(async (user) =>
        (await axios.get(`${process.env.MOCKAPIBASEPATH as string}/users/${user.id}/address`)).data))

      return result
    } catch (e: any) {
      throw new InvalidRequestError(`Requisição inválida ${e}`, e.statusCode)
    }
  }
}

export { GetUserAddressMockApiData }
