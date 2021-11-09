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
    'Payments',
    'Search',
    'Rating',
    'Reporting',
    'Surehits',
    'Travelers',
    'Vehicleid'
] as const

export type apiNames = typeof apis[number] | 'v1'

export const pipelines: Record<apiNames, string> = {
    Agency: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=130&branchFilter=624',
    Audit: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=146&branchFilter=5471',
    Auth: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=124&branchFilter=3214',
    Bind: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=117&branchFilter=4613',
    Communication: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=123&branchFilter=777',
    Consumerid: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=126&branchFilter=384',
    Content: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=115&branchFilter=53',
    Externalid: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=162&branchFilter=6852',
    Jdpower: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=122&branchFilter=3909',
    Links: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=121&branchFilter=3188',
    Location: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=120&branchFilter=55',
    Org: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=169&branchFilter=7435',
    Payments: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=127&branchFilter=176',
    Search: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=151&branchFilter=5609',
    Rating: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_release?view=mine&_a=releases&definitionId=22',
    Reporting: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=172&branchFilter=7863',
    Surehits: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=116&branchFilter=4858',
    Travelers: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=170&branchFilter=7445',
    Vehicleid: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=128&branchFilter=56',
    v1: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_release?_a=releases&view=mine&definitionId=20'
}
