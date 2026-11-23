import { Exercise } from '../types';

const OPEN_WINDOW = '2026-01-01T00:00';
const CLOSE_WINDOW = '2027-12-31T23:59';

const ACCOUNT_SPEC_BRIEF =
  'Account Class Specification:\n' +
  '• private int id (default 0), private float balance (default 100), private float annualInterestRate (default 0).\n' +
  '• Constructors: Account() and Account(int id, float balance, float annualInterestRate).\n' +
  '• Accessor & mutator methods for id, balance, and annualInterestRate.\n' +
  '• getMonthlyInterestRate() -> (annualInterestRate / 100.0f) / 12.0f\n' +
  '• getMonthlyInterest() -> balance * getMonthlyInterestRate()\n' +
  '• withdraw(float amount) and deposit(float amount)\n' +
  '• Test Program: id = 1122, balance = $20,000, annualInterestRate = 4.5%, withdraw $2,500, deposit $3,000, and print id, balance, monthly interest rate, and monthly interest.';

export const PART1_EXERCISES: Exercise[] = [
  {
    id: 'P1_EXP1',
    title: 'Exp 1: Industry Naming Conventions & Refactoring (The Account Class)',
    description:
      'Objective:\n' +
      'Refactor the non-compliant Account class and test driver to strictly follow Google Java Style naming conventions:\n' +
      '• Replace non-compliant fields/variables (acc_id, bal_amt, ann_rate, w_amt, d_amt) with exact lowerCamelCase names (id, balance, annualInterestRate, withdrawAmount, depositAmount).\n' +
      '• Rename methods (Get_Monthly_Rate, Get_Monthly_Int, Withdraw_Amt, Deposit_Amt) to lowerCamelCase (getMonthlyInterestRate, getMonthlyInterest, withdraw, deposit).\n' +
      '• Convert hardcoded values into private static final UPPER_SNAKE_CASE constants.\n\n' +
      ACCOUNT_SPEC_BRIEF +
      '\n\nInput Format:\nid (int), balance (float), annualInterestRate (float), withdrawAmount (float), depositAmount (float)\n' +
      'Output Format:\nAccount ID: <id>\nBalance: <2_decimals>\nMonthly Interest Rate: <5_decimals>\nMonthly Interest: <2_decimals>',
    category: 'Part 1: Naming & Formatting',
    difficulty: 'Easy',
    assessmentType: 'LAB',
    openTime: OPEN_WINDOW,
    closeTime: CLOSE_WINDOW,
    publicInput: '1122 20000 4.5 2500 3000',
    publicOutput: 'Account ID: 1122\nBalance: 20500.00\nMonthly Interest Rate: 0.00375\nMonthly Interest: 76.88',
    privateInput: '1001 10000 6.0 1500 500',
    privateOutput: 'Account ID: 1001\nBalance: 9000.00\nMonthly Interest Rate: 0.00500\nMonthly Interest: 45.00',
    starterCode: `import java.util.Scanner;

class Account {
    static final float def_bal = 100.0f;
    private int acc_id = 0;
    private float bal_amt = def_bal;
    private float ann_rate = 0.0f;

    public Account() {
    }

    public Account(int acc_id, float bal_amt, float ann_rate) {
        this.acc_id = acc_id;
        this.bal_amt = bal_amt;
        this.ann_rate = ann_rate;
    }

    public int get_id() { return acc_id; }
    public void set_id(int acc_id) { this.acc_id = acc_id; }
    public float get_bal() { return bal_amt; }
    public void set_bal(float bal_amt) { this.bal_amt = bal_amt; }
    public float get_rate() { return ann_rate; }
    public void set_rate(float ann_rate) { this.ann_rate = ann_rate; }

    public float Get_Monthly_Rate() {
        return (ann_rate / 100.0f) / 12.0f;
    }

    public float Get_Monthly_Int() {
        return bal_amt * Get_Monthly_Rate();
    }

    public void Withdraw_Amt(float a) {
        if (a > 0 && a <= bal_amt) bal_amt -= a;
    }

    public void Deposit_Amt(float d) {
        if (d > 0) bal_amt += d;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int i = s.nextInt();
        float b = s.nextFloat();
        float r = s.nextFloat();
        float w_amt = s.nextFloat();
        float d_amt = s.nextFloat();

        Account acc_obj = new Account(i, b, r);
        acc_obj.Withdraw_Amt(w_amt);
        acc_obj.Deposit_Amt(d_amt);

        System.out.println("Account ID: " + acc_obj.get_id());
        System.out.printf("Balance: %.2f%n", acc_obj.get_bal());
        System.out.printf("Monthly Interest Rate: %.5f%n", acc_obj.Get_Monthly_Rate());
        System.out.printf("Monthly Interest: %.2f%n", acc_obj.Get_Monthly_Int());
    }
}`,
  },
  {
    id: 'P1_EXP2',
    title: 'Exp 2: Code Formatting, Indentation & Magic Constant Elimination (The Account Class)',
    description:
      'Objective:\n' +
      'Apply industry formatting rules (4-space indentation, K&R braces, operator spacing, <= 100 char lines) and eliminate magic constants inside the Account class:\n' +
      '• Convert tabs, Allman `{` braces, and multi-statement lines into clean 4-space K&R formatting.\n' +
      '• Replace magic literals (`100.0f` default balance, `100.0f` percent divisor, `12.0f` months/year) with `private static final UPPER_SNAKE_CASE` constants.\n\n' +
      ACCOUNT_SPEC_BRIEF +
      '\n\nInput Format:\nid (int), balance (float), annualInterestRate (float), withdrawAmount (float), depositAmount (float)\n' +
      'Output Format:\nAccount ID: <id>\nBalance: <2_decimals>\nMonthly Interest Rate: <5_decimals>\nMonthly Interest: <2_decimals>',
    category: 'Part 1: Naming & Formatting',
    difficulty: 'Easy',
    assessmentType: 'LAB',
    openTime: OPEN_WINDOW,
    closeTime: CLOSE_WINDOW,
    publicInput: '1122 20000 4.5 2500 3000',
    publicOutput: 'Account ID: 1122\nBalance: 20500.00\nMonthly Interest Rate: 0.00375\nMonthly Interest: 76.88',
    privateInput: '1001 10000 6.0 1500 500',
    privateOutput: 'Account ID: 1001\nBalance: 9000.00\nMonthly Interest Rate: 0.00500\nMonthly Interest: 45.00',
    starterCode: `import java.util.Scanner;
class Account
{
\tprivate int id=0;
\tprivate float balance=100.0f;
\tprivate float annualInterestRate=0.0f;
\tpublic Account(){}
\tpublic Account(int id,float balance,float annualInterestRate)
\t{
\tthis.id=id;this.balance=balance;this.annualInterestRate=annualInterestRate;
\t}
\tpublic int getId(){return id;}
\tpublic void setId(int id){this.id=id;}
\tpublic float getBalance(){return balance;}
\tpublic void setBalance(float balance){this.balance=balance;}
\tpublic float getAnnualInterestRate(){return annualInterestRate;}
\tpublic void setAnnualInterestRate(float annualInterestRate){this.annualInterestRate=annualInterestRate;}
\tpublic float getMonthlyInterestRate(){return (annualInterestRate/100.0f)/12.0f;}
\tpublic float getMonthlyInterest(){return balance*getMonthlyInterestRate();}
\tpublic void withdraw(float amount){if(amount>0&&amount<=balance){balance-=amount;}}
\tpublic void deposit(float amount){if(amount>0){balance+=amount;}}
}
public class Main
{
\tpublic static void main(String[] args)
\t{
\tScanner sc=new Scanner(System.in);
\tint id=sc.nextInt();float bal=sc.nextFloat();float rate=sc.nextFloat();float wAmt=sc.nextFloat();float dAmt=sc.nextFloat();
\tAccount account=new Account(id,bal,rate);account.withdraw(wAmt);account.deposit(dAmt);
\tSystem.out.println("Account ID: "+account.getId());System.out.printf("Balance: %.2f%n",account.getBalance());System.out.printf("Monthly Interest Rate: %.5f%n",account.getMonthlyInterestRate());System.out.printf("Monthly Interest: %.2f%n",account.getMonthlyInterest());
\t}
}`,
  },
  {
    id: 'P1_EXP3',
    title: 'Exp 3: Javadoc Commenting & Dead Code Cleanup (The Account Class)',
    description:
      'Objective:\n' +
      'Document the Account class and test driver according to Javadoc standards and remove commented-out dead code:\n' +
      '• Add class-level Javadoc (`/** ... */`) above `Account` and `Main`.\n' +
      '• Add method-level Javadoc with `@param` and `@return` tags for constructors, getters/setters, `getMonthlyInterestRate()`, `getMonthlyInterest()`, `withdraw()`, and `deposit()`.\n' +
      '• Remove all obsolete commented-out code blocks.\n\n' +
      ACCOUNT_SPEC_BRIEF +
      '\n\nInput Format:\nid (int), balance (float), annualInterestRate (float), withdrawAmount (float), depositAmount (float)\n' +
      'Output Format:\nAccount ID: <id>\nBalance: <2_decimals>\nMonthly Interest Rate: <5_decimals>\nMonthly Interest: <2_decimals>',
    category: 'Part 1: Javadoc & Commenting',
    difficulty: 'Medium',
    assessmentType: 'LAB',
    openTime: OPEN_WINDOW,
    closeTime: CLOSE_WINDOW,
    publicInput: '1122 20000 4.5 2500 3000',
    publicOutput: 'Account ID: 1122\nBalance: 20500.00\nMonthly Interest Rate: 0.00375\nMonthly Interest: 76.88',
    privateInput: '1001 10000 6.0 1500 500',
    privateOutput: 'Account ID: 1001\nBalance: 9000.00\nMonthly Interest Rate: 0.00500\nMonthly Interest: 45.00',
    starterCode: `import java.util.Scanner;

class Account {
    private static final float PERCENT_DIVISOR = 100.0f;
    private static final float MONTHS_IN_YEAR = 12.0f;
    private int id = 0;
    private float balance = 100.0f;
    private float annualInterestRate = 0.0f;

    // private float legacyFee = 15.0f;

    public Account() {
    }

    public Account(int id, float balance, float annualInterestRate) {
        this.id = id;
        this.balance = balance;
        this.annualInterestRate = annualInterestRate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }

    public float getAnnualInterestRate() {
        return annualInterestRate;
    }

    public void setAnnualInterestRate(float annualInterestRate) {
        this.annualInterestRate = annualInterestRate;
    }

    public float getMonthlyInterestRate() {
        // double oldRate = annualInterestRate / 1200;
        return (annualInterestRate / PERCENT_DIVISOR) / MONTHS_IN_YEAR;
    }

    public float getMonthlyInterest() {
        return balance * getMonthlyInterestRate();
    }

    public void withdraw(float amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }

    public void deposit(float amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int accountId = scanner.nextInt();
        float initialBalance = scanner.nextFloat();
        float annualRate = scanner.nextFloat();
        float withdrawAmount = scanner.nextFloat();
        float depositAmount = scanner.nextFloat();
        // System.out.println("Debug: creating Account");

        Account account = new Account(accountId, initialBalance, annualRate);
        account.withdraw(withdrawAmount);
        account.deposit(depositAmount);

        System.out.println("Account ID: " + account.getId());
        System.out.printf("Balance: %.2f%n", account.getBalance());
        System.out.printf("Monthly Interest Rate: %.5f%n", account.getMonthlyInterestRate());
        System.out.printf("Monthly Interest: %.2f%n", account.getMonthlyInterest());
        scanner.close();
    }
}`,
  },
  {
    id: 'P1_EXP4',
    title: 'Exp 4: Static Code Analysis & Code-Quality Report (The Account Class)',
    description:
      'Objective:\n' +
      'Run Static Code Analysis on the Account implementation, fix every detected HIGH/MEDIUM defect, and prepare a formal Code-Quality Report:\n' +
      '• Fix unused variables (`tempFee`, `auditStatus`), `String ==` defect (`accountMode == "STANDARD"`), unclosed `Scanner`, magic numbers (`100.0f`, `12.0f`), and deep conditional nesting in `withdraw()`.\n' +
      '• Open "Lint & Static Analysis" -> click "Import Detected Issues" and record each issue and fix applied.\n\n' +
      ACCOUNT_SPEC_BRIEF +
      '\n\nInput Format:\nid (int), balance (float), annualInterestRate (float), withdrawAmount (float), depositAmount (float)\n' +
      'Output Format:\nAccount ID: <id>\nBalance: <2_decimals>\nMonthly Interest Rate: <5_decimals>\nMonthly Interest: <2_decimals>',
    category: 'Part 1: Static Code Analysis',
    difficulty: 'Medium',
    assessmentType: 'LAB',
    openTime: OPEN_WINDOW,
    closeTime: CLOSE_WINDOW,
    publicInput: '1122 20000 4.5 2500 3000',
    publicOutput: 'Account ID: 1122\nBalance: 20500.00\nMonthly Interest Rate: 0.00375\nMonthly Interest: 76.88',
    privateInput: '1001 10000 6.0 1500 500',
    privateOutput: 'Account ID: 1001\nBalance: 9000.00\nMonthly Interest Rate: 0.00500\nMonthly Interest: 45.00',
    starterCode: `import java.util.Scanner;

class Account {
    private int id = 0;
    private float balance = 100.0f;
    private float annualInterestRate = 0.0f;

    public Account() {
    }

    public Account(int id, float balance, float annualInterestRate) {
        this.id = id;
        this.balance = balance;
        this.annualInterestRate = annualInterestRate;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public float getBalance() { return balance; }
    public void setBalance(float balance) { this.balance = balance; }
    public float getAnnualInterestRate() { return annualInterestRate; }
    public void setAnnualInterestRate(float annualInterestRate) { this.annualInterestRate = annualInterestRate; }

    public float getMonthlyInterestRate() {
        return (annualInterestRate / 100.0f) / 12.0f;
    }

    public float getMonthlyInterest() {
        return balance * getMonthlyInterestRate();
    }

    public void withdraw(float amount) {
        String accountMode = "ACTIVE";
        if (accountMode == "ACTIVE") {
            if (amount > 0) {
                if (balance > 0) {
                    if (amount <= balance) {
                        balance -= amount;
                    }
                }
            }
        }
    }

    public void deposit(float amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int accountId = scanner.nextInt();
        float initialBalance = scanner.nextFloat();
        float annualRate = scanner.nextFloat();
        float withdrawAmount = scanner.nextFloat();
        float depositAmount = scanner.nextFloat();
        double tempFee = 25.0;
        boolean auditFlag = false;

        Account account = new Account(accountId, initialBalance, annualRate);
        account.withdraw(withdrawAmount);
        account.deposit(depositAmount);

        System.out.println("Account ID: " + account.getId());
        System.out.printf("Balance: %.2f%n", account.getBalance());
        System.out.printf("Monthly Interest Rate: %.5f%n", account.getMonthlyInterestRate());
        System.out.printf("Monthly Interest: %.2f%n", account.getMonthlyInterest());
    }
}`,
  },
  {
    id: 'P1_EXP5',
    title: 'Exp 5: Peer Code Review Exercise & Final Refactoring (The Account Class)',
    description:
      'Objective:\n' +
      'Perform a complete end-to-end refactoring and Peer Code Review exercise on the Account class:\n' +
      '1. Refactor the entire Account class and test program to pass all Google Java Style checks (naming, 4-space K&R formatting, Javadoc, `static final` constants, zero static analysis defects, >= 90/100 Quality Score).\n' +
      '2. Complete the 6-item Peer Code Review Checklist in the "Peer Review Checklist" tab (Reviewer Name, RegNo, Checklist Statuses, Review Comments, and Resolutions).\n' +
      '3. Verify the test case (id=1122, balance=20000, annualInterestRate=4.5%, withdraw=2500, deposit=3000) and hidden test case before submission.\n\n' +
      ACCOUNT_SPEC_BRIEF +
      '\n\nInput Format:\nid (int), balance (float), annualInterestRate (float), withdrawAmount (float), depositAmount (float)\n' +
      'Output Format:\nAccount ID: <id>\nBalance: <2_decimals>\nMonthly Interest Rate: <5_decimals>\nMonthly Interest: <2_decimals>',
    category: 'Part 1: Peer Code Review',
    difficulty: 'Hard',
    assessmentType: 'LAB',
    openTime: OPEN_WINDOW,
    closeTime: CLOSE_WINDOW,
    publicInput: '1122 20000 4.5 2500 3000',
    publicOutput: 'Account ID: 1122\nBalance: 20500.00\nMonthly Interest Rate: 0.00375\nMonthly Interest: 76.88',
    privateInput: '1001 10000 6.0 1500 500',
    privateOutput: 'Account ID: 1001\nBalance: 9000.00\nMonthly Interest Rate: 0.00500\nMonthly Interest: 45.00',
    starterCode: `import java.util.Scanner;
class Account
{
\tprivate int acc_id = 0;
\tprivate float bal = 100.0f;
\tprivate float ann_rate = 0.0f;
\tpublic Account(){}
\tpublic Account(int id,float balance,float annualInterestRate)
\t{
\t\tthis.acc_id=id;this.bal=balance;this.ann_rate=annualInterestRate;
\t}
\tpublic int getId(){return acc_id;}
\tpublic void setId(int id){this.acc_id=id;}
\tpublic float getBalance(){return bal;}
\tpublic void setBalance(float balance){this.bal=balance;}
\tpublic float getAnnualInterestRate(){return ann_rate;}
\tpublic void setAnnualInterestRate(float annualInterestRate){this.ann_rate=annualInterestRate;}
\tpublic float getMonthlyInterestRate(){return (ann_rate/100.0f)/12.0f;}
\tpublic float getMonthlyInterest(){return bal*getMonthlyInterestRate();}
\tpublic void withdraw(float a){
\t\t// float min_bal = 0.0f;
\t\tif(a>0&&a<=bal){bal-=a;}
\t}
\tpublic void deposit(float d){if(d>0){bal+=d;}}
}
public class Main
{
\tpublic static void main(String[] args)
\t{
\t\tScanner s=new Scanner(System.in);
\t\tint id=s.nextInt();float bal=s.nextFloat();float rate=s.nextFloat();float w_amt=s.nextFloat();float d_amt=s.nextFloat();
\t\tint unused_check=99;
\t\tString tier="ACTIVE";
\t\tAccount acc=new Account(id,bal,rate);
\t\tif(tier=="ACTIVE"){acc.withdraw(w_amt);acc.deposit(d_amt);}
\t\tSystem.out.println("Account ID: "+acc.getId());
\t\tSystem.out.printf("Balance: %.2f%n",acc.getBalance());
\t\tSystem.out.printf("Monthly Interest Rate: %.5f%n",acc.getMonthlyInterestRate());
\t\tSystem.out.printf("Monthly Interest: %.2f%n",acc.getMonthlyInterest());
\t}
}`,
  },
];
