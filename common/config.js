/** 
Includes configuration information that's shared across all services.
*/

// Service names.
const SERVICE_NAMES = {
  OUROBOROS: 'ouroboros',
  TRIDENT: 'trident',
  POPULOUS: 'populous',
  JAVELIN: 'javelin',
  SCYTHE: 'scythe',
}

// Kubernetes environment variables for services hosts.
const SERVICE_HOSTS = {
  OUROBOROS: process.env.OUROBOROS_SERVICE_HOST,
  TRIDENT: process.env.TRIDENT_SERVICE_HOST,
  POPULOUS: process.env.POPULOUS_SERVICE_HOST,
  JAVELIN: process.env.JAVELIN_SERVICE_HOST,
  SCYTHE: process.env.SCYTHE_SERVICE_HOST,
};

// Kubernetes environment variables for service ports.
const SERVICE_PORTS = {
  OUROBOROS: process.env.OUROBOROS_SERVICE_PORT,
  TRIDENT: process.env.TRIDENT_SERVICE_PORT,
  POPULOUS: process.env.POPULOUS_SERVICE_PORT,
  JAVELIN: process.env.JAVELIN_SERVICE_PORT,
  SCYTHE: process.env.SCYTHE_SERVICE_PORT,
}

// If we're not using Kubernetes, we just run on localhost.
const BACKUP_SERVICE_HOST = 'localhost';

// Ports used for services when not using Kubernetes.
const BACKUP_SERVICE_PORTS = {
  OUROBOROS: '8080',
  SCYTHE: '3001',
  TRIDENT: '50051',
  POPULOUS: '50052',
  JAVELIN: '50053',
};

module.exports.SERVICE_NAMES = SERVICE_NAMES;
module.exports.SERVICE_HOSTS = SERVICE_HOSTS;
module.exports.SERVICE_PORTS = SERVICE_PORTS;
module.exports.BACKUP_SERVICE_HOST = BACKUP_SERVICE_HOST;
module.exports.BACKUP_SERVICE_PORTS = BACKUP_SERVICE_PORTS;