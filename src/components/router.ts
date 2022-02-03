import routes from './routes';
class Router {
  constructor() {
    this.run();
  }

  run = () => {
    const id = location.hash.slice(2) || '/';
    this.loadComponent(id);

    window.addEventListener('hashchange', () => {
      const id = location.hash.slice(2) || '/';
      this.pushToHistory(id);
    });
  };

  loadComponent(id: string) {
    const component = routes.find((route) => route.path === id)!.component || routes[0]!.component;

    (document.querySelector('.main .container') as HTMLElement).innerHTML = component.render();
  }

  pushToHistory(id: string) {
    this.loadComponent(id);
    window.history.pushState({ id }, `${id}`, `#/${id}`);
  }
}

export default Router;
