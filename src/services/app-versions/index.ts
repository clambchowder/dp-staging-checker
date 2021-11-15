import * as AppVersionFetch from './app-versions-fetch'
import * as AppVersionMock from './app-versions-mock'
import * as AppVersionApi from './app-versions-api'

const getAppVersionInstance = () => {
    if (Boolean(process.env.REACT_APP_USE_MOCK_DATA)) return AppVersionMock
    if (Boolean(process.env.REACT_APP_USE_CLIENT_FETCH)) return AppVersionFetch
    return AppVersionApi

}

export const { getAppVersions } = getAppVersionInstance()

