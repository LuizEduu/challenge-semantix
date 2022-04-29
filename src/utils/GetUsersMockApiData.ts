import { User } from '@/modules/types/UserType'
import axios from 'axios'
import { env } from 'process'
import { injectable } from 'tsyringe'

@injectable()
class GetUsersMockApiData {
  async getUsersData (): Promise<User[]> {
    const users = await axios.get(`${env.MOCKAPIBASEPATH as string}/users`)

    return users.data
  }
}

export { GetUsersMockApiData }
