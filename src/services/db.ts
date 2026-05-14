import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';
import type { StudyMaterial } from '../types';

const DB_NAME = 'edu-ai-pro-db';
const STORE_NAME = 'materials';

export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveMaterial = async (material: StudyMaterial) => {
  const db = await initDB();
  return db.put(STORE_NAME, material);
};

export const getAllMaterials = async (): Promise<StudyMaterial[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteMaterial = async (id: string) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
