import axios from 'axios'

import { PUBLIC_PUBLIC_API } from '@/constant'

const usersApi = axios.create({
  baseURL: `${PUBLIC_PUBLIC_API}`,
})

export default usersApi