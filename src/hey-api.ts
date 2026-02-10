import { CreateClientConfig } from './services/client'

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: '/api'
})
