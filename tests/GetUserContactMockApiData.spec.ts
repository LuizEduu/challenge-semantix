import axios from 'axios'

import { GetUserContactsMockApiData } from '@/utils/GetUserContactsMockApiData'
import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'

describe('get user contact mock api data', () => {
  let getUserContactsMockApiData: GetUserContactsMockApiData

  beforeEach(() => {
    getUserContactsMockApiData = new GetUserContactsMockApiData()
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

  it('shoud be able to return a user contact', async () => {
    const contactData = await getUserContactsMockApiData.getUserContactsData([
      {
        id: 'any_id',
        createdAt: new Date(),
        firstName: 'any_firstName',
        avatar: 'any_avatar',
        email: 'any_email',
        lastName: 'any_lastName'
      }
    ])

    expect(contactData[0]).toHaveProperty('id')
  })

  it('shoud be able to throws invalid request error with invalid get request', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error())

    try {
      await getUserContactsMockApiData.getUserContactsData([
        {
          id: 'any_id',
          createdAt: new Date(),
          firstName: 'any_firstName',
          avatar: 'any_avatar',
          email: 'any_email',
          lastName: 'any_lastName'
        }
      ])
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidRequestError)
    }
  })
})
