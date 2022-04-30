import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'
import { GetUserAddressUseCase } from '@/modules/users/useCases/getUserAddressUseCase/GetUserAddressUseCase'
import { GetUserAddressMockApiData } from '@/utils/GetUserAddressMockApiData'

describe('get users address use case', () => {
  let getUserAddressMockApiData: GetUserAddressMockApiData
  let getUserAddressUseCase: GetUserAddressUseCase

  beforeEach(() => {
    getUserAddressMockApiData = new GetUserAddressMockApiData()

    getUserAddressMockApiData.getUserAddressData = jest.fn().mockReturnValue([
      {
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
    ])

    getUserAddressUseCase = new GetUserAddressUseCase(
      getUserAddressMockApiData
    )
  })

  it('shoud be able to returns a user address', async () => {
    const address = await getUserAddressUseCase.execute([
      {
        id: 'any_id',
        createdAt: new Date(),
        firstName: 'any_firstName',
        avatar: 'any_avatar',
        email: 'any_email',
        lastName: 'any_lastName'
      }
    ])

    expect(address[0]).toHaveProperty('userId')
  })

  it('shoud be able to throws InvalidRequest error with invalid request', async () => {
    getUserAddressMockApiData.getUserAddressData = jest
      .fn()
      .mockRejectedValue(new Error())

    try {
      await getUserAddressUseCase.execute([
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
