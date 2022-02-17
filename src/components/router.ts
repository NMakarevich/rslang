import main from './main';
import routes from './routes';

class Router {
  run = () => {
    const id = window.location.hash.slice(2) || '/';
    this.loadComponent(id);

    window.addEventListener('hashchange', () => {
      const pageId = window.location.hash.slice(2) || '/';
      main.pages[0] = main.pages[1] as string;
      main.pages[1] = pageId;
      this.pushToHistory(pageId);
    });
  };

  loadComponent(id: string) {
    const route = routes.find((item) => item.path === id);
    if (!route || !route.component) {
      routes[0]?.component?.render();
      const notFound = '404';
      window.history.pushState({ notFound }, `${notFound}`);
      return;
    }

    route?.component?.render();
  }

  pushToHistory(id: string) {
    this.loadComponent(id);
    window.history.pushState({ id }, `${id}`);
  }
}

export default Router;
