import { Contacts } from '@/types/ContactsType'
import { User } from '@/types/UserType'
import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'
import axios from 'axios'
import { injectable } from 'tsyringe'

@injectable()
class GetUserContactsMockApiData {
  async getUserContactsData (users: User[]): Promise<Contacts[]> {
    try {
      const result = await Promise.all(users.map(async (user) =>
        (await axios.get(`${process.env.MOCKAPIBASEPATH as string}/users/${user.id}/contacts`)).data))

      return result
    } catch (e: any) {
      throw new InvalidRequestError(`Requisição inválida ${e}`, e.statusCode)
    }
  }
}

export { GetUserContactsMockApiData }
