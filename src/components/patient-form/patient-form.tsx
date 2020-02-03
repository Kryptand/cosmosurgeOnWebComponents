import {Component, Element, Event, EventEmitter, h, Prop, State} from '@stencil/core';
import {Patient} from "../../models/patient";
import {generateId} from "../../helpers/id-generator";
import {PatientHeader} from "../patient-header/patient-header";


@Component({
  tag: 'cosmo-patient-form',
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
export class PatientForm {
  @Prop() patient: Patient;
  @Event() patientUpdated: EventEmitter;
  @Event() patientCreated: EventEmitter;
  @State() firstname: string;
  @State() lastname: string;
  @Element() el: HTMLElement;

  modalElement: HTMLIonModalElement = this.el.closest("ion-modal");

  componentDidLoad() {
    this.initParams(this.modalElement?.componentProps?.patient);
  }

  handleFirstNameChange(event) {
    this.firstname = event.target.value;
  }

  handleLastNameChange(event) {
    this.lastname = event.target.value;
  }

  render = () => [
    <ion-content>
      <PatientHeader patient={this.patient}/>
      <ion-item>
        <ion-label position="fixed">Vorname</ion-label>
        <ion-input id="test-patient-form-firstname" autofocus={true} value={this.firstname}
                   onInput={(event) => this.handleFirstNameChange(event)}
                   maxlength={80}/>
      </ion-item>
      <ion-item>
        <ion-label position="fixed">Nachname</ion-label>
        <ion-input id="test-patient-form-lastname" maxlength={80} value={this.lastname}
                   onInput={(event) => this.handleLastNameChange(event)}/>
      </ion-item>
      <cosmo-submit-cancel submitDisabled={!this.firstname && !this.lastname}
                           onSubmitEvent={() => this.handleSubmit()}/>
    </ion-content>
  ];

  private initParams(patient?: Patient) {
    this.patient = patient;
    this.firstname = this.patient && this.patient.firstname;
    this.lastname = this.patient && this.patient.lastname;
  }

  public async handleSubmit() {
    let formValue = {
      ...new Patient(),
      id: this.patient?.id ?? generateId(),
      firstname: this.firstname,
      lastname: this.lastname,
    };
    let event = {value: formValue, type: ''};
    if (this.patient) {
      event.type = 'update';
    } else {
      event.type = 'create';
    }
    await this.modalElement.dismiss(event);
    return event;
  }
}

