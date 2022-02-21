import home from './pages/home';
import Dictionary from './pages/dictionary';
import AudioCall from './pages/audiocall';
import Registration from './pages/registration';
import Login from './pages/login';
import team from './pages/team';
import games from './pages/games';
import sprint from './pages/sprint';
import page404 from './pages/404';
import statistic from './pages/statistic';

const routes = [
  { component: page404 },
  { path: '/', component: home },
  { path: 'registration', component: new Registration() },
  { path: 'login', component: new Login() },
  { path: 'dictionary', component: new Dictionary() },
  { path: 'games', component: games },
  { path: 'games/sprint', component: sprint },
  { path: 'games/audio', component: new AudioCall() },
  { path: 'team', component: team },
  { path: 'statistic', component: statistic },
];

export default routes;
