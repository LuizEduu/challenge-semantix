import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'
import { GetUserAddressUseCase } from '@/modules/users/useCases/getUserAddressUseCase/GetUserAddressUseCase'
import { GetUserContactsUseCase } from '@/modules/users/useCases/getUserContactsUseCase/GetUseContactsUseCase'
import { GetUsersUseCase } from '@/modules/users/useCases/getUsersUseCase/GetUsersUseCase'
import { GetUserAddressMockApiData } from '@/utils/GetUserAddressMockApiData'
import { GetUserContactsMockApiData } from '@/utils/GetUserContactsMockApiData'
import { GetUsersMockApiData } from '@/utils/GetUsersMockApiData'

describe('get users use case', () => {
  let getUsersMockApiData: GetUsersMockApiData
  let getAddressMockApiData: GetUserAddressMockApiData
  let getUserContactMockApiData: GetUserContactsMockApiData
  let getUserAddress: GetUserAddressUseCase
  let getUserContacts: GetUserContactsUseCase
  let getUserUseCase: GetUsersUseCase

  beforeEach(() => {
    getUsersMockApiData = new GetUsersMockApiData()
    getAddressMockApiData = new GetUserAddressMockApiData()
    getUserContactMockApiData = new GetUserContactsMockApiData()
    getUserAddress = new GetUserAddressUseCase(getAddressMockApiData)
    getUserContacts = new GetUserContactsUseCase(getUserContactMockApiData)

    getUsersMockApiData.getUsersData = jest.fn().mockReturnValue([
      {
        id: 'any_id',
        createdAt: new Date(),
        firstName: 'any_firstName',
        avatar: 'any_avatar',
        email: 'any_email',
        lastName: 'any_lastName'
      }
    ])

    getUserAddress.execute = jest.fn().mockReturnValue([
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

    getUserContacts.execute = jest.fn().mockReturnValue([
      {
        name: 'any_name',
        phoneNumber: 'any_phone_number',
        email: 'any_email',
        id: 'any_id',
        userId: 'any_id',
        contactId: 'any_string'
      }
    ])

    getUserUseCase = new GetUsersUseCase(getUsersMockApiData, getUserAddress, getUserContacts)
  })

  it('shoud be able to returns a formated user data', async () => {
    const users = await getUserUseCase.execute()

    expect(users).toHaveLength(1)
  })

  it('shoud be able to returns a formated data with sortBy equal desc', async () => {
    const users = await getUserUseCase.execute('1', '10', 'desc')

    expect(users[0]).toHaveProperty('id')
  })

  it('shoud be able to throws InvalidRequest error with invalid request', async () => {
    getUsersMockApiData.getUsersData = jest.fn().mockRejectedValue(new Error())

    try {
      await getUserUseCase.execute()
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidRequestError)
    }
  })

  it('shoud be able to throws error with invalid page parameter', async () => {
    try {
      await getUserUseCase.execute('any_page')
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidRequestError)
    }
  })

  it('shoud be able to throws error with limit parameter Bigger or equal 15', async () => {
    try {
      await getUserUseCase.execute('1', '16')
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidRequestError)
    }
  })

  it('shoud be able to throws error with sortBy equal avatar', async () => {
    try {
      await getUserUseCase.execute('1', '10', 'avatar')
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidRequestError)
    }
  })

  it('shoud be able to throws error with invalid sortBy', async () => {
    try {
      await getUserUseCase.execute('1', '10', 'any_sort_by')
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidRequestError)
    }
  })
})
