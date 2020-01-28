import {Component, Prop, State} from "@stencil/core";
import {Patient} from "../../models/patient";
import {PatientPersistorInstance} from "../../services/patient-persistor";
import {EventBusInstance} from "../../helpers/pub-sub";

@Component({tag: "cosmo-patient-detail"})
export class PatientDetail {
  @Prop() patientId: string;
  @State() patient: Patient;

  async componentWillLoad() {
    if (this.patientId) {
      this.patient = await PatientPersistorInstance.getSingle(this.patientId);
      await EventBusInstance.publish(
        "title",
        `${this.patient.firstname} ${this.patient.lastname}`
      );
    }
  }

  render = () => JSON.stringify(this.patient);
}
