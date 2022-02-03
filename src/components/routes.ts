import home from './home';
import dictionary from './dictionary';
import about from './about';
import registry from './registry';
import team from './team';
import games from './games';

const routes = [
  { path: '/', component: home },
  { path: 'registry', component: registry },
  { path: 'dictionary', component: dictionary },
  { path: 'games', component: games },
  { path: 'about', component: about },
  { path: 'team', component: team },
];

export default routes;
