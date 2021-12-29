export const config = {
  privateKey: process.env.PRIVATE_KEY || '',
  privateKeyRefresh: process.env.PRIVATE_KEY || '',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT) || 8080,
};
