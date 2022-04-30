import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'
import { User } from '@/types/UserType'
import axios from 'axios'
import { env } from 'process'
import { injectable } from 'tsyringe'

@injectable()
class GetUsersMockApiData {
  async getUsersData (page = '1', limit = '10', sortBy = 'firstName', order = 'asc'): Promise<User[]> {
    try {
      const users = await axios.get(`${env.MOCKAPIBASEPATH as string}/users?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`)

      return users.data
    } catch (e) {
      throw new InvalidRequestError(`Erro ao buscar os dados dos usuários ${e}`)
    }
  }
}

export { GetUsersMockApiData }
