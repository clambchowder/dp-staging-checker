import { createSearchParams, useSearchParams } from "react-router-dom";
import { DeployStatus, TeamType, VerticalType } from "../models";
import { CreateMethod } from "../utils";


export interface IFilterParams extends Record<string, string[]> {
    status: DeployStatus[];
    team: TeamType[];
    vertical: VerticalType[];
}

const createFilterParams: CreateMethod<IFilterParams> = (args) => ({
    status: args?.status ?? [],
    team: args?.team ?? [],
    vertical: args?.vertical ?? [],
});

const parseParams = (params: URLSearchParams) => [...new Set(params.keys())].reduce((obj, key) => {
    obj[key] = params.getAll(key);
    return obj;
}, {} as Record<string, string[]>);


type IUseFilterParams = [IFilterParams, (model: Partial<IFilterParams>) => void]

const useFilterParams = (): IUseFilterParams => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getFilterParams = (urlParams: URLSearchParams): IFilterParams => {
        const model = parseParams(urlParams)
        return createFilterParams(model);
    }

    const setFilterPrams = (model: Partial<IFilterParams>) => {
        const full = createFilterParams(model)
        const params = createSearchParams(full)
        setSearchParams(params)
    }

    return [getFilterParams(searchParams), setFilterPrams]

}

export default useFilterParams;
