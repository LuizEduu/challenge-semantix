import { InvalidRequestError } from '@/modules/users/errors/InvalidRequestError'
import { GetUserContactsUseCase } from '@/modules/users/useCases/getUserContactsUseCase/GetUseContactsUseCase'
import { GetUserContactsMockApiData } from '@/utils/GetUserContactsMockApiData'

describe('get user contact use case', () => {
  let getUserContactMockApiData: GetUserContactsMockApiData
  let getUserContactUseCase: GetUserContactsUseCase

  beforeEach(() => {
    getUserContactMockApiData = new GetUserContactsMockApiData()

    getUserContactMockApiData.getUserContactsData = jest.fn().mockReturnValue([
      {
        name: 'any_name',
        phoneNumber: 'any_phone_number',
        email: 'any_email',
        id: 'any_id',
        userId: 'any_id',
        contactId: 'any_string'
      }
    ])

    getUserContactUseCase = new GetUserContactsUseCase(
      getUserContactMockApiData
    )
  })

  it('shoud be able to returns a user contact', async () => {
    const contact = await getUserContactUseCase.execute([
      {
        id: 'any_id',
        createdAt: new Date(),
        firstName: 'any_firstName',
        avatar: 'any_avatar',
        email: 'any_email',
        lastName: 'any_lastName'
      }
    ])

    expect(contact[0]).toHaveProperty('userId')
  })

  it('shoud be able to throws InvalidRequest error with invalid request', async () => {
    getUserContactMockApiData.getUserContactsData = jest
      .fn()
      .mockRejectedValue(new Error())

    try {
      await getUserContactUseCase.execute([
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
