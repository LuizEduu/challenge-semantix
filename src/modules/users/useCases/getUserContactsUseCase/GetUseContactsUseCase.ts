import { Contacts } from '@/types/ContactsType'
import { User } from '@/types/UserType'
import { GetUserContactsMockApiData } from '@/utils/GetUserContactsMockApiData'
import { injectable } from 'tsyringe'
import { InvalidRequestError } from '../../errors/InvalidRequestError'

@injectable()
class GetUserContactsUseCase {
  constructor (private readonly getUserContactsMockApiData: GetUserContactsMockApiData) {}

  async execute (users: User[]): Promise<Contacts[]> {
    try {
      const contacts = await this.getUserContactsMockApiData.getUserContactsData(users)

      return contacts.flat(1).map((contact) => {
        return {

          contactId: contact.id as string,
          name: contact.name,
          phoneNumber: contact.phoneNumber,
          email: contact.email,
          userId: contact.userId

        }
      })
    } catch (e: any) {
      throw new InvalidRequestError(`Erro ao buscar os endereços dos usuários ${e}`)
    }
  }
}

export { GetUserContactsUseCase }
