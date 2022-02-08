import home from './home';
import Dictionary from './dictionary';
import about from './about';
import Registry from './registry';
import Login from './login';
import team from './team';
import games from './games';

const routes = [
  { path: '/', component: home },
  { path: 'registry', component: new Registry() },
  { path: 'login', component: new Login() },
  { path: 'dictionary', component: new Dictionary() },
  { path: 'games', component: games },
  { path: 'about', component: about },
  { path: 'team', component: team },
];

export default routes;
