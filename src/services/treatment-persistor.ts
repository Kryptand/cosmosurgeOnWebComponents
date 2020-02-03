import {AbstractPersistor} from "./patient-persistor";

export type TreatmentType = "botox" | "thread" | "other";
export const THREAD_TYPE_ARR = [
  "Mono",
  "doppelter Mono Faden",
  "einfacher Spiralfaden",
  "doppelter Spiralfaden",
  "gezahnter Faden"
];
export type ThreadType =
  | "Mono"
  | "doppelter Mono Faden"
  | "einfacher Spiralfaden"
  | "doppelter Spiralfaden"
  | "gezahnter Faden";

export type BotoxRegion =
  | "forehead"
  | "frownLines"
  | "eyelid"
  | "gummySmile"
  | "droppyBrows"
  | "bunnyLines"
  | "crowsFeet"
  | "lipLines"
  | "marionetteLines"
  | "chin"
  | "neck"
  | string ;

export class Treatment {
  id: string;
  appointmentId: string;
  patientId: string;
  type: TreatmentType;
  treatmentDetail: any;
  createdAt = Date.now();
}

export class BotoxTreatment extends Treatment {
  type: "botox";
  treatmentDetail: BotoxTreatmentDetail[];
}

export class ThreadTreatment extends Treatment {
  type: "thread";
  treatmentDetail: ThreadTreatmentDetail[];
}

export class OtherTreatment extends Treatment {
  type: "other";
  treatmentDetail: string;
}

export class ThreadTreatmentDetail {
  threadType: ThreadType;
  amount: number;
}

export class BotoxTreatmentDetail {
  region: BotoxRegion;
  amount: number;
}

export class TreatmentPersistor extends AbstractPersistor<Treatment> {
  TABLE_IDENTIFIER = "TREATMENT_STORAGE";

  async getTreatmentsForPatient(patientId: string): Promise<Treatment[]> {
    const {keys} = await this.getKeys();
    if (keys) {
      return [];
    }
    const filteredKeys = keys.filter(key => key.includes(patientId));
    return await Promise.all(
      filteredKeys.map(async key => await this.getSingle(key))
    );
  }

  async getTreatmentsForAppointment(treatmentId: string): Promise<Treatment[]> {
    const {keys} = await this.getKeys();
    if (keys) {
      return [];
    }
    const filteredKeys = keys.filter(key => key.includes(treatmentId));
    return await Promise.all(
      filteredKeys.map(async key => await this.getSingle(key))
    );
  }
}

export const TreatmentPersistorInstance = new TreatmentPersistor();
