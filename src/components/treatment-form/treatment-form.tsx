import {Component, Element, Event, EventEmitter, h, Prop, State} from '@stencil/core';
import {Treatment, TreatmentType} from "../../services/treatment-persistor";


@Component({
  tag: 'cosmo-treatment-form',
  styles: `
    .center{
      text-align: center;
    }
    .flex{
      display:flex;
      justify-content: flex-end;
    }
    `
})
export class TreatmentForm {
  @Prop() treatment: Treatment;
  @Event() treatmentUpdated: EventEmitter;
  @Event() treatmentCreated: EventEmitter;
  @Element() el: HTMLElement;
  @State() formType: TreatmentType = 'botox';
  modalElement: HTMLIonModalElement = this.el.closest("ion-modal");

  componentDidLoad() {
    const segments = document.querySelectorAll('ion-segment');
    for (let i = 0; i < segments.length; i++) {
      segments[i].addEventListener('ionChange', (ev: CustomEvent) => {
        this.formType = ev.detail.value;
      })
    }
  }

  render = () => [
    <ion-segment>
      <ion-segment-button value="botox" checked={this.formType === 'botox'}>
        <ion-label>Botox</ion-label>
      </ion-segment-button>
      <ion-segment-button value="thread" checked={this.formType === 'thread'}>
        <ion-label>Faden</ion-label>
      </ion-segment-button>
      <ion-segment-button value="other" checked={this.formType === 'other'}>
        <ion-label>Andere</ion-label>
      </ion-segment-button>
    </ion-segment>,
    <ion-item>
      {
        this.formType === 'botox' ? <cosmo-botox-treatment-face-map/> : this.formType === 'thread' ? 'thread' : 'other'
      }
    </ion-item>,
    <ion-item>
      <ion-label>Botoxbehandlung</ion-label>
      <ion-select placeholder="Select One">
        <ion-select-option value="f">Female</ion-select-option>
        <ion-select-option value="m">Male</ion-select-option>
      </ion-select>
    </ion-item>
  ];

}

