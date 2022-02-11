import home from './pages/home';
import Dictionary from './pages/dictionary';
import about from './pages/about';
import Registry from './pages/registry';
import Login from './pages/login';
import team from './pages/team';
import games from './pages/games';

const routes = [
  { path: '/', component: home },
  { path: 'registry', component: new Registry() },
  { path: 'login', component: new Login() },
  { path: 'dictionary', component: new Dictionary() },
  { path: 'games', component: games },
  { path: 'games/sprint'},
  { path: 'games/audio'},
  { path: 'about', component: about },
  { path: 'team', component: team },
];

export default routes;
