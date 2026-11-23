import { Exercise, FacultyRecord, StudentRecord, Submission, Violation } from '../types';
import { PART1_EXERCISES } from './part1Experiments';

// Pre-seeded with Part 1 (Java Coding Standards, Static Analysis & Peer Review) experiments
// Overridden automatically when VITE_APPS_SCRIPT_URL Google Sheet syncs
export const INITIAL_EXERCISES: Exercise[] = PART1_EXERCISES;
export const INITIAL_STUDENTS: StudentRecord[] = [];
export const INITIAL_FACULTY: FacultyRecord[] = [];
export const INITIAL_SUBMISSIONS: Submission[] = [];
export const INITIAL_VIOLATIONS: Violation[] = [];
