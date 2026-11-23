import {
  CodeQualityReportEntry,
  PeerReviewChecklistItem,
  PeerReviewRecord,
  QualityIssue,
  StaticAnalysisResult,
} from '../types';

const JAVA_PRIMITIVE_OR_COMMON_TYPES =
  '(?:int|long|double|float|boolean|char|byte|short|String|Scanner|StringBuilder|BigDecimal)';

export function createDefaultPeerReview(): PeerReviewRecord {
  const checklist: PeerReviewChecklistItem[] = [
    {
      id: 'chk_naming',
      criterion: 'Naming Conventions (PascalCase classes, camelCase variables/methods, UPPER_SNAKE_CASE constants)',
      status: 'PASS',
      comment: '',
      resolution: '',
    },
    {
      id: 'chk_formatting',
      criterion: 'Formatting & Indentation (4-space indent, K&R braces, operator spacing, <= 100 chars/line)',
      status: 'PASS',
      comment: '',
      resolution: '',
    },
    {
      id: 'chk_comments',
      criterion: 'Javadoc & Commenting (Class & method Javadoc present; no dead commented-out code)',
      status: 'PASS',
      comment: '',
      resolution: '',
    },
    {
      id: 'chk_static',
      criterion: 'Static Analysis Clean (No magic numbers, String ==, unused variables, empty catch, or unclosed Scanner)',
      status: 'PASS',
      comment: '',
      resolution: '',
    },
    {
      id: 'chk_modularity',
      criterion: 'Modularity & Readability (Clear separation of helper methods, low nesting depth, meaningful identifiers)',
      status: 'PASS',
      comment: '',
      resolution: '',
    },
    {
      id: 'chk_tests',
      criterion: 'Functional Correctness & Edge Cases (Public & private test cases pass cleanly)',
      status: 'PASS',
      comment: '',
      resolution: '',
    },
  ];

  return {
    reviewerName: '',
    reviewerRegNo: '',
    reviewedAt: new Date().toISOString().split('T')[0],
    overallVerdict: 'PENDING',
    checklist,
  };
}

/**
 * Normalize Java source code toward Google / Sun Industry Coding Standards:
 * - Convert tabs to 4 spaces
 * - Trim trailing whitespace
 * - Move Allman opening braces '{' onto previous header line
 * - Ensure single space after control keywords (if, for, while, switch, catch)
 * - Normalize excessive blank lines
 */
export function formatJavaCodeIndustryStyle(rawCode: string): string {
  const normalizedLines = rawCode.replace(/\r\n/g, '\n').split('\n');
  const mergedLines: string[] = [];

  for (let i = 0; i < normalizedLines.length; i++) {
    let line = normalizedLines[i].replace(/\t/g, '    ').replace(/[ \t]+$/g, '');

    // Collapse Allman style lone '{' onto previous non-empty line if it doesn't end with ';' or '{' or '}'
    if (line.trim() === '{' && mergedLines.length > 0) {
      const prevIdx = mergedLines.length - 1;
      const prevTrim = mergedLines[prevIdx].trim();
      if (
        prevTrim.length > 0 &&
        !prevTrim.endsWith('{') &&
        !prevTrim.endsWith('}') &&
        !prevTrim.endsWith(';') &&
        !prevTrim.startsWith('//')
      ) {
        mergedLines[prevIdx] = `${mergedLines[prevIdx]} {`;
        continue;
      }
    }

    // Add single space after control keywords: if(, for(, while(, switch(, catch(
    line = line.replace(/\b(if|for|while|switch|catch)\(/g, '$1 (');
    // Ensure space before opening brace: ){ -> ) {
    line = line.replace(/\)\{/g, ') {');

    mergedLines.push(line);
  }

  // Re-indent cleanly by brace depth while preserving Javadoc '*' alignment
  let indentLevel = 0;
  let inBlockComment = false;
  const formatted: string[] = [];
  let consecutiveBlanks = 0;

  for (const rawLine of mergedLines) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      consecutiveBlanks++;
      if (consecutiveBlanks <= 1) formatted.push('');
      continue;
    }
    consecutiveBlanks = 0;

    if (inBlockComment) {
      const indent = '    '.repeat(indentLevel);
      formatted.push(`${indent} ${trimmed.startsWith('*') ? trimmed : `* ${trimmed}`}`);
      if (trimmed.includes('*/')) {
        inBlockComment = false;
      }
      continue;
    }

    if (trimmed.startsWith('/*')) {
      const indent = '    '.repeat(indentLevel);
      formatted.push(`${indent}${trimmed}`);
      if (!trimmed.includes('*/')) {
        inBlockComment = true;
      }
      continue;
    }

    // Decrease indent before printing closing brace
    const startsWithClose = trimmed.startsWith('}');
    const effectiveLevel = startsWithClose ? Math.max(0, indentLevel - 1) : indentLevel;
    const indent = '    '.repeat(effectiveLevel);
    formatted.push(`${indent}${trimmed}`);

    // Update brace depth outside string/char literals
    let openCount = 0;
    let closeCount = 0;
    let inStr = false;
    let inChar = false;
    let esc = false;
    const codeOnly = trimmed.replace(/\/\/.*$/, '');
    for (let j = 0; j < codeOnly.length; j++) {
      const ch = codeOnly[j];
      if (esc) {
        esc = false;
        continue;
      }
      if (ch === '\\') {
        esc = true;
        continue;
      }
      if (ch === '"' && !inChar) inStr = !inStr;
      else if (ch === "'" && !inStr) inChar = !inChar;
      else if (!inStr && !inChar) {
        if (ch === '{') openCount++;
        if (ch === '}') closeCount++;
      }
    }
    indentLevel = Math.max(0, indentLevel + openCount - closeCount);
  }

  return formatted.join('\n').trim() + '\n';
}

