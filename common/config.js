/** 
Includes configuration information that's shared across all services.
*/

// Service names.
export const OUROBOROS = 'ouroboros';
export const TRIDENT = 'trident';
export const POPULOUS = 'populous';
export const JAVELIN = 'javelin';
export const SCYTHE = 'scythe';

// Kubernetes environment variables for services hosts.
export const SERVICE_HOSTS = {
  OUROBOROS: process.env.OUROBOROS_SERVICE_HOST,
  TRIDENT: process.env.TRIDENT_SERVICE_HOST,
  POPULOUS: process.env.POPULOUS_SERVICE_HOST,
  JAVELIN: process.env.JAVELIN_SERVICE_HOST,
  SCYTHE: process.env.SCYTHE_SERVICE_HOST,
};

// Kubernetes environment variables for service ports.
export const SERVICE_PORTS = {
  OUROBOROS: process.env.OUROBOROS_SERVICE_PORT,
  TRIDENT: process.env.TRIDENT_SERVICE_PORT,
  POPULOUS: process.env.POPULOUS_SERVICE_PORT,
  JAVELIN: process.env.JAVELIN_SERVICE_PORT,
  SCYTHE: process.env.SCYTHE_SERVICE_PORT,
}
