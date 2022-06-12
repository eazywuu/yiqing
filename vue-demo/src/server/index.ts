import axios from 'axios'

const server = axios.create({
  baseURL: 'http://175.178.228.95:3333',
})

export const getApiList = () => server.get('/api/list').then((res) => res.data)
