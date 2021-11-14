export enum EnvironmentType {
    qa = "qa",
    staging = "staging",
    prod = "prod",
}


export enum DeployStatus {
    error = "error",
    pendingStaging = "pendingStaging",
    pendingRelease = "pendingRelease",
    upToDate = "upToDate"
}

export enum AppType {
    App = 'App',
    Api = 'Api',
    v1 = 'v1'
}

export enum TldType {
    com = 'com',
    cloud = 'cloud'
}


export enum TeamType {
    Agent = 'Agent',
    Artemis = 'Artemis',
    GhostBusters = 'GhostBusters',
    InsureAnts = 'InsureAnts',
    SqueakyWheel = 'SqueakyWheel',
    Wheat = 'Wheat',
    Shared = 'Shared'
    // Platform = 'Platform',
    // Data = 'Data'
}

export enum VerticalType {
    Insurance = 'Insurance',
    Distribution = 'Distribution',
    Shared = 'Shared',
}
