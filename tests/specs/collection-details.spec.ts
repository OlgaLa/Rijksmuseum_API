import request from 'supertest';
import { BASE_URL, ACCESS_KEY } from '../../supertest.config';
import { collectionDetailsApi, getObjectNumberByTitle} from '../helpers/helpers';

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
});
