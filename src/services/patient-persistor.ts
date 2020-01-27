import {getById, getTable, removeById, set, update} from "../helpers/storage";
import {Patient} from "../models/patient";
import {DATABASE_IDENTIFIER} from "../config/constants";

type Identifiable = { id: string };

export abstract class AbstractPersistor<T extends Identifiable> {
  TABLE_IDENTIFIER;

  async add(entity: T): Promise<void> {
    await set(DATABASE_IDENTIFIER, this.TABLE_IDENTIFIER, entity.id, entity);
  }

  async update(entity: T): Promise<void> {
    await update(DATABASE_IDENTIFIER, this.TABLE_IDENTIFIER, entity.id, entity);
  }

  async remove(entity: T): Promise<void> {
    await removeById(DATABASE_IDENTIFIER, this.TABLE_IDENTIFIER, entity.id);
  }

  async getAll(): Promise<T[]> {
    return await getTable(DATABASE_IDENTIFIER, this.TABLE_IDENTIFIER);
  }

  async getSingle(key: string): Promise<any> {
    return await getById(DATABASE_IDENTIFIER, this.TABLE_IDENTIFIER, key);
  }
}

export class PatientPersistor extends AbstractPersistor<Patient> {
  TABLE_IDENTIFIER = 'PATIENT_STORAGE';
}

export const PatientPersistorInstance = new PatientPersistor();
