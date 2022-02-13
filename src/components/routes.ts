import home from './pages/home';
import Dictionary from './pages/dictionary';
import about from './pages/about';
import Registration from './pages/registration';
import Login from './pages/login';
import team from './pages/team';
import games from './pages/games';
import sprint from './pages/sprint';
import page404 from './pages/404';

const routes = [
  { component: page404 },
  { path: '/', component: home },
  { path: 'registration', component: new Registration() },
  { path: 'login', component: new Login() },
  { path: 'dictionary', component: new Dictionary() },
  { path: 'games', component: games },
  { path: 'games/sprint', component: sprint },
  { path: 'games/audio', component: null },
  { path: 'about', component: about },
  { path: 'team', component: team },
];

export default routes;
