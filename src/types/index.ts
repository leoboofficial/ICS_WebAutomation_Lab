export type UserRole = 'FACULTY' | 'STUDENT' | 'COORDINATOR' | 'GUEST';
export type AssessmentType = 'LAB' | 'ESE';
export type RubricAutoRule = 'CODE_IMPLEMENTATION' | 'OUTPUT_TESTS' | 'DOCUMENTATION' | 'MANUAL';

export interface RubricCriterion {
  id: string;
  label: string;
  description?: string;
  maxMarks: number;
  autoRule?: RubricAutoRule;
}

export interface DynamicRubricConfig {
  LAB: RubricCriterion[];
  ESE: RubricCriterion[];
}

export const DEFAULT_RUBRIC_CONFIG: DynamicRubricConfig = {
  LAB: [
    {
      id: 'conceptImplemented',
      label: 'Coding Standards & Refactoring',
      description: 'Google Java Style naming, indentation, formatting, and refactored Java logic',
      maxMarks: 3,
      autoRule: 'CODE_IMPLEMENTATION',
    },
    {
      id: 'namingConventions',
      label: 'Static Analysis & Quality Report',
      description: 'Static code analysis defect fixes and documented code-quality report',
      maxMarks: 3,
      autoRule: 'DOCUMENTATION',
    },
    {
      id: 'documentation',
      label: 'Peer Review & Documentation',
      description: 'Javadoc comments, peer review checklist comments, and resolutions',
      maxMarks: 2,
      autoRule: 'DOCUMENTATION',
    },
    {
      id: 'output',
      label: 'Functional Test Execution',
      description: 'Public and hidden test case execution passes',
      maxMarks: 2,
      autoRule: 'OUTPUT_TESTS',
    },
  ],
  ESE: [
    {
      id: 'algorithm',
      label: 'Coding Standards & Linting',
      description: 'Naming conventions, indentation, formatting, and Javadoc compliance',
      maxMarks: 15,
      autoRule: 'DOCUMENTATION',
    },
    {
      id: 'implementation',
      label: 'Refactoring & Static Analysis',
      description: 'Defect remediation, modular Java 17 design, and code-quality report',
      maxMarks: 15,
      autoRule: 'CODE_IMPLEMENTATION',
    },
    {
      id: 'execution',
      label: 'Functional Execution & Output',
      description: 'Public and hidden private test case verification',
      maxMarks: 10,
      autoRule: 'OUTPUT_TESTS',
    },
    {
      id: 'viva',
      label: 'Peer Review & Viva-Voce',
      description: 'Peer code review checklist defense and oral examination',
      maxMarks: 10,
      autoRule: 'MANUAL',
    },
  ],
};

export type QualityCategory = 'NAMING' | 'FORMATTING' | 'COMMENTING' | 'STATIC_ANALYSIS';

export interface QualityIssue {
  line: number;
  ruleId: string;
  category: QualityCategory;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  suggestion: string;
}

export interface StaticAnalysisResult {
  qualityScore: number;
  namingScore: number;
  formattingScore: number;
  commentingScore: number;
  staticAnalysisScore: number;
  issues: QualityIssue[];
  summary: string;
  analyzedAt: string;
}

export interface CodeQualityReportEntry {
  id: string;
  ruleId: string;
  category: QualityCategory;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  detectedIssue: string;
  fixApplied: string;
}

export interface PeerReviewChecklistItem {
  id: string;
  criterion: string;
  status: 'PASS' | 'NEEDS_FIX' | 'N_A';
  comment: string;
  resolution: string;
}

export interface PeerReviewRecord {
  reviewerName: string;
  reviewerRegNo: string;
  reviewedAt: string;
  overallVerdict: 'APPROVED' | 'CHANGES_REQUESTED' | 'PENDING';
  checklist: PeerReviewChecklistItem[];
}

export interface QualityArtifactPayload {
  qualityScore: number;
  lintIssuesCount: number;
  staticIssuesCount: number;
  issuesSummary: QualityIssue[];
  reportEntries: CodeQualityReportEntry[];
  peerReview: PeerReviewRecord;
}

