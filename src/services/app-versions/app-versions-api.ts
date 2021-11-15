
import { IApplicationInfoRow } from '../../models';

export const getAppVersions = async (): Promise<IApplicationInfoRow[]> => {
    const resp = await fetch('/api/versions')
    const data = await resp.json()
    return data as IApplicationInfoRow[]
}
