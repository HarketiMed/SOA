const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const config = require('../config');

const PROTO_PATH = path.resolve(__dirname, '../protos/recommendations.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.Recommender(
  config.RECOMMENDER_GRPC_URL,
  grpc.credentials.createInsecure()
);

function getRecommendations(genre) {
  return new Promise((resolve, reject) => {
    client.GetRecommendations({ genre }, (err, response) => {
      if (err) return reject(err);
      resolve(response.movies);
    });
  });
}

module.exports = { getRecommendations };