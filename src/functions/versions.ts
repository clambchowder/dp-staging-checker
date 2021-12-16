import { Handler } from "@netlify/functions";
import { getAppVersions } from "../services/app-versions/app-versions-fetch";

const handler: Handler = async (_event, _context) => {
  let response;
  try {
    let results = await getAppVersions();
    response = JSON.stringify(results, null, 2);
  } catch (error) {}

  return {
    statusCode: 200,
    body: response,
  };
};

export { handler };
