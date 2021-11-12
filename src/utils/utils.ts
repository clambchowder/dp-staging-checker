import { red, deepOrange, blue, green } from "@mui/material/colors";
import { IApplicationData, IApplicationOptions, IEnvironmentValue,  AppType, DeployStatus, EnvironmentType, TeamType, TldType, VerticalType } from "../models";
import { AppNames } from "../config";


export const nameof = <T>(name: keyof T) => name;
export const DefineIdentity = <Constraint> () => <T extends Constraint> (definition: T) => definition;

export const toProperCase = (str: string) => str.length === 0 ? str : str[0].toUpperCase() + str.substr(1)
export const toTitleCase = (str: string) => str.split(' ').map(toProperCase).join(' ');

export const sanitizeVersion = (message: string): string => {
    return message.split(" ")[1]?.replace("alpha", "α")?.replace("v", "") ?? message
}


export const getStatusUrl = (name: AppNames, appOptions: IApplicationOptions,env: EnvironmentType): string => {
    const envSubdomain = env === EnvironmentType.prod ? "" : `.${env}`
    if (appOptions.type === AppType.v1) return `https://app${envSubdomain}.dealerpolicy.com/status.php`
    if (appOptions.type === AppType.Api) return `https://api-${name}${envSubdomain}.dealerpolicy.cloud/status`
    if (appOptions.tld === TldType.cloud) return `https://${name}${envSubdomain}.dealerpolicy.cloud/status`
    return `https://${name}${envSubdomain}.dealerpolicy.com/status`
}


export const getDeployStatus = (app: IApplicationData): DeployStatus => {
    if (Object.values<IEnvironmentValue>(app.environments).some(e => e.error)) {
        return DeployStatus.error
    }

    const {qa, staging, prod} = app.environments;

    if (qa.version !== staging.version && !app.separateReleaseBranch) return DeployStatus.pendingStaging;
    if (staging.version !== prod.version) return DeployStatus.pendingRelease;
    return DeployStatus.upToDate;
}


export const TeamTypeDisplay: Record<TeamType, string> = {
    [TeamType.SqueakyWheel]: 'Squeaky Wheel',
    [TeamType.GhostBusters]: 'Ghost Busters',
    [TeamType.Artemis]: TeamType.Artemis,
    [TeamType.Wheat]: TeamType.Wheat,
    [TeamType.InsureAnts]: TeamType.InsureAnts,
    [TeamType.Agent]: TeamType.Agent,
    [TeamType.Shared]: TeamType.Shared,

}

export const TeamTypeVertical: Record<TeamType, VerticalType> = {
    [TeamType.Wheat]: VerticalType.Distribution,
    [TeamType.Artemis]: VerticalType.Distribution,
    [TeamType.SqueakyWheel]: VerticalType.Distribution,
    [TeamType.GhostBusters]: VerticalType.Insurance,
    [TeamType.InsureAnts]: VerticalType.Insurance,
    [TeamType.Agent]: VerticalType.Insurance,
    [TeamType.Shared]: VerticalType.Shared,
}


export const DeployStatusDisplay: Record<DeployStatus, string> = {
    [DeployStatus.error]: 'Error',
    [DeployStatus.pendingStaging]: 'Pending Staging',
    [DeployStatus.pendingRelease]: 'Pending Release',
    [DeployStatus.upToDate]: 'Up To Date'
}

export const DeployStatusStage: Record<DeployStatus, number> = {
    [DeployStatus.error]: 1,
    [DeployStatus.pendingStaging]: 2,
    [DeployStatus.pendingRelease]: 3,
    [DeployStatus.upToDate]: 4

}

export const DeployStatusColor: Record<DeployStatus, string> = {
    [DeployStatus.error]: red[800],
    [DeployStatus.pendingStaging]: deepOrange[800],
    [DeployStatus.pendingRelease]: blue[800],
    [DeployStatus.upToDate]: green[800]
}


export const isDeployedUpTo = (val: DeployStatus, max: DeployStatus): boolean =>
    DeployStatusStage[val] >= DeployStatusStage[max]

