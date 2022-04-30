import axios from 'axios'

import { GetUsersMockApiData } from '@/utils/GetUsersMockApiData'
import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'

describe('get user mock api data', () => {
  let getUsersMockApiData: GetUsersMockApiData

  beforeEach(() => {
    getUsersMockApiData = new GetUsersMockApiData()
    jest.mock('axios')

    axios.get = jest.fn().mockReturnValue({
      data: {
        name: 'any_name',
        phoneNumber: 'any_phone_number',
        email: 'any_email',
        id: 'any_id',
        userId: 'any_id',
        contactId: 'any_string'
      }
    })
  })

  it('shoud be able to return a users data', async () => {
    const contactData = await getUsersMockApiData.getUsersData()

    expect(contactData).toHaveProperty('id')
  })

  it('shoud be able to throws invalid request error with invalid get request', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error())

    try {
      await getUsersMockApiData.getUsersData()
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidRequestError)
    }
  })
})
