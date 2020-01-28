import {Component, Event, EventEmitter, h, Prop} from "@stencil/core";
import {Appointment} from "../../services/appointment-persistor";

@Component({
  tag: "cosmo-appointment-list"
})
export class AppointmentList {
  @Prop() appointments: Appointment[];
  @Event() appointmentSelected: EventEmitter;

  render = () => {
    if (this.appointments) {
      return [
        <ion-list>
          {this.appointments.map(appointment => (
            <ion-item onClick={() => this.appointmentSelected.emit(appointment)}>
              <ion-label>
                {appointment.createdAt}
              </ion-label>
            </ion-item>
          ))}
        </ion-list>
      ];
    }
  };
}
