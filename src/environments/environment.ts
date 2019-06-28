import { environment as environmentDev } from './environment.dev';

interface configType {
  [key: string]: any;
}

const environmentConfig: configType = {
  dev: environmentDev
};

const environment = environmentConfig[process.env.REACT_APP_ENV as string];

export default environment;
