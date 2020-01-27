import {Component, Element, h, State} from '@stencil/core';
import {RouterHandlerInstance} from "../../services/router-handler";
import {EventBusInstance, Receiver, Subject} from "../../helpers/pub-sub";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot implements Receiver {

  @Element() el: HTMLElement;
  @State() title: string;
  @State() currentPath: string;
  private detail: string;

  receive(_: string, subject: Subject) {
    this.title = subject;
  }

  connectedCallback() {
    EventBusInstance.subscribe('title', this);
  }

  componentDidLoad() {
    RouterHandlerInstance.routerInstance = document.querySelector('ion-router');
    RouterHandlerInstance.navInstance = document.querySelector('ion-nav')
  }

  routeChanged(event) {
    const {detail: {to}} = event;
    this.currentPath = to;
    //reset route
    if (to === '/') {
      this.title = 'Patienten';
    }
  }

  render() {
    return [
      <ion-app>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              {this.currentPath !== '/' ?
                <ion-back-button default-href="/"/> : ''}
            </ion-buttons>
            <ion-title>{this.title}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-router onIonRouteDidChange={ev => this.routeChanged(ev)} useHash={false}>
            <ion-route url="/" component="cosmo-patient-list-container"/>
            <ion-route-redirect from="/patients" to="/"/>
            <ion-route url="/detail/:patientId" component="cosmo-patient-detail"/>
          </ion-router>
          <ion-nav/>
        </ion-content>
        <ion-footer/>
      </ion-app>
    ]
  }
}
