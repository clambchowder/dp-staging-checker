import { Handler } from "@netlify/functions";
import { getAppVersions } from "../services/app-versions/app-versions-fetch";

const handler: Handler = async (_event, _context) => {
  let results = await getAppVersions();
  let response = JSON.stringify([], null, 2);
  if (results) response = JSON.stringify(results, null, 2);

  return {
    statusCode: 200,
    body: response,
  };
};

export { handler };
