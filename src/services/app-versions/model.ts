export interface IEnvironmentValue {
    url: string;
    version?: string;
    error?: any
}

export interface IEnvironmentValues {
    prod: IEnvironmentValue;
    stage: IEnvironmentValue;
}

export interface IAppVersionInfo {
    name: string;
    environments: IEnvironmentValues,
    hasError: boolean;
    stageMatchesProd: boolean;
}

export interface IAppVersionInfoRow {
    id: string;
    name: string;
    // status: string;
    // type: string;
    // vertical: string;
    // team: string;
    // qaVersion: string;
    stage: IEnvironmentValue,
    stageVersion: string;
    prodVersion: string;
    // hasError: boolean;
    stageMatchesProd: boolean;
}
