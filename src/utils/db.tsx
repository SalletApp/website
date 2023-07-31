import Dexie from 'dexie';

export const db = new Dexie('salletApp');

// Declare tables, IDs and indexes
db.version(1).stores({
  wallets: '++id',
});
