import { request } from 'https';
import { config } from 'dotenv';

config();

const apiUrl = process.env['MOCK_API_URL'] || 'localhost:3000/api';

export const sendRequest = async <T>(
  url: string,
  method = 'GET',
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const apiPath = `${apiUrl}/${url}`;
    const req = request(apiPath, { method: method }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
};
