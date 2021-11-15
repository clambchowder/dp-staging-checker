import { Handler } from '@netlify/functions'
import { getAppVersions } from '../src/services/app-versions/app-versions-client'

const handler: Handler = async (_event, _context) => {
    let results = await getAppVersions()
    let response = JSON.stringify(results, null, 2)

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  }

export { handler }
