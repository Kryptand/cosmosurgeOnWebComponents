import {Component, Element, h, Prop, State} from "@stencil/core";
import {EventBusInstance} from "../../helpers/pub-sub";
import {RouterHandlerInstance} from "../../services/router-handler";
import {Appointment, AppointmentPersistorInstance} from "../../services/appointment-persistor";
import {PatientPersistorInstance} from "../../services/patient-persistor";
import {Patient} from "../../models/patient";

@Component({tag: "cosmo-appointment-container"})
export class AppointmentContainer {
  @Prop() patientId: string;
  @State() patient: Patient;
  @State() appointments: Appointment[];
  @Element() el: HTMLElement;

  async componentWillLoad() {
    if (this.patientId) {
      this.patient = await PatientPersistorInstance.getSingle(this.patientId);
      await EventBusInstance.publish(
        "title",
        `${this.patient.firstname} ${this.patient.lastname}`
      );
      this.appointments = await AppointmentPersistorInstance.getAppointmentsForPatient(this.patientId);
    }
  }


  async openForm(ev, patient?: Appointment) {
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
        ? await AppointmentPersistorInstance.update(
        result.data.value,
        result.data.value.id
        )
        : await AppointmentPersistorInstance.add(
        result.data.value,
        result.data.value.id
        );
      this.appointments = await AppointmentPersistorInstance.getAppointmentsForPatient(this.patientId);
    }
  }

  async deleteAppointment(patient: Appointment) {
    await AppointmentPersistorInstance.remove(patient.id);
    this.appointments = await AppointmentPersistorInstance.getAppointmentsForPatient(this.patientId);
  }

  async onAppointmentSelected(patient: Appointment) {
    await RouterHandlerInstance.push(`cosmo-patient-detail`, {
      patientId: patient.id
    });
  }

  render = () => [
    <cosmo-treatment-form/>,
    <cosmo-appointment-list
      onAppointmentSelected={ev => this.onAppointmentSelected(ev.detail)}
      appointments={this.appointments}
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