/**
 * Industry Java Style Linter & Static Code Analyzer
 * Checks Google Java Style naming, formatting, Javadoc commenting, and PMD/SpotBugs static rules.
 */
export function analyzeJavaCodeQuality(rawCode: string): StaticAnalysisResult {
  const code = (rawCode || '').replace(/\r\n/g, '\n');
  const lines = code.split('\n');
  const issues: QualityIssue[] = [];

  if (!code.trim()) {
    return {
      qualityScore: 0,
      namingScore: 0,
      formattingScore: 0,
      commentingScore: 0,
      staticAnalysisScore: 0,
      issues: [
        {
          line: 1,
          ruleId: 'GJS-EMPTY-00',
          category: 'STATIC_ANALYSIS',
          severity: 'HIGH',
          message: 'Source file is empty.',
          suggestion: 'Write or refactor a valid Java class before running static analysis.',
        },
      ],
      summary: 'No code to analyze.',
      analyzedAt: new Date().toISOString(),
    };
  }

  let hasClassJavadoc = false;
  let hasMethodJavadoc = false;
  let hasScannerInit = false;
  let hasScannerClose = false;
  let nestingDepth = 0;
  let deepNestReported = false;
  const declaredVars: Array<{ name: string; line: number }> = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const lineNo = idx + 1;
    const line = lines[idx];
    const trimmed = line.trim();

    // Track Javadoc blocks
    if (trimmed.startsWith('/**')) {
      // Check next non-comment line after '*/'
      let endIdx = idx;
      while (endIdx < lines.length && !lines[endIdx].includes('*/')) endIdx++;
      const nextCode = lines
        .slice(endIdx + 1, endIdx + 4)
        .map((l) => l.trim())
        .find((l) => l.length > 0 && !l.startsWith('@'));
      if (nextCode && /\bclass\s+/.test(nextCode)) hasClassJavadoc = true;
      if (nextCode && /\b(public|private|protected|static)\b/.test(nextCode) && nextCode.includes('(')) {
        hasMethodJavadoc = true;
      }
    }

    // 1. FORMATTING CHECKS
    if (line.includes('\t')) {
      issues.push({
        line: lineNo,
        ruleId: 'GJS-FMT-01',
        category: 'FORMATTING',
        severity: 'LOW',
        message: 'Tab character used for indentation instead of spaces.',
        suggestion: 'Replace tabs with 4 spaces (or click Auto-Format Style).',
      });
    }

    if (line.length > 100) {
      issues.push({
        line: lineNo,
        ruleId: 'GJS-FMT-02',
        category: 'FORMATTING',
        severity: 'LOW',
        message: `Line exceeds 100-character industry column limit (${line.length} chars).`,
        suggestion: 'Wrap long expressions or string concatenations across lines.',
      });
    }

    if (trimmed === '{') {
      issues.push({
        line: lineNo,
        ruleId: 'GJS-FMT-03',
        category: 'FORMATTING',
        severity: 'LOW',
        message: 'Allman-style opening brace "{" on its own line.',
        suggestion: 'Place opening brace "{" at the end of the declaration line (K&R / Google Java Style).',
      });
    }

    if (/\b(if|for|while|switch|catch)\(/.test(trimmed)) {
      issues.push({
        line: lineNo,
        ruleId: 'GJS-FMT-04',
        category: 'FORMATTING',
        severity: 'LOW',
        message: 'Missing whitespace between control keyword and "(".',
        suggestion: 'Insert a space after if/for/while/switch (e.g., `if (...)`).',
      });
    }

    if (
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('/*') &&
      !trimmed.startsWith('*') &&
      !trimmed.startsWith('import ') &&
      /[a-zA-Z0-9_](?:==|!=|<=|>=|\+=|-=|\*=|\/=|=)[a-zA-Z0-9_"']/.test(
        trimmed.replace(/"[^"]*"/g, '""')
      )
    ) {
      issues.push({
        line: lineNo,
        ruleId: 'GJS-FMT-05',
        category: 'FORMATTING',
        severity: 'LOW',
        message: 'Missing spaces around assignment or comparison operator.',
        suggestion: 'Add spaces around `=`, `==`, `!=`, `<=`, `>=`, `+=` for readability.',
      });
    }

    // 2. COMMENTING & DEAD CODE CHECKS
    if (/^\/\/\s*(int|double|String|boolean|System\.out|for|if|return)\b/.test(trimmed)) {
      issues.push({
        line: lineNo,
        ruleId: 'GJS-DOC-03',
        category: 'COMMENTING',
        severity: 'MEDIUM',
        message: 'Commented-out dead code found.',
        suggestion: 'Remove obsolete commented-out statements; rely on version control history instead.',
      });
    }

    // Skip further code checks inside comments
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      continue;
    }

    const codeWithoutStrings = trimmed.replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/\/\/.*$/, '');

    // 3. NAMING CONVENTIONS CHECKS
    const classMatch = codeWithoutStrings.match(/\bclass\s+([A-Za-z_][A-Za-z0-9_]*)/);
    if (classMatch) {
      const clsName = classMatch[1];
      if (!/^[A-Z][A-Za-z0-9]*$/.test(clsName)) {
        issues.push({
          line: lineNo,
          ruleId: 'GJS-NAME-01',
          category: 'NAMING',
          severity: 'HIGH',
          message: `Class name "${clsName}" violates PascalCase (UpperCamelCase) convention.`,
          suggestion: `Rename class to PascalCase (e.g., "${clsName.charAt(0).toUpperCase() + clsName.slice(1).replace(/_([a-z])/g, (_, c) => c.toUpperCase())}").`,
        });
      }
    }

    // Constants: static final
    const constMatch = codeWithoutStrings.match(
      /\bstatic\s+final\s+[A-Za-z0-9_<>\[\]]+\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/
    );
    if (constMatch) {
      const constName = constMatch[1];
      if (!/^[A-Z][A-Z0-9_]*$/.test(constName)) {
        issues.push({
          line: lineNo,
          ruleId: 'GJS-NAME-03',
          category: 'NAMING',
          severity: 'MEDIUM',
          message: `Constant "${constName}" should use UPPER_SNAKE_CASE.`,
          suggestion: `Rename "${constName}" to uppercase snake case (e.g., TAX_RATE, MAX_LIMIT).`,
        });
      }
    }

    // Method names (excluding constructors and main)
    const methodMatch = codeWithoutStrings.match(
      /\b(?:public|private|protected)\s+(?:static\s+)?(?:[A-Za-z0-9_<>\[\]]+)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/
    );
    if (methodMatch) {
      const mName = methodMatch[1];
      if (mName !== 'main' && !/^[a-z][A-Za-z0-9]*$/.test(mName)) {
        issues.push({
          line: lineNo,
          ruleId: 'GJS-NAME-02',
          category: 'NAMING',
          severity: 'MEDIUM',
          message: `Method name "${mName}" violates lowerCamelCase convention.`,
          suggestion: 'Use descriptive lowerCamelCase verb-noun names (e.g., calculateTotal).',
        });
      }
    }

    // Variable declarations
    const isForHeader = /\bfor\s*\(/.test(codeWithoutStrings);
    const isConstLine = /\bstatic\s+final\b/.test(codeWithoutStrings);
    if (!isConstLine && !methodMatch) {
      const varDeclMatch = codeWithoutStrings.match(
        new RegExp(`\\b${JAVA_PRIMITIVE_OR_COMMON_TYPES}(?:\\[\\])?\\s+([^;()]+);`)
      );
      if (varDeclMatch) {
        const declPart = varDeclMatch[1];
        const names = declPart
          .split(',')
          .map((seg) => seg.split('=')[0].trim().replace(/\[\]$/, '').trim())
          .filter((n) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(n));

        for (const vName of names) {
          declaredVars.push({ name: vName, line: lineNo });

          if (vName.includes('_') || /^[A-Z]/.test(vName)) {
            issues.push({
              line: lineNo,
              ruleId: 'GJS-NAME-04',
              category: 'NAMING',
              severity: 'MEDIUM',
              message: `Variable "${vName}" violates lowerCamelCase naming standard.`,
              suggestion: 'Use lowerCamelCase without underscores or leading capitals (e.g., totalMarks).',
            });
          } else if (vName.length === 1 && !isForHeader && !['i', 'j', 'k', 'n'].includes(vName)) {
            issues.push({
              line: lineNo,
              ruleId: 'GJS-NAME-05',
              category: 'NAMING',
              severity: 'MEDIUM',
              message: `Non-descriptive single-letter identifier "${vName}".`,
              suggestion: `Replace "${vName}" with a meaningful domain name (e.g., itemPrice, studentScore).`,
            });
          }
        }
      }
    }

    // 4. STATIC CODE ANALYSIS CHECKS (PMD / SpotBugs patterns)
    if (/\bnew\s+Scanner\s*\(/.test(codeWithoutStrings)) hasScannerInit = true;
    if (/\.close\s*\(\s*\)/.test(codeWithoutStrings)) hasScannerClose = true;

    // String comparison using == or !=
    if (
      /(\b[A-Za-z_][A-Za-z0-9_]*\s*(?:==|!=)\s*"[^"]*")|("[^"]*"\s*(?:==|!=)\s*[A-Za-z_][A-Za-z0-9_]*)/.test(
        trimmed.replace(/\/\/.*$/, '')
      )
    ) {
      issues.push({
        line: lineNo,
        ruleId: 'SB-STR-EQ',
        category: 'STATIC_ANALYSIS',
        severity: 'HIGH',
        message: 'String compared using reference equality (`==` or `!=`) instead of `.equals()`.',
        suggestion: 'Use `"value".equals(variable)` or `variable.equals("value")` to compare String contents safely.',
      });
    }

    // Empty catch block
    if (/\bcatch\s*\([^)]+\)\s*\{\s*\}/.test(codeWithoutStrings)) {
      issues.push({
        line: lineNo,
        ruleId: 'PMD-EMPTY-CATCH',
        category: 'STATIC_ANALYSIS',
        severity: 'HIGH',
        message: 'Empty catch block silently swallows exceptions.',
        suggestion: 'Log or handle the exception meaningfully inside the catch block.',
      });
    }

    // Magic numbers inside conditionals or arithmetic (ignore 0, 1, 2, -1, array indexes, constants)
    if (
      !isConstLine &&
      !/\bfor\s*\(/.test(codeWithoutStrings) &&
      (/(?:>=|<=|>|<|==|\*|\/)\s*(?:\d+\.\d+|\b(?:[3-9]|\d{2,})\b)/.test(codeWithoutStrings))
    ) {
      issues.push({
        line: lineNo,
        ruleId: 'PMD-MAGIC-NUM',
        category: 'STATIC_ANALYSIS',
        severity: 'MEDIUM',
        message: 'Magic number literal detected in business logic.',
        suggestion: 'Extract literal thresholds/rates into a `private static final` UPPER_SNAKE_CASE constant.',
      });
    }

    // Switch without default
    if (/\bswitch\s*\(/.test(codeWithoutStrings)) {
      const switchSlice = lines.slice(idx, Math.min(lines.length, idx + 35)).join('\n');
      if (!/\bdefault\s*:/.test(switchSlice)) {
        issues.push({
          line: lineNo,
          ruleId: 'PMD-SWITCH-DEF',
          category: 'STATIC_ANALYSIS',
          severity: 'MEDIUM',
          message: '`switch` statement lacks a `default:` branch.',
          suggestion: 'Add a `default:` branch to handle unexpected inputs safely.',
        });
      }
    }

    // Control nesting depth check
    if (/\b(if|for|while|switch)\b/.test(codeWithoutStrings)) {
      nestingDepth++;
      if (nestingDepth >= 4 && !deepNestReported) {
        deepNestReported = true;
        issues.push({
          line: lineNo,
          ruleId: 'PMD-DEEP-NEST',
          category: 'STATIC_ANALYSIS',
          severity: 'MEDIUM',
          message: 'Deeply nested control flow (>= 4 levels) reduces maintainability.',
          suggestion: 'Use early returns or extract nested logic into a helper method.',
        });
      }
    }
    const closeBraces = (codeWithoutStrings.match(/\}/g) || []).length;
    if (closeBraces > 0) {
      nestingDepth = Math.max(0, nestingDepth - closeBraces);
    }
  }

  // Whole-file Javadoc & Resource & Unused Variable checks
  if (!hasClassJavadoc) {
    issues.push({
      line: 1,
      ruleId: 'GJS-DOC-01',
      category: 'COMMENTING',
      severity: 'MEDIUM',
      message: 'Missing class-level Javadoc (`/** ... */`) describing purpose and author.',
      suggestion: 'Add a `/** ... */` Javadoc block directly above your `public class` declaration.',
    });
  }

  if (!hasMethodJavadoc) {
    issues.push({
      line: 1,
      ruleId: 'GJS-DOC-02',
      category: 'COMMENTING',
      severity: 'LOW',
      message: 'Missing method-level Javadoc (`/** ... */`) on `main` or helper methods.',
      suggestion: 'Document method behavior, `@param`, and `@return` using Javadoc.',
    });
  }

  if (hasScannerInit && !hasScannerClose) {
    issues.push({
      line: 1,
      ruleId: 'PMD-RES-LEAK',
      category: 'STATIC_ANALYSIS',
      severity: 'MEDIUM',
      message: 'Resource leak risk: `Scanner` instance is opened without `.close()`.',
      suggestion: 'Call `scanner.close()` before exiting `main` (or use try-with-resources).',
    });
  }

  // Unused local variables
  for (const v of declaredVars) {
    const regex = new RegExp(`\\b${v.name}\\b`, 'g');
    const occurrences = (code.match(regex) || []).length;
    if (occurrences <= 1) {
      issues.push({
        line: v.line,
        ruleId: 'PMD-UNUSED-VAR',
        category: 'STATIC_ANALYSIS',
        severity: 'MEDIUM',
        message: `Local variable "${v.name}" is declared but never used.`,
        suggestion: `Remove unused variable "${v.name}" or use it in the computation.`,
      });
    }
  }

  // Sort issues by severity then line number, deduplicate identical line+ruleId
  const seen = new Set<string>();
  const uniqueIssues = issues
    .filter((item) => {
      const key = `${item.line}:${item.ruleId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.line - b.line);

  // Score calculation (100 max = 25 Naming + 25 Formatting + 20 Commenting + 30 Static Analysis)
  const penalty = (cat: QualityIssue['category'], maxPts: number) => {
    const catIssues = uniqueIssues.filter((i) => i.category === cat);
    const pts = catIssues.reduce(
      (sum, i) => sum + (i.severity === 'HIGH' ? 8 : i.severity === 'MEDIUM' ? 5 : 2),
      0
    );
    return Math.max(0, maxPts - pts);
  };

  const namingScore = penalty('NAMING', 25);
  const formattingScore = penalty('FORMATTING', 25);
  const commentingScore = penalty('COMMENTING', 20);
  const staticAnalysisScore = penalty('STATIC_ANALYSIS', 30);
  const qualityScore = Math.max(0, Math.min(100, namingScore + formattingScore + commentingScore + staticAnalysisScore));

  return {
    qualityScore,
    namingScore,
    formattingScore,
    commentingScore,
    staticAnalysisScore,
    issues: uniqueIssues,
    summary:
      uniqueIssues.length === 0
        ? 'All Google Java Style & Static Code Analysis checks passed (100/100).'
        : `Detected ${uniqueIssues.length} coding standard / static analysis issue(s). Quality Score: ${qualityScore}/100.`,
    analyzedAt: new Date().toISOString(),
  };
}

export function issuesToReportEntries(issues: QualityIssue[]): CodeQualityReportEntry[] {
  return issues.map((issue, idx) => ({
    id: `QR_${Date.now()}_${idx}`,
    ruleId: issue.ruleId,
    category: issue.category,
    severity: issue.severity,
    detectedIssue: `Line ${issue.line}: ${issue.message}`,
    fixApplied: `Applied fix: ${issue.suggestion}`,
  }));
}
