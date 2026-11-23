# JavaLabPro — Industry Coding Standard with Web Script Automation (Part 1 Lab)

An anti-cheating Java 17 Online Laboratory, **Industry Style Linter & Auto-Formatter**, **Static Code Analysis & Code-Quality Report**, **Peer Code Review Checklist**, Dynamic Rubric Evaluation, and Official A4 Lab Record platform tailored for **Part 1** of **Industry Coding Standard with Web Script Automation** at **Hindustan Institute of Technology and Science (Deemed to be University)**.

> **Scope Note**: This workspace implements **Part 1 only** (Java coding standards, Google Java Style linting/formatting & refactoring, static code analysis quality reporting, and peer code review checklist). Git/GitHub workflows and Selenium WebDriver automation are intentionally excluded.

---

## Table of Contents
1. [Part 1 Capabilities & Architecture](#1-part-1-capabilities--architecture)
2. [Three-Portal Routing Structure](#2-three-portal-routing-structure)
3. [The 5 Part 1 Lab Experiments (Account Class)](#3-the-5-part-1-lab-experiments-account-class)
4. [Student & Faculty Workflows](#4-student--faculty-workflows)
5. [Google Sheets Database Schema & `apps_script/Code.gs`](#5-google-sheets-database-schema--apps_scriptcodegs)
6. [Step-by-Step Deployment Guide](#6-step-by-step-deployment-guide)
7. [Environment Variables](#7-environment-variables)
8. [Directory Structure](#8-directory-structure)

---

## 1. Part 1 Capabilities & Architecture

- **Industry Coding Standard Linter & Auto-Formatter (`/src/utils/javaQualityAnalyzer.ts`)**:
  - Evaluates Java code against **Google Java Style** rules across 4 weighted dimensions (**0–100 Quality Score**):
    1. **Naming Conventions (25 pts)**: Enforces `lowerCamelCase` variables/methods, `UPPER_SNAKE_CASE` `static final` constants, meaningful identifier lengths, and `PascalCase` class/type names (`GJS-NAME-01..05`).
    2. **Formatting & Indentation (25 pts)**: Flags tabs vs. 4-space indentation, Allman-style `{` newline braces vs. K&R braces, missing operator/control-keyword spacing, >100 char lines, and multi-statement lines (`GJS-FMT-01..05`). Includes one-click **Auto-Format**.
    3. **Javadoc & Dead Code Hygiene (20 pts)**: Checks class/method Javadoc (`/** ... */`), `@param`/`@return` tags, and commented-out dead code (`GJS-DOC-01..03`).
    4. **Static Code Analysis (30 pts)**: Detects common PMD/SpotBugs defects (`SB-STR-EQ` String `==` comparison, `PMD-EMPTY-CATCH`, `PMD-MAGIC-NUM`, `PMD-SWITCH-DEF`, `PMD-DEEP-NEST`, `PMD-RES-LEAK` unclosed `Scanner`, `PMD-UNUSED-VAR`).
- **Interactive Code-Quality Report & Peer Code Review Checklist (`StudentIDE.tsx`)**:
  - **Lint & Static Analysis Tab**: Displays real-time score breakdown, line-numbered violations with remediation tips, one-click **Import Detected Issues**, and an editable **Code-Quality Report** table (`Detected Issue` → `Fix Applied`).
  - **Peer Review Checklist Tab**: Captures Reviewer Name, Reviewer RegNo, Overall Verdict (`APPROVED` / `CHANGES_REQUESTED` / `PENDING`), and a 6-item review checklist with per-item status (`PASS` / `NEEDS_FIX` / `N_A`), comments, and resolutions.
  - Both artifacts persist locally per student & exercise and attach cleanly to submissions in Google Sheets (`Submissions` Column N: `Quality & Review JSON`) as well as the printable A4 Practical Lab Record (`LabRecordModal.tsx`).
- **OpenJDK 17 Execution**:
  - Multi-class OOP Java programs (`class Account` + `public class Main`) execute via the sandboxed Docker OpenJDK 17 runner (`java-runner/server.js`), with the built-in client-side interpreter (`javaRunner.ts`) available for single-class procedural exercises.

---

## 2. Three-Portal Routing Structure

| Portal | Route | Audience | Core Features |
|---|---|---|---|
| **Student Portal** | `/#/student` | Enrolled Students | Verified login (`Students` tab + silent Device/Mail audit), 5 Part 1 `Account` Class Labs, **Auto-Format**, **Analyze** linter/static analyzer, **Code-Quality Report**, **Peer Review Checklist**, Public/Hidden test execution, A4 PDF Lab Record Generator. |
| **Faculty Portal** | `/#/faculty` | Course Teachers | Verified login (`Faculty` tab), **Load 5 Part 1 Experiments** one-click seeder, Question Bank (`LAB` & `ESE`), **Submissions Hub** with Quality Score & Peer Review inspector, **Part 1 Dynamic Rubrics** (`LAB` 10m / `ESE` 50m), Auto-Evaluate, Anti-Cheating & Proxy Monitor. |
| **Coordinator Portal** | `/#/coordinator` | Course Coordinator | SHA-256 authenticated login (`coordinator` / `Admin@123` default), password change & Email OTP reset (`CoordinatorAuth`), Add/Edit Course Handlers in `Faculty` sheet. |

---

## 3. The 5 Part 1 Lab Experiments (Account Class)

All 5 Part 1 experiments are mapped to **The Account Class** (`private int id = 0`, `private float balance = 100`, `private float annualInterestRate = 0`, default & parameterized constructors, accessors/mutators, `getMonthlyInterestRate()`, `getMonthlyInterest()`, `withdraw()`, `deposit()`, and the test driver with `id = 1122`, `balance = $20,000`, `annualInterestRate = 4.5%`, `withdraw($2,500)`, `deposit($3,000)`).

They load automatically out of the box (`src/data/part1Experiments.ts`), can be seeded into Google Sheets via **Exercise Manager → Load 5 Part 1 Experiments**, imported from `public/Exercises_Template.csv`, or seeded in Apps Script by running `seedPart1Experiments()`:

1. **`P1_EXP1` — Exp 1: Industry Naming Conventions & Refactoring (The Account Class)**
   - *Focus*: Rename `acc_id`, `bal_amt`, `ann_rate`, `w_amt`, `d_amt`, `Get_Monthly_Rate`, `Get_Monthly_Int`, `Withdraw_Amt`, and `Deposit_Amt` to `lowerCamelCase` and `private static final UPPER_SNAKE_CASE` constants; achieve >= 90/100 Quality Score and pass all functional test cases.
2. **`P1_EXP2` — Exp 2: Code Formatting, Indentation & Magic Constant Elimination (The Account Class)**
   - *Focus*: Convert tabs, Allman `{` braces, cramped operators, and multi-statement lines into 4-space K&R formatting; extract `DEFAULT_BALANCE`, `PERCENT_DIVISOR` (`100.0f`), and `MONTHS_IN_YEAR` (`12.0f`) constants.
3. **`P1_EXP3` — Exp 3: Javadoc Commenting & Dead Code Cleanup (The Account Class)**
   - *Focus*: Add class-level and method-level Javadoc (`/** ... */`, `@param`, `@return`) for `Account`, constructors, accessors/mutators, interest calculation, `withdraw()`, `deposit()`, and `Main`, and remove commented-out dead code.
4. **`P1_EXP4` — Exp 4: Static Code Analysis & Code-Quality Report (The Account Class)**
   - *Focus*: Run static code analysis to uncover unused variables (`tempFee`, `auditFlag`), `String ==` defects (`accountMode == "ACTIVE"`), unclosed `Scanner`, magic numbers, and deep conditional nesting in `withdraw()`; resolve all HIGH/MEDIUM defects and compile a complete Code-Quality Report.
5. **`P1_EXP5` — Exp 5: Peer Code Review Exercise & Final Refactoring (The Account Class)**
   - *Focus*: Perform complete Google Java Style refactoring + static defect remediation on `Account` & `Main` AND complete the 6-item Peer Code Review Checklist (reviewer metadata, checklist statuses, review comments, and resolutions).

---

## 4. Student & Faculty Workflows

### Part 1 Default Evaluation Rubrics
- **`LAB` (10 Marks Total)**:
  1. `Coding Standards & Refactoring` — **3 Marks** (`CODE_IMPLEMENTATION`)
  2. `Static Analysis & Quality Report` — **3 Marks** (`DOCUMENTATION` — factors in Code Quality Score & Report)
  3. `Peer Review & Documentation` — **2 Marks** (`DOCUMENTATION` — Javadoc + Peer Review Checklist)
  4. `Functional Test Execution` — **2 Marks** (`OUTPUT_TESTS`)
- **`ESE` (50 Marks Total)**:
  1. `Coding Standards & Linting` — **15 Marks**
  2. `Refactoring & Static Analysis` — **15 Marks**
  3. `Functional Execution & Output` — **10 Marks**
  4. `Peer Review & Viva-Voce` — **10 Marks**

---

## 5. Google Sheets Database Schema & `apps_script/Code.gs`

Run **`setupAllSheets()`** in Google Apps Script to initialize all **10 tabs** (or import the updated CSV templates from `/public/*_Template.csv`):

| Tab | Columns / Purpose |
|---|---|
| `Faculty` | `Email`, `Name`, `Department` |
| `Students` | `Email`, `RegNo`, `Name`, `Department` |
| `Exercises` | `Exercise ID`, `Title`, `Description`, `Open Time`, `Close Time`, `Public Input`, `Public Output`, `Private Input`, `Private Output`, `Starter Code`, `Category`, `Difficulty`, `Assessment Type` |
| `LoginAudit` | `Timestamp`, `Official Email`, `Reg No`, `Student Name`, `Recorded Mail ID`, `Device ID`, `Other RegNos Used`, `Multi-Student Status` |
| `Submissions` | Cols A–M (`Timestamp`..`Assessment Type`) + **Col N: `Quality & Review JSON`** (stores `qualityScore`, issue counts, `reportEntries`, and `peerReview`) |
| `Violations` | `Timestamp`, `Official Email`, `Recorded Mail ID`, `Reg No`, `Student Name`, `Exercise ID`, `Violation Type`, `Details`, `Severity`, `Device ID` |
| `Evaluations` | `Timestamp`, `Official Email`, `Recorded Mail ID`, `Reg No`, `Student Name`, `Status`, `Concept (5)`..`Total Marks (10)`, `Violations Count`, `Device ID`, `Multi-Student Flag`, `Faculty Remarks`, `Evaluated By`, `Assessment Type`, `Rubric Details JSON` |
| `CoordinatorAuth` | `Username`, `PasswordHash`, `OfficialEmail`, `MustChangePassword`, `OtpCode`, `OtpExpiry`, `UpdatedAt` |
| `ExamConfig` | `ConfigKey` (`ESE_MODE`, `ESE_TITLE`), `ConfigValue`, `UpdatedBy`, `UpdatedAt` |
| `RubricTemplates` | `AssessmentType`, `CriterionId`, `Label`, `Description`, `MaxMarks`, `AutoRule`, `DisplayOrder` *(initialized with Part 1 rubrics)* |

---

## 6. Step-by-Step Deployment Guide

### Step 1: Deploy Docker Java Runner (Render)
1. Create a **New Web Service** on [Render](https://dashboard.render.com/) connected to your repository.
2. Configure:
   - **Runtime**: `Docker`
   - **Root Directory**: `java-runner`
   - **Environment Variables**:
     - `PORT` = `3000`
     - `API_SECRET` = `<YOUR_STRONG_SECRET>`
3. Deploy and copy your endpoint URL ending in `/execute` (e.g., `https://java-runner-xxxx.onrender.com/execute`).

### Step 2: Set Up Google Sheets & Deploy `apps_script/Code.gs`
1. Create a new Google Spreadsheet (e.g., `ICSW_Part1_JavaLab_DB`).
2. Open **Extensions > Apps Script**, replace `Code.gs` with the full contents of **`apps_script/Code.gs`**, and click **Save**.
3. In the Apps Script toolbar, select **`setupAllSheets`** and click **Run** (grant permissions when prompted).
4. *(Optional)* Select **`seedPart1Experiments`** and click **Run** to immediately populate all 5 Part 1 experiments into the `Exercises` tab (or click **Load 5 Part 1 Experiments** inside the Faculty Portal).
   - *(Note: If upgrading an existing `RubricTemplates` tab, clear old rows 2+ first and re-run `setupAllSheets()`, or click **Configure Rubrics (LAB & ESE)** in the Faculty Portal.)*
5. Click **Deploy > New deployment** (or **Manage deployments > Edit > Version: `New version`**):
   - **Type**: `Web app`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
6. Copy the generated Web App URL ending in `/exec`.

### Step 3: Deploy Frontend (GitHub Pages / Node Host)
1. In your GitHub repository, open **Settings > Secrets and variables > Actions > Variables** and set:
   - `VITE_APPS_SCRIPT_URL` = your Google Apps Script `/exec` URL
   - `VITE_RENDER_SERVICE_URL` = your Render `/execute` URL
   - `VITE_API_SECRET` = matching `API_SECRET` from Render
   - `VITE_GOOGLE_CLIENT_ID` = *(optional)* Google OAuth Web Client ID
2. Under **Settings > Pages > Source**, select **GitHub Actions** (`.github/workflows/deploy.yml`).
3. Push to `main` or run the workflow manually. Access:
   - Coordinator Portal: `https://<username>.github.io/<repo>/#/coordinator`
   - Faculty Portal: `https://<username>.github.io/<repo>/#/faculty`
   - Student Portal: `https://<username>.github.io/<repo>/#/student`

### Local Development
```bash
cp .env.example .env
# Fill in VITE_APPS_SCRIPT_URL, VITE_RENDER_SERVICE_URL, VITE_API_SECRET
npm install
npm run dev
```

---

## 7. Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_APPS_SCRIPT_URL` | Yes (for cloud sync) | Google Apps Script Web App `/exec` URL |
| `VITE_RENDER_SERVICE_URL` | Optional (fallback built-in) | Render OpenJDK 17 `/execute` URL |
| `VITE_API_SECRET` | Matches Render `API_SECRET` | Shared header key `x-api-key` |
| `VITE_GOOGLE_CLIENT_ID` | Optional | Google Identity Services client ID for Gmail audit |

---

## 8. Directory Structure

```
├── .github/workflows/deploy.yml        # GitHub Pages CI/CD
├── apps_script/Code.gs                 # 10-tab REST API + Col N Quality/Review JSON + seedPart1Experiments
├── java-runner/                        # OpenJDK 17 Docker sandbox runner
├── public/                             # CSV templates (incl. 5 Part 1 Account exercises) & official HITS logo
├── src/
│   ├── components/
│   │   ├── CoordinatorPortal/          # Coordinator auth & faculty directory
│   │   ├── FacultyPortal/              # Question Bank + Part 1 Seeder, Submissions Hub, Dynamic Rubrics, Proxy Monitor
│   │   └── StudentPortal/              # Java 17 IDE + Linter/Static Analyzer + Code-Quality Report + Peer Review + A4 PDF Record
│   ├── data/
│   │   ├── part1Experiments.ts         # 5 Part 1 Java refactoring, static analysis & peer review labs (Account Class)
│   │   └── mockData.ts
│   ├── services/
│   │   ├── javaRunner.ts               # Dual-engine Java runner & improved built-in interpreter
│   │   └── sheetService.ts             # Google Apps Script REST client (with qualityArtifact sync)
│   ├── utils/
│   │   ├── javaQualityAnalyzer.ts      # Google Java Style linter, formatter, PMD/SpotBugs static analyzer
│   │   ├── rubricScoring.ts            # Part 1 dynamic rubric auto-scoring
│   │   └── ...
│   └── types/index.ts                  # Part 1 TypeScript interfaces & DEFAULT_RUBRIC_CONFIG
└── README.md
```
