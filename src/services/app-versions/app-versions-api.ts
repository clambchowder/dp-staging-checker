
import { IApplicationInfoRow } from '../../models';

type IRetryMethod = <T>(method: () => Promise<T>, maxAttempts: number) => Promise<T>

const retryMethod: IRetryMethod = async (method, maxAttempts) => {
    let curAttempt = 1
    let err
    while (curAttempt < maxAttempts) {
        try {
            const output = await method()
            return output
        } catch (error) {
            curAttempt++
            err = error
        }
    }
    throw err
};

export const getAppVersions = async (): Promise<IApplicationInfoRow[]> => {
    const fetchData = async () => {
        const resp = await fetch('/api/versions')
        const data = await resp.json()
        return data
    }
    const data = await retryMethod(fetchData, 3)

    return data as IApplicationInfoRow[]
}
