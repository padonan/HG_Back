const { minioEndPoint, minioAccessKeyId, minioSecretAccessKey } = require("../config/dotenv");
const Minio = require('minio');
const minioClient = new Minio.Client({
  endPoint: minioEndPoint,
  port: 9000,
  useSSL: false,
  accessKeyId: minioAccessKeyId,
  secretAccessKey: minioSecretAccessKey,
});

module.exports = minioClient;