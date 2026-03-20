import * as migration_20260318_142627 from './20260318_142627';
import * as migration_20260320_053205 from './20260320_053205';

export const migrations = [
  {
    up: migration_20260318_142627.up,
    down: migration_20260318_142627.down,
    name: '20260318_142627',
  },
  {
    up: migration_20260320_053205.up,
    down: migration_20260320_053205.down,
    name: '20260320_053205'
  },
];
