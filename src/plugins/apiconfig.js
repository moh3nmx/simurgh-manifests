export const SimurghApiServer = "http://194.5.193.119:2623/api/";
export const Users = `${SimurghApiServer}users/`;
export const Enrich = `${SimurghApiServer}iiif/enrich/`;
export const Iiif = `${SimurghApiServer}iiif/`;
export const Manifest = `${SimurghApiServer}manifest/`;

export function CmsBaseUrl() {
    return `${window.location.protocol}/${window.location.host}/`;
}
export function CmsIiif() {
    return `${CmsBaseUrl()}Iiif/`;
}