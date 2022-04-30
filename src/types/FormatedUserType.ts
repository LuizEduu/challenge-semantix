import { Address } from './AddressType'
import { Contacts } from './ContactsType'

type FormatedUser = {
  id: string
  createdAt: Date
  fullName: string
  email: string
  addresses: Address[]
  contacts: Contacts[]
}

export { FormatedUser }
