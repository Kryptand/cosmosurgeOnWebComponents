import {Component, h, State} from "@stencil/core";
import {EventBusInstance, Receiver, Subject} from "../../helpers/pub-sub";

@Component({tag: 'cosmo-base-layout'})
export class BaseLayout implements Receiver {
  @State() title: string;

  receive(_: string, subject: Subject) {
    this.title = subject;
    console.debug(subject);
  }

  connectedCallback() {
    EventBusInstance.subscribe('title', this);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button/>
          </ion-buttons>
          <ion-title>{this.title}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-router useHash={false}>
          <ion-route url="/" component="cosmo-patient-list-container"/>
          <ion-route-redirect from="/patients" to="/"/>
          <ion-route url="/detail/:patientId" component="cosmo-patient-detail"/>
        </ion-router>
        <ion-nav/>
      </ion-content>,
      <ion-footer/>
    ]
  }
}
