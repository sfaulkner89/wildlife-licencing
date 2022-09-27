import { APIRequests } from '../../../../services/api-requests.js'
import pageRoute from '../../../../routes/page-route.js'
import { habitatURIs } from '../../../../uris.js'
import { SECTION_TASKS } from '../../../tasklist/licence-type-map.js'
import { checkApplication } from '../common/check-application.js'

export const completion = async _request => habitatURIs.NAME.uri

export const checkData = async (request, h) => {
  const journeyData = await request.cache().getData()
  const redirectUrl = await checkApplication(request)

  if (redirectUrl) {
    return redirectUrl
  }

  const complete = await APIRequests.APPLICATION.tags(journeyData.applicationId).has(SECTION_TASKS.SETTS)
  const habitatSites = await APIRequests.HABITAT.getHabitatsById(journeyData.applicationId)

  if (complete && habitatSites.length !== 0) {
    return h.redirect(habitatURIs.CHECK_YOUR_ANSWERS.uri)
  }

  return undefined
}

export default pageRoute({
  page: habitatURIs.START.page,
  uri: habitatURIs.START.uri,
  completion,
  checkData
})