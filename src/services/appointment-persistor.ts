import {AbstractPersistor} from "./patient-persistor";

export class Appointment {
  id: string;
  patientId: string;
  createdAt = Date.now();
}

export class AppointmentPersistor extends AbstractPersistor<Appointment> {
  TABLE_IDENTIFIER = "APPOINTMENT_STORAGE";

  async getAppointmentsForPatient(patientId: string): Promise<Appointment[]> {
    const {keys} = await this.getKeys();
    if (keys) {
      return [];
    }
    const filteredKeys = keys.filter(key => key.includes(patientId));
    return await Promise.all(filteredKeys.map(async key => await this.getSingle(key)));
  }
}

export const AppointmentPersistorInstance = new AppointmentPersistor();
