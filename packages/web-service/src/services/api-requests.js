import { API } from '@defra/wls-connectors-lib'
import db from 'debug'
const debug = db('web-service:api-requests')

export const APIRequests = {
  USER: {
    findByName: async username => {
      try {
        debug(`Finding user by username: ${username}`)
        const users = await API.get('/users', `username=${username}`)
        return users.length === 1 ? users[0] : null
      } catch (error) {
        console.error(`Error fetching user ${username}`, error)
        throw error
      }
    },
    create: async username => {
      try {
        debug(`Creating new user: ${username}`)
        await API.post('/user', { username })
      } catch (error) {
        console.error(`Error creating user ${username}`, error)
        throw error
      }
    }
  },
  APPLICATION: {
    create: async (userId, type) => {
      try {
        debug(`Creating new application of type: ${type} for userId: ${userId}`)
        const { ref: applicationReferenceNumber } = await API.get('/applications/get-reference', `applicationType=${type}`)
        return API.post(`/user/${userId}/application`, { applicationReferenceNumber, applicationType: type })
      } catch (error) {
        console.error(`Error creating application with userId ${userId} and type ${type}`, error)
        throw error
      }
    },
    findByUser: async userId => {
      try {
        debug(`Finding applications for userId: ${userId}`)
        return API.get(`/user/${userId}/applications`)
      } catch (error) {
        console.error(`Error finding application with userId ${userId}`, error)
        throw error
      }
    }
  }
}