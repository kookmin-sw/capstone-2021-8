import Development from './development';
import Production from './production';

export default process.env.NODE_ENV === 'development' ? Development : Production;
