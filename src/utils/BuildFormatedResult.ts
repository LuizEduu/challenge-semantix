import { Address } from '@/types/AddressType'
import { Contacts } from '@/types/ContactsType'
import { FormatedUser } from '@/types/FormatedUserType'
import { User } from '@/types/UserType'

export function BuildFormatedResult (user: User, addresses: Address[], contacts: Contacts[]): FormatedUser {
  const formatedAddress = addresses.map((address) => {
    delete address?.userId
    return {
      ...address

    }
  })

  const formatedContacts = contacts.map((contact) => {
    delete contact?.userId
    return {
      ...contact

    }
  })

  return {
    id: user.id,
    createdAt: user.createdAt,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    addresses: formatedAddress,
    contacts: formatedContacts
  }
}
