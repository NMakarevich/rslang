import routes from './routes';

class Router {
  run = () => {
    const id = location.hash.slice(2) || '/';
    this.loadComponent(id);

    window.addEventListener('hashchange', () => {
      const pageId = location.hash.slice(2) || '/';
      this.pushToHistory(pageId);
    });
  };

  loadComponent(id: string) {
    const route = routes.find((route) => route.path === id);
    if (!route) {
      routes[0]?.component?.render();
      id = '404';
      window.history.pushState({ id }, `${id}`);
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
