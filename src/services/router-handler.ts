import {getAllUrlParams} from "../helpers/get-url-vars";

export class RouterHandler {
  routerInstance: HTMLIonRouterElement;
  navInstance: HTMLIonNavElement;

  currentRouteParams(): any {
    if (window && window.location) {
      return getAllUrlParams(window.location.href);
    }
    return {};
  }

  go(url: string) {
    this.routerInstance &&
    this.routerInstance.push(url, 'forward');
  }

  push(elementSelector: string, props: any) {
    this.navInstance && this.navInstance.push(elementSelector, props)
  }

  back() {
    this.routerInstance &&
    this.routerInstance.back();
  }
}

export const RouterHandlerInstance = new RouterHandler();
