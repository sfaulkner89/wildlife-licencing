import { conservationConsiderationURIs } from '../../uris.js'
import { isYes, yesNoPage } from '../common/yes-no.js'
import { checkApplication } from '../common/check-application.js'
import { APIRequests } from '../../services/api-requests.js'
import { yesNoFromBool } from '../common/common.js'
import { allCompletion, getCurrentSite } from './common.js'

const { OWNER_PERMISSION } = conservationConsiderationURIs

export const getData = async request => {
  const ads = await getCurrentSite(request)
  return { yesNo: yesNoFromBool(ads.permissionFromOwner) }
}

export const setData = async request => {
  const { applicationId } = await request.cache().getData()
  const ads = await getCurrentSite(request)
  ads.permissionFromOwner = isYes(request)
  if (!ads.permissionFromOwner) {
    delete ads.detailsOfPermission
  }
  await APIRequests.DESIGNATED_SITES.update(applicationId, ads.id, ads)
}

export const designatedSitePermission = yesNoPage({
  page: OWNER_PERMISSION.page,
  uri: OWNER_PERMISSION.uri,
  checkData: checkApplication,
  getData: getData,
  completion: allCompletion,
  setData: setData
})