import {Component, Event, EventEmitter, h, Prop} from '@stencil/core';
import {Patient} from "../../models/patient";

@Component({
  tag: 'cosmo-patient-list'
})
export class PatientList {
  @Prop() patients: Patient[];
  @Event() patientSelectedForEdit: EventEmitter;
  @Event() patientSelectedForDeletion: EventEmitter;
  @Event() patientSelected: EventEmitter;
  render = () => {
    if (this.patients) {
      return [
        <ion-list>
          {this.patients.map(patient =>
            <ion-item-sliding>
              <ion-item-options side="start">
                <ion-item-option>
                  <ion-icon slot="icon-only" name="create"
                            onClick={() => this.patientSelectedForEdit.emit(patient)}/>
                </ion-item-option>
              </ion-item-options>
              <ion-item onClick={() => this.patientSelected.emit(patient)}>
                <ion-label>{patient.firstname} {patient.lastname}</ion-label>
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option color="danger">
                  <ion-icon slot="icon-only" name="trash"
                            onClick={() => this.patientSelectedForDeletion.emit(patient)}/>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          )}
        </ion-list>
      ]
    }
  }
}