export interface ExamModeConfig {
  eseEnabled: boolean;
  eseTitle: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface User {
  role: UserRole;
  email: string;
  username?: string;
  personalEmail?: string;
  deviceId?: string;
  multiStudentAlert?: string;
  name: string;
  regNo?: string;
  department?: string;
  verifiedViaSheet?: boolean;
  mustChangePassword?: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  assessmentType?: AssessmentType;
  openTime: string; // ISO string or datetime-local
  closeTime: string; // ISO string or datetime-local
  publicInput: string;
  publicOutput: string;
  privateInput: string;
  privateOutput: string;
  starterCode?: string;
  maxScore?: number;
}

export type SubmissionStatus = 
  | 'ALL TEST CASES PASSED'
  | 'PARTIAL PASS'
  | 'FAILED'
  | 'COMPILATION ERROR'
  | 'TIME LIMIT EXCEEDED'
  | 'PENDING';

export interface Submission {
  id: string;
  timestamp: string;
  studentEmail: string;
  personalEmail?: string;
  deviceId?: string;
  multiStudentAlert?: string;
  regNo: string;
  studentName?: string;
  exerciseId: string;
  exerciseTitle?: string;
  assessmentType?: AssessmentType;
  code: string;
  status: SubmissionStatus;
  publicLog: string;
  privateLog: string;
  publicPassed: boolean;
  privatePassed: boolean;
  score: number;
  qualityArtifact?: QualityArtifactPayload;
}

export type ViolationType = 
  | 'TAB_SWITCH' 
  | 'FULLSCREEN_EXIT' 
  | 'COPY' 
  | 'PASTE' 
  | 'DEVTOOLS_ATTEMPT' 
  | 'MULTIPLE_DEVICES';

export interface Violation {
  id: string;
  timestamp: string;
  studentEmail: string;
  personalEmail?: string;
  deviceId?: string;
  regNo: string;
  studentName?: string;
  exerciseId: string;
  exerciseTitle?: string;
  type: ViolationType;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

export interface LoginAuditRecord {
  id: string;
  timestamp: string;
  officialEmail: string;
  regNo: string;
  studentName: string;
  personalEmail: string;
  deviceId: string;
  otherRegNos: string;
  status: 'CLEAR' | 'FLAGGED: MULTI-STUDENT PROXY' | string;
}

export interface StudentRecord {
  email: string;
  regNo: string;
  name: string;
  department: string;
  submissionsCount?: number;
  violationsCount?: number;
}

export interface FacultyRecord {
  email: string;
  name: string;
  department: string;
}

export interface ExecutionResult {
  passed: boolean;
  log: string;
  actualOutput?: string;
  expectedOutput?: string;
  executionTimeMs?: number;
  isError?: boolean;
  isTimeout?: boolean;
}

export interface SystemSettings {
  renderServiceUrl: string;
  apiSecret: string;
  googleSheetsUrl: string;
  enforceFullscreen: boolean;
  blockCopyPaste: boolean;
  trackTabSwitches: boolean;
  useBuiltinRunner: boolean;
}

export interface LabRecordMetadata {
  courseCode: string;
  courseName: string;
  degree: string;
  specialization: string;
  academicYear: string;
  facultyName: string;
  department: string;
  institution: string;
  location: string;
  reportDate: string;
  examDate?: string;
  rubricMode?: 'blank';
}

export interface RubricBreakdown {
  conceptImplemented: number; // Max 5 marks
  namingConventions: number;  // Max 1 mark
  documentation: number;      // Max 1 mark
  output: number;             // Max 3 marks
  total: number;              // Max 10 marks
  totalMarks?: number;
}

export type LabRecordStatus =
  | 'NOT_SUBMITTED'
  | 'PENDING_EVALUATION'
  | 'EVALUATED_APPROVED'
  | 'NEEDS_REVISION'
  | 'PENDING'
  | 'APPROVED';

export interface StudentLabRecordSubmission {
  id: string;
  timestamp: string;
  assessmentType?: AssessmentType;
  studentEmail: string;       // Official email account
  personalEmail?: string;     // Student's personal Mail ID (Gmail)
  deviceId?: string;          // Browser / Device identifier
  multiStudentAlert?: string; // Flagged if same Mail ID / device used for >1 RegNo
  regNo: string;              // Student registration number
  studentName: string;
  department?: string;
  completedExercisesCount: number;
  totalExercisesCount: number;
  antiCheatingViolationsCount: number;
  status: LabRecordStatus;
  rubrics?: RubricBreakdown;
  rubric?: RubricBreakdown;
  dynamicScores?: Record<string, number>;
  maxTotalMarks?: number;
  facultyRemarks?: string;
  evaluatedBy?: string;
  evaluatedAt?: string;
  isVerifiedAndApproved: boolean;
  procedures?: Record<string, string>;
  isGmailSuspicious?: boolean;
  loggedGmail?: string;
  submissionDate?: string;
  violationsCount?: number;
}

