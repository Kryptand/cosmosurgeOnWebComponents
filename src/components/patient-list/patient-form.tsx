import {Component, Element, Event, EventEmitter, h, Prop, State} from '@stencil/core';
import {Patient} from "./patient";
import {generateId} from "../../helpers/id-generator";

type HeaderProps = { patient? }
const PatientHeader = (props: HeaderProps) => {
  return props.patient ? <h1 class="center">{props.patient.firstname} {props.patient.lastname} bearbeiten</h1> :
    <h1 class="center">Patient erstellen</h1>
};

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
  private modalElement: HTMLIonModalElement;

  componentDidLoad() {
    this.modalElement = this.el.closest("ion-modal");
    this.initParams();
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
        <ion-input autofocus={true} value={this.firstname} onInput={(event) => this.handleFirstNameChange(event)}
                   maxlength={80}/>
      </ion-item>
      <ion-item>
        <ion-label position="fixed">Nachname</ion-label>
        <ion-input maxlength={80} value={this.lastname} onInput={(event) => this.handleLastNameChange(event)}/>
      </ion-item>
      <div class="flex">
        <span class="spacer"/>
        <ion-button color="danger">Abbrechen</ion-button>
        <ion-button type="submit" color="success"
                    disabled={!this.firstname || !this.lastname}
                    onClick={() => this.handleSubmit()}>Speichern
        </ion-button>
      </div>
    </ion-content>
  ];

  private initParams() {
    this.patient = this.modalElement.componentProps.patient;
    this.firstname = this.patient && this.patient.firstname;
    this.lastname = this.patient && this.patient.lastname;
  }

  private async handleSubmit() {
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
  }
}

