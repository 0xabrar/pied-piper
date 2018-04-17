import { SERVICE_NAMES, SERVICE_PORTS, getServiceHost } from "../common/config";

const ouroborosHost = getServiceHost(SERVICE_NAMES.OUROBOROS);
const ouroborosPort = SERVICE_PORTS[SERVICE_NAMES.OUROBOROS];

export const ouroborosEndpoint = `http://${ouroborosHost}:${ouroborosPort}`;
