export const toProperCase = (str: string) => str.length === 0 ? str : str[0].toUpperCase() + str.substr(1)
export const toTitleCase = (str: string) => str.split(' ').map(toProperCase).join(' ');
export const nameof = <T>(name: keyof T) => name;
