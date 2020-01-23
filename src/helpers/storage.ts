import {CapacitorDataStorageSqlite} from '@jeepq/capacitor';

export const set = async (database: string, table: string, key: string, value: any): Promise<void> => {
  const storage = CapacitorDataStorageSqlite;
  const open = await storage.openStore({database, table});
  if (!open) {
    throw Error('Storage could not be opened');
  }
  await storage.set({key: key, value: JSON.stringify(value)});
};

export const getById = async (database: string, table: string, key: string): Promise<any> => {
  const storage = CapacitorDataStorageSqlite;
  const open = await storage.openStore({database, table});
  if (!open) {
    throw Error('Storage could not be opened');
  }
  const item = await storage.get({key: key});
  return JSON.parse(item.value);
};

export const update = async (database: string, table: string, key: string, value: any): Promise<any> => {
  await set(database, table, key, value);
};

export const getTable = async (database: string, table: string): Promise<any> => {
  const storage = CapacitorDataStorageSqlite;
  const open = await storage.openStore({database, table});
  if (!open) {
    throw Error('Storage could not be opened');
  }
  const storedVal = <any>await storage.values();
  const unsorted = storedVal && storedVal.values && storedVal.values.map(value => JSON.parse(value));
  if (unsorted) {
    return unsorted.sort((a, b) => {
      // @ts-ignore
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
  return [];
};

export const removeById = async (database: string, table: string, key: string): Promise<void> => {
  const storage = CapacitorDataStorageSqlite;
  const open = await storage.openStore({database, table});
  if (!open) {
    throw Error('Storage could not be opened');
  }
  await storage.remove({key});
};
