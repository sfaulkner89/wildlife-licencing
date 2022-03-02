import { models } from '@defra/wls-database-model'
import { APPLICATION_JSON } from '../../constants.js'
import { cache } from '../../services/cache.js'
import { prepareResponse } from './application-site-proc.js'
import { checkCache, checkUser } from '../utils.js'

export default async (context, req, h) => {
  try {
    if (!await checkUser(context)) {
      return h.response().code(404)
    }

    const result = await checkCache(req)

    if (result) {
      return h.response(result)
        .type(APPLICATION_JSON)
        .code(200)
    }

    const applicationSite = await models.applicationSites.findByPk(context.request.params.applicationSiteId)

    // Check the user exists
    if (!applicationSite) {
      return h.response().code(404)
    }

    const responseBody = prepareResponse(applicationSite.dataValues)

    await cache.save(req.path, responseBody)
    return h.response(responseBody)
      .type(APPLICATION_JSON)
      .code(200)
  } catch (err) {
    console.error('Error selecting from the APPLICATION-SITES table', err)
    throw new Error(err.message)
  }
}