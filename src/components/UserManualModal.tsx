import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Printer,
  GraduationCap,
  Users,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  UserCog,
  SlidersHorizontal,
  Award,
  FileText,
} from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'FACULTY' | 'STUDENT' | 'COORDINATOR';
}

export const UserManualModal: React.FC<UserManualModalProps> = ({
  isOpen,
  onClose,
  role,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('lab-record-print-active');
    } else {
      document.body.classList.remove('lab-record-print-active');
    }
    return () => {
      document.body.classList.remove('lab-record-print-active');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isFaculty = role === 'FACULTY';
  const isCoordinator = role === 'COORDINATOR';

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-2 sm:p-4 print:p-0 print:bg-white print:static print-modal-container">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden print:w-full print:h-auto print:border-none print:shadow-none print:rounded-none text-slate-900">
        
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs ${
                isCoordinator ? 'bg-violet-600' : isFaculty ? 'bg-indigo-600' : 'bg-emerald-600'
              }`}
            >
              {isCoordinator ? (
                <UserCog className="w-5 h-5" />
              ) : isFaculty ? (
                <Users className="w-5 h-5" />
              ) : (
                <GraduationCap className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  {isCoordinator
                    ? 'Course Coordinator Administration Manual'
                    : isFaculty
                    ? 'Faculty Examination & Administration Manual'
                    : 'Student Examination Manual & SOP Guide'}
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    isCoordinator
                      ? 'bg-violet-100 text-violet-800 border border-violet-200'
                      : isFaculty
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isCoordinator
                    ? 'Coordinator Portal Guide'
                    : isFaculty
                    ? 'Faculty Portal Guide'
                    : 'Student Portal Guide'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isCoordinator
                  ? 'Standard operating procedures for managing authorized course teachers, password security, and OTP recovery.'
                  : isFaculty
                  ? 'SOP for ESE Practical Mode, Dynamic LAB/ESE Rubrics, question banks, marksheet exports, and proctoring audit.'
                  : 'Operational guidelines for program switching, draft auto-saving, error debugging, proctoring compliance, and Lab Record PDF export.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`px-3.5 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition ${
                isCoordinator
                  ? 'bg-violet-600 hover:bg-violet-700'
                  : isFaculty
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
              title="Print to PDF or physical printer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-800 text-sm leading-relaxed print:overflow-visible print:p-2 print:text-black print:text-xs">
          {isCoordinator ? (
            /* ======================================================== */
            /*                COORDINATOR USER MANUAL ONLY              */
            /* ======================================================== */
            <>
              <div className="border-b-2 border-violet-500/40 pb-6 print:border-black">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-600 print:text-black">
                      Course Coordinator Guide
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 print:text-black print:text-xl">
                      JavaLabPro: Course Coordinator &amp; Handler Directory Manual
                    </h1>
                    <p className="text-slate-500 text-xs mt-1 print:text-gray-700">
                      Managing Course Handlers in the Faculty Sheet, Account Password Security, and Email OTP Recovery
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-violet-600 print:text-black">Portal: /#/coordinator</div>
                    <div className="text-[11px] text-slate-500 print:text-gray-600">Auth Tab: CoordinatorAuth</div>
                    <div className="text-[11px] text-emerald-600 print:text-black font-semibold mt-0.5">Directory Tab: Faculty</div>
                  </div>
                </div>
              </div>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1">
                  <span className="w-6 h-6 rounded-md bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">1</span>
                  Authentication, Password Security &amp; OTP Recovery
                </h2>
                <ul className="text-xs list-disc list-inside space-y-1.5 text-slate-700">
                  <li><strong>Coordinator Sign-In:</strong> Open <code className="font-mono font-bold">/#/coordinator</code> and sign in using the Coordinator credentials configured in the <code className="font-mono">CoordinatorAuth</code> tab of the connected Google Sheet.</li>
                  <li><strong>Forgot Password (Email OTP):</strong> Click <strong>Forgot Password?</strong> on the sign-in screen, enter your registered Official Email ID, retrieve the 6-digit OTP sent via Google Apps Script (<code className="font-mono">MailApp.sendEmail</code>, valid for 10 minutes), verify the OTP, and set a new password.</li>
                  <li><strong>Update Password Anytime:</strong> Click <strong>Change Password</strong> in the dashboard header whenever you want to update your password or register an Official Email ID.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1">
                  <span className="w-6 h-6 rounded-md bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">2</span>
                  Adding &amp; Editing Course Handlers (Faculty Sheet)
                </h2>
                <ul className="text-xs list-disc list-inside space-y-1.5 text-slate-700">
                  <li><strong>Add Course Handler:</strong> Enter the faculty member&apos;s <strong>Official Email</strong>, <strong>Name</strong>, and <strong>Department</strong>, then click <strong>Add Course Handler</strong> to append them directly to the <code className="font-mono">Faculty</code> tab in Google Sheets.</li>
                  <li><strong>Edit Existing Teacher:</strong> Click <strong>Edit User</strong> beside any teacher row in the directory to load their details into the editor form. Modify the Email, Name, or Department and click <strong>Save Changes</strong> to update that exact row in Google Sheets.</li>
                  <li><strong>Live Faculty Authentication Sync:</strong> Faculty login on <code className="font-mono">/#/faculty</code> validates strictly against the <code className="font-mono">Faculty</code> sheet tab—any teacher added or updated by the Coordinator receives immediate portal access.</li>
                </ul>
              </section>
            </>
          ) : isFaculty ? (
            /* ======================================================== */
            /*                FACULTY USER MANUAL ONLY                  */
            /* ======================================================== */
            <>
              {/* Cover Header */}
              <div className="border-b-2 border-indigo-500/40 pb-6 print:border-black">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 print:text-black">
                      Faculty &amp; Administrator Guide
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 print:text-black print:text-xl">
                      JavaLabPro: Faculty Examination &amp; Course Management Manual
                    </h1>
                    <p className="text-slate-500 text-xs mt-1 print:text-gray-700">
                      SOP for ESE Practical Mode, Question Bank, Dynamic LAB/ESE Rubrics, Lab Record Inspection &amp; Proctoring Audit
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-indigo-600 print:text-black">Portal: /#/faculty</div>
                    <div className="text-[11px] text-slate-500 print:text-gray-600">Auth: Validated via Faculty Sheet</div>
                    <div className="text-[11px] text-emerald-600 print:text-black font-semibold mt-0.5">Execution: Eclipse Temurin JDK 17</div>
                  </div>
                </div>
              </div>

              {/* Section 1: Configuration & ESE Practical Switch */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1 print:text-black print:border-black">
                  <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold print:border print:border-black">1</span>
                  Live ESE Practical Mode Switch &amp; Environment Security
                </h2>
                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                    <span>Student Exam Visibility Mode (ExamConfig Sheet)</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Regular Lab Mode (ESE OFF):</strong> Students on <code className="font-mono">/#/student</code> see only <strong>LAB</strong> exercises and have access to the <strong>Generate Lab Record (PDF)</strong> workflow.</li>
                    <li><strong>ESE Practical Exam Mode (ESE ON):</strong> Enable the toggle in the top banner and customize the exam title (e.g., <em>BCB52003 End Semester Practical Examination</em>). The Student IDE switches immediately to display only <strong>ESE</strong> questions and hides Lab Record generation during the exam.</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed">
                  VITE_APPS_SCRIPT_URL=&quot;https://script.google.com/macros/s/AKfycbx.../exec&quot;<br />
                  VITE_RENDER_SERVICE_URL=&quot;https://java-runner-xxxx.onrender.com/execute&quot;<br />
                  VITE_API_SECRET=&quot;MY_SECURE_LAB_KEY_123&quot;
                </div>
              </section>

              {/* Section 2: Faculty Dashboard Tabs */}
              <section className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1 print:text-black print:border-black">
                  <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold print:border print:border-black">2</span>
                  Faculty Dashboard Capabilities &amp; Workflows
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-indigo-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>1. Question Bank (LAB &amp; ESE)</span>
                    </div>
                    <ul className="text-xs list-disc list-inside space-y-1 text-slate-700">
                      <li><strong>Part 1 Seed &amp; Tagging:</strong> Click <strong>Load 5 Part 1 Experiments</strong> to seed the Google Java Style refactoring, static analysis, and peer review labs, or create custom <strong>LAB</strong> / <strong>ESE</strong> tasks.</li>
                      <li><strong>Access Windows &amp; Starter Code:</strong> Gate availability via Open/Close timestamps and preload intentionally non-compliant starter Java templates for refactoring.</li>
                      <li><strong>Public &amp; Hidden Test Cases:</strong> Public input/output lets students test; Hidden private test cases verify functional equivalence after refactoring.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-violet-700 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-violet-600" />
                      <span>2. Dynamic Rubrics &amp; Lab Record Approval</span>
                    </div>
                    <ul className="text-xs list-disc list-inside space-y-1 text-slate-700">
                      <li><strong>Configure Rubrics (LAB &amp; ESE):</strong> Customize rubric criterion labels, max marks, and auto-scoring rules (saved to <code className="font-mono">RubricTemplates</code>; e.g., 10 Marks for LAB, 50 Marks for ESE).</li>
                      <li><strong>Evaluate &amp; Approve Records:</strong> Grade manually or run <strong>Auto-Evaluate Pending</strong>. Approving a student&apos;s Lab Record unlocks PDF download on their portal.</li>
                      <li><strong>Lab Record Preview &amp; Print:</strong> Inspect clean A4 Lab Record pages (Title Page, Bonafide, INDEX with blank <em>Faculty Sign</em> column for hard-copy signing, and formatted Experiment outputs).</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>3. Submissions Hub &amp; Code Audit</span>
                    </div>
                    <ul className="text-xs list-disc list-inside space-y-1 text-slate-700">
                      <li><strong>Code, Quality &amp; Review Viewer:</strong> Inspect submitted Java source code alongside Style/Static Quality Score, Code-Quality Report fixes, and Peer Review Checklist resolutions.</li>
                      <li><strong>Re-Run Sandbox Test:</strong> Re-verify student submissions against test cases on demand.</li>
                      <li><strong>Automated Scoring:</strong> 100/100 (All Pass), 50/100 (Partial Pass), or 0/100 (Failed / Compile Error / Timeout).</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-rose-700 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>4. Anti-Cheating, Proxy Audit &amp; Student Roster</span>
                    </div>
                    <ul className="text-xs list-disc list-inside space-y-1 text-slate-700">
                      <li><strong>Fullscreen &amp; Paste Monitoring:</strong> Logs fullscreen exits and blocked clipboard paste events per student.</li>
                      <li><strong>Multi-Student Proxy Detection:</strong> Audits Device IDs and captured Google accounts (<code className="font-mono">LoginAudit</code>) and flags shared devices across multiple RegNos.</li>
                      <li><strong>Roster Management:</strong> Enroll or bulk-import students into the <code className="font-mono">Students</code> sheet for live sign-in verification.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3: Marksheet & Assessment Exports */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1 print:text-black print:border-black">
                  <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold print:border print:border-black">3</span>
                  Official Assessment Results &amp; Dynamic Marksheet Exports
                </h2>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                  <p>Export marksheets separately for <strong>LAB</strong> and <strong>ESE</strong> from <strong>Rubric Evaluations &amp; Records</strong> or <strong>Export Results</strong>:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Dynamic LAB / ESE Marksheet (CSV):</strong> Exports per-criterion marks matching your active rubric template, totals, faculty remarks, and integrity status (UTF-8 BOM for Microsoft Excel).</li>
                    <li><strong>Consolidated Coding Score Marksheet (CSV):</strong> Aggregated per student with Reg No, Name, per-exercise best scores, total marks, and percentage.</li>
                    <li><strong>Detailed Submissions &amp; Violations Audit (CSV / JSON):</strong> Complete chronological audit trail of test runs, device login audits, and proctoring incidents.</li>
                  </ul>
                </div>
              </section>
            </>
          ) : (
            /* ======================================================== */
            /*                STUDENT USER MANUAL ONLY                  */
            /* ======================================================== */
            <>
              {/* Cover Header */}
              <div className="border-b-2 border-emerald-500/40 pb-6 print:border-black">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 print:text-black">
                      Student Candidate Guide
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 print:text-black print:text-xl">
                      JavaLabPro: Student Examination &amp; Online IDE Manual
                    </h1>
                    <p className="text-slate-500 text-xs mt-1 print:text-gray-700">
                      Guidelines for Program Toggling, Draft Auto-Saving, Error Debugging, Proctoring Compliance &amp; Official Lab Records
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-emerald-600 print:text-black">Portal: /#/student</div>
                    <div className="text-[11px] text-slate-500 print:text-gray-600">Runtime: Eclipse Temurin OpenJDK 17</div>
                    <div className="text-[11px] text-amber-700 print:text-black font-semibold mt-0.5">Integrity: Active Proctoring Guard</div>
                  </div>
                </div>
              </div>

              {/* Section 1: Step-by-Step Workflow */}
              <section className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1 print:text-black print:border-black">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold print:border print:border-black">1</span>
                  Examination Workflow: Step-by-Step
                </h2>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 text-xs">Step 1: Sign In &amp; Verify Credentials</div>
                    <p className="text-xs text-slate-700 mt-1">
                      Open <code className="text-emerald-700 bg-slate-100 px-1 py-0.5 rounded">/#/student</code> and enter your Official University Email (<code className="font-mono">@student.hindustanuniv.ac.in</code>) and Registration Number. Credentials are validated live against the <code className="font-mono">Students</code> sheet. Your portal automatically shows <strong>Lab Exercises</strong> during regular labs or <strong>ESE Practical</strong> questions when Faculty enables ESE Exam Mode.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 text-xs">Step 2: Toggle Between Programs, Auto-Save &amp; Save Draft</div>
                    <p className="text-xs text-slate-700 mt-1">
                      Select any question from the <strong>Scheduled Questions</strong> panel, the <strong>Program</strong> dropdown, or the <strong>Prev / Next</strong> buttons above the editor. Your code and test outputs are <strong>auto-saved per program</strong> in your browser, and you can click <strong>Save Draft</strong> anytime (showing a <code className="font-mono">SAVED</code> badge) so you can move between questions without losing incomplete code. Use two-click <strong>Reset</strong> (<em>Confirm Reset?</em>) only when you want to restore starter boilerplate.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 text-xs">Step 3: Refactor Java 17 Code &amp; Run Industry Linter / Auto-Formatter</div>
                    <p className="text-xs text-slate-700 mt-1">
                      Refactor the starter code in <code>Main.java</code> to comply with Google Java Style: <code>lowerCamelCase</code> methods/variables, <code>UPPER_SNAKE_CASE</code> <code>static final</code> constants, 4-space K&amp;R formatting (<strong>Auto-Format</strong> button), and Javadoc comments.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 text-xs">Step 4: Static Code Analysis, Code-Quality Report &amp; Peer Code Review</div>
                    <p className="text-xs text-slate-700 mt-1">
                      Click <strong>Analyze</strong> and open the <strong>Lint &amp; Static Analysis</strong> tab to inspect detected rules (String <code>==</code>, unused variables, magic numbers, empty catch, resource leaks), import issues, and document fixes applied in the <strong>Code-Quality Report</strong>. Then open the <strong>Peer Review Checklist</strong> tab to record reviewer details, checklist statuses, comments, and resolutions.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 text-xs">Step 5: Run Functional Tests &amp; Official Submit</div>
                    <p className="text-xs text-slate-700 mt-1">
                      Click <strong>Run Public Tests</strong> to verify functional output and debug any errors, then click <strong>Submit Code</strong> to evaluate both Public and Hidden test cases and attach your Quality Report &amp; Peer Review artifact to Google Sheets.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: Anti-Cheating Policies */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1 print:text-black print:border-black">
                  <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold print:border print:border-black">2</span>
                  Anti-Cheating Rules &amp; Proctoring Policies
                </h2>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">
                    Automated proctoring guards monitor your examination session:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li><strong className="text-slate-900">Fullscreen Lock:</strong> Maintain fullscreen mode throughout the test. Minimizing or escaping triggers a violation flag.</li>
                    <li><strong className="text-slate-900">Clipboard Paste Block:</strong> Copy-pasting code into the editor is strictly blocked. All code must be typed directly.</li>
                    <li><strong className="text-slate-900">One Student Per Device:</strong> Do not sign in with multiple Registration Numbers on the same browser/device during assessments.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Lab Record Generator */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1 print:text-black print:border-black">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold print:border print:border-black">3</span>
                  Generating &amp; Submitting Your Official Lab Record (PDF)
                </h2>
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs text-emerald-950">
                  <p className="font-semibold flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>Available during Regular Lab Mode via <strong>Generate Lab Record (PDF)</strong>:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li><strong>Section 1 — Preview, Download &amp; Upload Logo:</strong> Click <strong>Download Official Logo</strong> to save <code className="font-mono">HITS_LOGO_2025.jpg</code>, then upload it using <strong>Upload Hindustan Logo</strong> (or click the logo space on Page 1). Edit your Procedure/Algorithm steps if needed and verify your formatted program outputs.</li>
                    <li><strong>Section 2 — Submit Record to Faculty:</strong> Confirm your Name and Registration Number and click <strong>Submit Record to Faculty</strong> for rubric evaluation.</li>
                    <li><strong>Section 3 — Download &amp; Print Official PDF:</strong> Once Faculty approves your record, PDF export unlocks automatically. Clicking <strong>Download / Print Official PDF</strong> outputs A4 pages starting cleanly at <strong>Page 1 (Title Page)</strong>, <strong>Page 2 (Bonafide Certificate)</strong>, <strong>Page 3 (INDEX Table with blank Faculty Sign column for hard-copy signing)</strong>, and <strong>Pages 4+ (Experiment Sheets)</strong>.</li>
                  </ul>
                </div>
              </section>
            </>
          )}

          {/* Footer sign-off */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 print:text-black print:border-black">
            <div>JavaLabPro — Industry Coding Standard with Web Script Automation (Part 1 Lab)</div>
            <div>
              {isCoordinator
                ? 'Course Coordinator Portal'
                : isFaculty
                ? 'Faculty Management Portal'
                : 'Student Examination Portal'}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

