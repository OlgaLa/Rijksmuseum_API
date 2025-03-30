import { ACCESS_KEY } from "../../supertest.config";

export function collectionApi(culture: 'nl' | 'en' = 'nl') {
    return `/${culture}/collection`
}

export function collectionDetailsApi(culture, objectNumber: String) {
    return `${collectionApi(culture)}/${objectNumber}`
}

export async function getObjectByTitle(api, title: String) {
    const response = await api
        .get(collectionApi())
        .query({ key: ACCESS_KEY, q: title, ps: 500});
    
    const match = response.body.artObjects.find(
        (art: any) => art.title === title
    );
    return match;
}

export async function getObjectNumberByTitle(api, title: String) {
    return (await getObjectByTitle(api, title)).objectNumber;
}