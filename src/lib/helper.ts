export const pluralize = (count: number, singular: string, plural: string = singular + 's') => {
    return count < 2 ? singular : plural;
};