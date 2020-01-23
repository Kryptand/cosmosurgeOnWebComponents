import {Component, Element, h, State} from '@stencil/core';
import {Patient} from "./patient";
import {PatientPersistorInstance} from "./patient-persistor";


@Component({
  tag: 'cosmo-patient-list-container'
})
export class PatientListContainer {
  @State() patients: Patient[];
  @Element() el: HTMLElement;

  async openForm(ev, patient?: Patient) {
    const popover = Object.assign(document.createElement('ion-modal'), {
      component: 'cosmo-patient-form',
      event: ev,
      componentProps: {
        patient: patient
      }
    });
    document.body.appendChild(popover);
    await popover.present();
    const result = await popover.onDidDismiss();
    if (result && result.data && result.data.type) {
      result.data.type === 'update' ? await PatientPersistorInstance.update(result.data.value) : await PatientPersistorInstance.add(result.data.value);
      this.patients = await PatientPersistorInstance.getAll();
    }
  }

  async deletePatient(patient: Patient) {
    await PatientPersistorInstance.remove(patient);
    this.patients = await PatientPersistorInstance.getAll();
  }

  async componentWillLoad() {
    this.patients = await PatientPersistorInstance.getAll();
  }

  async onPatientSelected(patient: Patient) {
    const router = this.el.closest("ion-router");
    console.debug(router);
    await router.push(`/patients/${patient.id}`);

  }

  render = () => [
    <ion-content>
      <cosmo-patient-list onPatientSelected={ev => this.onPatientSelected(ev.detail)}
                          onPatientSelectedForDeletion={ev => this.deletePatient(ev.detail)}
                          onPatientSelectedForEdit={ev => this.openForm(ev, ev.detail)} patients={this.patients}/>
      <ion-fab onClick={ev => this.openForm(ev)} vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon name="add"/>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  ];
}

