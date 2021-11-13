import { createSearchParams, useSearchParams } from "react-router-dom";
import { AppNames } from "../config";
import { AppType, DeployStatus, TeamType, VerticalType } from "../models";
import { CreateMethod } from "../utils";


export interface IFilterParams extends Record<string, string | string[]> {
    name: AppNames | AppNames[];
    status: DeployStatus | DeployStatus[];
    type: AppType | AppType[];
    team: TeamType | TeamType[];
    vertical: VerticalType | VerticalType[];
}

const createFilterParams: CreateMethod<IFilterParams> = (args) => ({
    name: args?.name ?? [],
    status: args?.status ?? [],
    type: args?.type ?? [],
    team: args?.team ?? [],
    vertical: args?.vertical ?? [],
});

const parseParams = (params: URLSearchParams) => [...params].reduce((obj, [key, val]) => {
    obj[key] = [...obj[key] ?? [], val];
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
