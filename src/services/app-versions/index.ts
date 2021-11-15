import * as AppVersionClient from './app-versions-client'
import * as AppVersionMock from './app-versions-mock'
import * as AppVersionApi from './app-versions-api'

const getAppVersionInstance = () => {
    if (Boolean(process.env.REACT_APP_USE_MOCK_DATA)) return AppVersionMock
    if (Boolean(process.env.REACT_APP_USE_CLIENT_FETCH)) return AppVersionClient
    return AppVersionApi

}

export const { getAppVersions } = getAppVersionInstance()

