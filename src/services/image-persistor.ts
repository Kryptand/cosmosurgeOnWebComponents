import {AbstractPersistor} from "./patient-persistor";
import {generateId} from "../helpers/id-generator";

export class TreatmentImage {
  id: string = generateId();
  patientId: string;
  treatmentId: string;
  image: string;
  createdAt = Date.now();
}

export class TreatmentImagePersistor extends AbstractPersistor<TreatmentImage> {
  TABLE_IDENTIFIER = "TREATMENT_IMAGE_STORAGE";

  async getImagesForPatient(patientId: string): Promise<TreatmentImage[]> {
    const {keys} = await this.getKeys();
    if (keys) {
      return [];
    }
    const filteredKeys = keys.filter(key => key.includes(patientId));
    return await Promise.all(filteredKeys.map(async key => await this.getSingle(key)));
  }

  async getImagesForTreatment(treatmentId: string): Promise<TreatmentImage[]> {
    const {keys} = await this.getKeys();
    if (keys) {
      return [];
    }
    const filteredKeys = keys.filter(key => key.includes(treatmentId));
    return await Promise.all(filteredKeys.map(async key => await this.getSingle(key)));
  }
}

export const TreatmentImagePersistorInstance = new TreatmentImagePersistor();
