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

// Kubernetes environment variables cluster IPs
const SERVICE_CLUSTER_IP = {
  [SERVICE_NAMES.OUROBOROS]: process.env.OUROBOROS_SERVICE_HOST,
  [SERVICE_NAMES.TRIDENT]: process.env.TRIDENT_SERVICE_HOST,
  [SERVICE_NAMES.POPULOUS]: process.env.POPULOUS_SERVICE_HOST,
  [SERVICE_NAMES.JAVELIN]: process.env.JAVELIN_SERVICE_HOST,
  [SERVICE_NAMES.SCYTHE]: process.env.SCYTHE_SERVICE_HOST,
};

// Kubernetes service ports
const SERVICE_PORTS = {
  [SERVICE_NAMES.OUROBOROS]: '8080',
  [SERVICE_NAMES.SCYTHE]: '3001',
  [SERVICE_NAMES.TRIDENT]: '50051',
  [SERVICE_NAMES.POPULOUS]: '50052',
  [SERVICE_NAMES.JAVELIN]: '50053',
};

// If we're running Kubernetes, our host is the service name
const getServiceHost = (service) => {
  if (SERVICE_CLUSTER_IP[service]) {
    return service;
  }
  return '0.0.0.0';
}

module.exports.SERVICE_NAMES = SERVICE_NAMES;
module.exports.SERVICE_PORTS = SERVICE_PORTS;
module.exports.getServiceHost = getServiceHost;