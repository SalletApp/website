import Dexie from 'dexie';

export const db = new Dexie('salletApp');

// Declare tables, IDs and indexes
db.version(3).stores({
  wallets: '++id',
});
