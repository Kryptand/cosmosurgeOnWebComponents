import {Component, Element, h, State} from "@stencil/core";
import {Patient} from "../../models/patient";
import {PatientPersistorInstance} from "../../services/patient-persistor";
import {RouterHandlerInstance} from "../../services/router-handler";

@Component({
  tag: "cosmo-patient-container"
})
export class PatientContainer {
  @State() patients: Patient[];
  @Element() el: HTMLElement;

  async openForm(ev, patient?: Patient) {
    const popover = Object.assign(document.createElement("ion-modal"), {
      component: "cosmo-patient-form",
      event: ev,
      componentProps: {
        patient: patient
      }
    });
    document.body.appendChild(popover);
    await popover.present();
    const result = await popover.onDidDismiss();
    if (result && result.data && result.data.type) {
      result.data.type === "update"
        ? await PatientPersistorInstance.update(
        result.data.value,
        result.data.value.id
        )
        : await PatientPersistorInstance.add(
        result.data.value,
        result.data.value.id
        );
      this.patients = await PatientPersistorInstance.getAll();
    }
  }

  async deletePatient(patient: Patient) {
    await PatientPersistorInstance.remove(patient.id);
    this.patients = await PatientPersistorInstance.getAll();
  }

  async componentWillLoad() {
    this.patients = await PatientPersistorInstance.getAll();
  }

  async onPatientSelected(patient: Patient) {
    await RouterHandlerInstance.push(`cosmo-appointment-container`, {
      patientId: patient.id
    });
  }

  render = () => [
    <cosmo-patient-list
      onPatientSelected={ev => this.onPatientSelected(ev.detail)}
      onPatientSelectedForDeletion={ev => this.deletePatient(ev.detail)}
      onPatientSelectedForEdit={ev => this.openForm(ev, ev.detail)}
      patients={this.patients}
    />,
    <ion-fab
      onClick={ev => this.openForm(ev)}
      vertical="bottom"
      horizontal="end"
      slot="fixed"
    >
      <ion-fab-button>
        <ion-icon name="add"/>
      </ion-fab-button>
    </ion-fab>
  ];
}
