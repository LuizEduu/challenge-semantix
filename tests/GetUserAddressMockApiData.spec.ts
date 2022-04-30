import axios from 'axios'

import { GetUserAddressMockApiData } from '@/utils/GetUserAddressMockApiData'
import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'

describe('get user address mock api data', () => {
  let getUserAddressMockApiData: GetUserAddressMockApiData

  beforeEach(() => {
    getUserAddressMockApiData = new GetUserAddressMockApiData()
    jest.mock('axios')

    axios.get = jest.fn().mockReturnValue({
      data: {
        addressId: 'any_addressId',
        address: 'any_address',
        street: 'any_street',
        city: 'any_city',
        state: 'any_state',
        zipcode: 'any_zipcode',
        country: 'any_country',
        number: 'any_number',
        id: 'any_id',
        userId: 'any_id'
      }
    })
  })

  it('shoud be able to return a users address', async () => {
    const addressData = await getUserAddressMockApiData.getUserAddressData([
      {
        id: 'any_id',
        createdAt: new Date(),
        firstName: 'any_firstName',
        avatar: 'any_avatar',
        email: 'any_email',
        lastName: 'any_lastName'
      }
    ])

    expect(addressData[0]).toHaveProperty('id')
  })

  it('shoud be able to throws invalid request error with invalid get request', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error())

    try {
      await getUserAddressMockApiData.getUserAddressData([
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
