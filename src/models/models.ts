import { AppType, DeployStatus, EnvironmentType, TeamType, TldType, VerticalType } from "./enums";

export interface IApplicationOptions {
    name: string;
    type: AppType;
    team: TeamType;
    pipelineUrl: string;
    displayName?: string;
    tld?: TldType;
    separateReleaseBranch?: boolean;
    limitsCors?: boolean;
}

export interface IApplicationInfo extends IApplicationOptions {
    vertical: VerticalType;
}

export interface IEnvironmentData extends Record<EnvironmentType, IEnvironmentValue> {}

export interface IEnvironmentValue {
    url: string;
    version?: string;
    error?: any
}

export interface IApplicationData extends IApplicationInfo {
    environments: IEnvironmentData,
}

export interface IApplicationInfoRow extends IApplicationInfo, IEnvironmentData {
    id: string;
    deployStatus: DeployStatus
}

export interface IKeyValuePair {
    key: string;
    value: string;
}

export interface StringEnum {
    [id: string]: string
}
