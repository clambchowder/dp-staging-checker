export const apis = [
    'Agency',
    'Audit',
    'Auth',
    'Bind',
    'Communication',
    'Consumerid',
    'Content',
    'Externalid',
    'Jdpower',
    'Links',
    'Location',
    'Org',
    'Partners,
    'Payments',
    'Search',
    'Rating',
    'Reporting',
    'Surehits',
    'Travelers',
    'Vehicleid'
] as const

export const apps = [
    'FastPass',
    'Marketplace',
    'Marketplace-Reports'
    //'Agent',
] as const

export const cloudApps = [
    'Cot',
] as const

export type apiNames = typeof apis[number] | typeof apps[number] | typeof cloudApps[number] | 'v1'

export const separateReleaseBranch: Partial<Record<apiNames, boolean>> = {
    'v1': true
}

const buildPipeRoot = 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build'
const releasePipeRoot = 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build'

export const pipelines: Record<apiNames, string> = {
    Agency: `${buildPipeRoot}?definitionId=130&branchFilter=624`,
    Audit: `${buildPipeRoot}?definitionId=146&branchFilter=5471`,
    Auth: `${buildPipeRoot}?definitionId=124&branchFilter=3214`,
    Bind: `${buildPipeRoot}?definitionId=117&branchFilter=4613`,
    Communication: `${buildPipeRoot}?definitionId=123&branchFilter=777`,
    Consumerid: `${buildPipeRoot}?definitionId=126&branchFilter=384`,
    Content: `${buildPipeRoot}?definitionId=115&branchFilter=53`,
    Externalid: `${buildPipeRoot}?definitionId=162&branchFilter=6852`,
    Jdpower: `${buildPipeRoot}?definitionId=122&branchFilter=3909`,
    Links: `${buildPipeRoot}?definitionId=121&branchFilter=3188`,
    Location: `${buildPipeRoot}?definitionId=120&branchFilter=55`,
    Org: `${buildPipeRoot}?definitionId=169&branchFilter=7435`,
    Partners: `${buildPipeRoot}?definitionId=119&branchFilter=4385`,
    Payments: `${buildPipeRoot}?definitionId=127&branchFilter=176`,
    Search: `${buildPipeRoot}?definitionId=151&branchFilter=5609`,
    Reporting: `${buildPipeRoot}?definitionId=172&branchFilter=7863`,
    Surehits: `${buildPipeRoot}?definitionId=116&branchFilter=4858`,
    Travelers: `${buildPipeRoot}?definitionId=170&branchFilter=7445`,
    Vehicleid: `${buildPipeRoot}?definitionId=128&branchFilter=56`,

    Rating: `${releasePipeRoot}?view=mine&_a=releases&definitionId=22`,
    v1: `${releasePipeRoot}?_a=releases&view=mine&definitionId=20`,

    FastPass: `${buildPipeRoot}?definitionId=137&branchFilter=500`,
    Cot: `${buildPipeRoot}?definitionId=135&branchFilter=2108`,
    Marketplace: `${buildPipeRoot}?definitionId=145&branchFilter=5416`,
   'Marketplace-Reports': `${buildPipeRoot}?definitionId=157&branchFilter=6292`
}
