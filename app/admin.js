import universalRenderer from './utils/UniversalRenderer';
import alt from 'altInstance';
import routes from 'routes.js';
import adminhtml from 'admin.html';

export default universalRenderer(alt, routes, adminhtml);
