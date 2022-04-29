import { Address } from '@/modules/types/AddressType'
import { User } from '@/modules/types/UserType'
import axios from 'axios'
import { injectable } from 'tsyringe'

@injectable()
class GetUserAddressUseCase {
  async execute (user: User): Promise<Address> {
    const requestData = await axios.get(`${process.env.MOCKAPIBASEPATH as string}/users/${user.id}/address`)
    return requestData.data
  }
}

export { GetUserAddressUseCase }
