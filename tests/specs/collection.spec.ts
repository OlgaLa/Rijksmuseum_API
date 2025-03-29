import request from 'supertest';
import { BASE_URL, ACCESS_KEY } from '../../supertest.config';
import { collectionApi } from '../helpers/helpers';

const api = request(BASE_URL);

describe('Rijksmuseum API Tests', () => {

  it('should return results for a valid query', async () => {
    const response = await api
      .get(collectionApi('nl'))
      .query({ key: ACCESS_KEY, q: 'Rembrandt', format: 'json' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('artObjects');
      expect(response.body.count).toBeGreaterThan(0);
  });

  it('should return error for missing API key', async () => {
    await api
      .get(collectionApi('en'))
      .query({ q: 'Rembrandt', format: 'json' })
      .send()
      .expect(401)
  });

  it('should return top pieces with images only', async () => {
    const response = await api
      .get(collectionApi('en'))
      .query({
        key: ACCESS_KEY,
        toppieces: true,
        imgonly: true,
        ps: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.artObjects.length).toBeLessThanOrEqual(5);

    response.body.artObjects.forEach((object: any) => {
      expect(object).toHaveProperty('hasImage', true);
    });
  });

  it('should correctly filter by involvedMaker', async () => {
    const involvedMaker = 'Rembrandt van Rijn';

    const response = await api
      .get(collectionApi('nl'))
      .query({ key: ACCESS_KEY, involvedMaker, format: 'json' });

    expect(response.status).toBe(200);
    response.body.artObjects.forEach((object: any) => {
      expect(object.principalOrFirstMaker).toEqual(involvedMaker);
    });
  });

  it('should handle pagination correctly', async () => {
    const responsePage1 = await api
      .get(collectionApi('en'))
      .query({ key: ACCESS_KEY, p: 1, ps: 2 });

    const responsePage2 = await api
      .get(collectionApi('en'))
      .query({ key: ACCESS_KEY, p: 2, ps: 2 });

    expect(responsePage1.status).toBe(200);
    expect(responsePage2.status).toBe(200);
    expect(responsePage1.body.artObjects).not.toEqual(responsePage2.body.artObjects);
  });
});
