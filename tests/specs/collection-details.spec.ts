import request from 'supertest';
import { BASE_URL, ACCESS_KEY } from '../../supertest.config';
import { collectionDetailsApi, getObjectByTitle, getObjectNumberByTitle} from '../helpers/helpers';

const api = request(BASE_URL);
const TITLE = 'De Nachtwacht';
let objectNumber;

beforeAll(async () => {
  objectNumber = await getObjectNumberByTitle(api, TITLE);
});

describe('Rijksmuseum Collection Details API', () => {
  it('should return 200 and contain expected art object structure', async () => {
    const res = await api
      .get(collectionDetailsApi('nl', objectNumber))
      .query({ key: ACCESS_KEY });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('artObject');
    expect(res.body.artObject).toHaveProperty('title', TITLE);
    expect(res.body.artObject).toHaveProperty('objectNumber', objectNumber);
    expect(res.body.artObject).toHaveProperty('principalMaker', 'Rembrandt van Rijn');
    expect(res.body.artObject.principalMakers.length).toBe(1);
    expect(res.body.artObject.principalMakers[0].name).toBe('Rembrandt van Rijn');
    expect(res.body.artObject.webImage).toHaveProperty('url');
    expect(res.body.artObject).toHaveProperty('description');
  });

  it('should return an error for missing API key', async () => {
    await api
    .get(collectionDetailsApi('nl', objectNumber))
    .expect(401)
  });

  it('should return 404 for an invalid object number', async () => {
    const res = await api
      .get(collectionDetailsApi('nl', `${objectNumber}Invalid`))
      .query({ key: ACCESS_KEY })
      .expect(200);

      expect(res.body).toHaveProperty('artObject', null);
      expect(res.body).toHaveProperty('artObjectPage', null);
  });

  it('should return principalOrFirstMaker and longTitle the same as in the collection', async () => {
    const artObject = await getObjectByTitle(api, TITLE);
    const principalOrFirstMaker = artObject.principalOrFirstMaker;
    const longTitle = artObject.longTitle;

    const artObjectDetails = await api
      .get(collectionDetailsApi('nl', objectNumber))
      .query({ key: ACCESS_KEY });

    expect(artObjectDetails.body.artObject.principalOrFirstMaker).toBe(principalOrFirstMaker);
    expect(artObjectDetails.body.artObject.longTitle).toBe(longTitle);
  });

});
