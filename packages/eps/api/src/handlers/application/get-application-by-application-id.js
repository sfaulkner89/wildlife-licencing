import { models } from '../../model/sequentelize-model.js'
import { APPLICATION_JSON } from '../../constants.js'
import { cache } from '../../services/cache.js'

export default async (context, req, h) => {
  try {
    const saved = await cache.restore(req.path)

    if (saved) {
      return h.response(JSON.parse(saved))
        .type(APPLICATION_JSON)
        .code(200)
    }

    const application = await models.applications.findByPk(context.request.params.applicationId)

    // Check the user exists
    if (!application) {
      return h.response().code(404)
    }

    return h.response(application.dataValues)
      .type(APPLICATION_JSON)
      .code(200)
  } catch (err) {
    console.error('Error selecting from the APPLICATIONS table', err)
    throw new Error(err.message)
  }
}