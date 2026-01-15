import { trainingModules } from '../config/trainingModules';
import { trainingModulesSocialBoost } from '../config/trainingModulesSocialBoost';
import type { Module } from '../config/trainingModules';

export const loadCourseModules = (configPath: string): Module[] => {
  switch (configPath) {
    case 'trainingModules':
      return trainingModules;
    case 'trainingModulesSocialBoost':
      return trainingModulesSocialBoost;
    default:
      console.warn(`Unknown config path: ${configPath}, using default`);
      return trainingModules;
  }
};
