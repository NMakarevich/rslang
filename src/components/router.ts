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
    const component = routes.find((route) => route.path === id)?.component || routes[0]?.component;

    (document.querySelector('.main .container') as HTMLElement).innerHTML = component?.render() as string;
  }

  pushToHistory(id: string) {
    this.loadComponent(id);
    window.history.pushState({ id }, `${id}`, `#/${id}`);
  }
}

export default Router;
