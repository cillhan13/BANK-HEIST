// ===============================
// Bank Heist: Safe Code  -  game.js  (version 5)
// ===============================
// What is new in this version:
//   1. Real audio files (background music + sound effects) in the "audio" folder.
//   2. Four themes, each with its own bank of 24 questions.
//   3. Each game picks 10 random questions; 6 of them (random) hide a code digit.
//   4. Theme selection screen, navigation buttons and a full result screen.
// Version 4: 5 lives, 30-second timer, each code digit is shown TWICE
// (automatically), and a redesigned homepage.
// Version 5: a "Memorise the Safe Code" screen (5-second countdown) now appears
// between question 10 and the keypad. The code is hidden again when time is up.
// Your original features are still here: lives, score, timer,
// random safe code, keypad, vault door animation and the volume controls.

// ---------- 1. GAME DATA: THEMES AND QUESTION BANKS ----------
// Every theme has its own question bank (24 questions each).
// Each question has 4 options and "correct" = the index (0-3) of the right one.
// To add a question, copy one block and change the text. The game picks 10 at random.
const THEMES = {
  accounting: {
    name: "Accounting",
    icon: "\uD83D\uDCCA", // bar chart
    description: "Financial statements, assets, liabilities, equity, revenue, expenses and profit.",
    questions: [
      { text: "In the accounting equation, Assets = Liabilities + ____?",
        options: ["Revenue", "Equity", "Expenses", "Cash"], correct: 1 },
      { text: "Which financial statement shows a business's profit or loss over a period?",
        options: ["Balance Sheet", "Income Statement", "Cash Receipt", "Trial Balance"], correct: 1 },
      { text: "Which of these is a LIABILITY for a business?",
        options: ["Cash in the bank", "Inventory", "Equipment", "Accounts Payable"], correct: 3 },
      { text: "In double-entry bookkeeping, every transaction affects at least how many accounts?",
        options: ["One", "Two", "Three", "Four"], correct: 1 },
      { text: "Net profit is calculated as Revenue minus ____?",
        options: ["Assets", "Liabilities", "Expenses", "Equity"], correct: 2 },
      { text: "Which financial statement reports a business's financial position at a specific date?",
        options: ["Income Statement", "Statement of Cash Flows", "Balance Sheet", "Budget Report"], correct: 2 },
      { text: "What is the normal balance of an asset account?",
        options: ["Debit", "Credit", "Zero", "It depends on the month"], correct: 0 },
      { text: "Under accrual accounting, when is revenue recognised?",
        options: ["Only when cash is received", "When it is earned, even if cash has not yet been received",
                  "When the customer places an order", "At the end of the financial year only"], correct: 1 },
      { text: "A business buys office supplies with cash. What is the effect on the accounting equation?",
        options: ["One asset increases and another asset decreases", "Assets and liabilities both increase",
                  "Equity increases", "Liabilities decrease"], correct: 0 },
      { text: "Which of these is an EXPENSE?",
        options: ["Rent paid for the month", "Purchase of a delivery van", "Owner's capital contribution",
                  "Loan received from the bank"], correct: 0 },
      { text: "What is depreciation?",
        options: ["The increase in the market value of land", "A tax paid on profits",
                  "Spreading the cost of a long-term asset over its useful life", "Money owed to suppliers"], correct: 2 },
      { text: "Gross profit is calculated as Sales minus ____?",
        options: ["Operating expenses", "Cost of goods sold", "Tax", "Owner's drawings"], correct: 1 },
      { text: "A business has revenue of $50,000 and expenses of $32,000. What is its net profit?",
        options: ["$82,000", "$32,000", "$50,000", "$18,000"], correct: 3 },
      { text: "What does the going concern assumption mean?",
        options: ["The business will be sold next year", "The business will continue operating for the foreseeable future",
                  "The business has no debts", "The business earns a profit every year"], correct: 1 },
      { text: "What is the main purpose of a trial balance?",
        options: ["To show the profit for the year", "To list all the company's customers",
                  "To check that total debits equal total credits", "To calculate income tax"], correct: 2 },
      { text: "Which of these is a current asset?",
        options: ["Building", "Accounts Receivable", "Mortgage payable", "Retained earnings"], correct: 1 },
      { text: "What does the statement of cash flows report?",
        options: ["The cash coming into and going out of a business during a period", "The value of inventory only",
                  "The owner's personal bank balance", "The total number of employees"], correct: 0 },
      { text: "What do retained earnings represent?",
        options: ["Cash held in the bank", "Profits kept in the business rather than paid out as dividends",
                  "Money owed to shareholders", "The cost of buying equipment"], correct: 1 },
      { text: "The owner of a sole proprietorship withdraws cash for personal use. What is the effect?",
        options: ["Assets and equity both decrease", "Assets increase and equity decreases",
                  "Liabilities increase", "Revenue increases"], correct: 0 },
      { text: "The matching principle says that expenses should be recorded ____?",
        options: ["When they are paid, always", "In the same period as the revenues they helped to earn",
                  "At the end of the year only", "Before any revenue is earned"], correct: 1 },
      { text: "Which of these is an intangible asset?",
        options: ["Inventory", "Cash", "Patent", "Accounts Receivable"], correct: 2 },
      { text: "A business sells goods to a customer on credit. Which account is debited?",
        options: ["Accounts Payable", "Accounts Receivable", "Cash", "Owner's Capital"], correct: 1 },
      { text: "A business has assets of $80,000 and liabilities of $30,000. What is its equity?",
        options: ["$110,000", "$30,000", "$50,000", "$80,000"], correct: 2 },
      { text: "Prepaid insurance is classified as which type of account?",
        options: ["Asset", "Liability", "Revenue", "Expense"], correct: 0 },
      { text: "The historical cost principle says assets should be recorded at ____?",
        options: ["Their current market value", "Their original purchase cost",
                  "Their expected selling price", "Their value after tax"], correct: 1 }
    ]
  },

  auditing: {
    name: "Auditing",
    icon: "\uD83D\uDD0D", // magnifying glass
    description: "Audit evidence, internal controls, audit risk, independence and audit procedures.",
    questions: [
      { text: "What is the main objective of an external audit of financial statements?",
        options: ["To prepare the financial statements for the company",
                  "To give an opinion on whether the statements are fairly presented in all material respects",
                  "To find every single error in the accounts", "To increase the company's profit"], correct: 1 },
      { text: "Which type of audit evidence is generally the MOST reliable?",
        options: ["A verbal explanation from management", "A confirmation received directly from an independent third party",
                  "A photocopy of an internal memo", "An unsigned draft schedule from the client"], correct: 1 },
      { text: "What does segregation of duties mean?",
        options: ["One employee handles a transaction from start to finish",
                  "Different people handle authorising, recording and safeguarding assets",
                  "Auditors work in separate offices", "Managers approve their own expenses"], correct: 1 },
      { text: "What does auditor independence mean?",
        options: ["The auditor works without any audit team", "The auditor is free from conflicts of interest and influence, so judgement is objective",
                  "The auditor only works for one client", "The auditor is paid by commission"], correct: 1 },
      { text: "Which type of audit risk is the risk of a material misstatement before considering internal controls?",
        options: ["Inherent risk", "Detection risk", "Sampling frequency", "Reporting risk"], correct: 0 },
      { text: "What is control risk?",
        options: ["The risk that the auditor misses a misstatement",
                  "The risk that internal controls fail to prevent or detect a material misstatement",
                  "The risk that the client leaves the audit firm", "The risk of changes in tax law"], correct: 1 },
      { text: "What is detection risk?",
        options: ["The risk that the audit procedures fail to detect a material misstatement",
                  "The risk that employees steal inventory", "The risk that the company is sued",
                  "The risk that a computer system crashes"], correct: 0 },
      { text: "What does an unmodified (clean) audit opinion mean?",
        options: ["The company is guaranteed to be profitable", "The statements present fairly, in all material respects",
                  "The auditor found no transactions", "The company has no debt"], correct: 1 },
      { text: "In auditing, what is materiality?",
        options: ["The cost of the audit fee", "The physical materials used by a company",
                  "The size of a misstatement that could influence users' economic decisions",
                  "The number of audit staff needed"], correct: 2 },
      { text: "Observing the physical inventory count mainly provides evidence that inventory ____?",
        options: ["Actually exists", "Was bought at a discount", "Is insured", "Has been sold"], correct: 0 },
      { text: "Vouching involves tracing recorded transactions back to ____?",
        options: ["The trial balance", "Supporting documents such as invoices", "The auditor's report", "The notes to the statements"], correct: 1 },
      { text: "Which of these is a threat to auditor independence?",
        options: ["Holding a significant shareholding in the audit client", "Using audit software",
                  "Attending training courses", "Rotating audit staff"], correct: 0 },
      { text: "What is audit sampling?",
        options: ["Testing 100% of every transaction", "Applying audit procedures to less than 100% of a population",
                  "Tasting the client's products", "Asking management to choose the items"], correct: 1 },
      { text: "External auditors of a company report primarily to whom?",
        options: ["The shareholders (owners)", "The company's customers", "The company's suppliers", "The company's competitors"], correct: 0 },
      { text: "What is the key difference between fraud and error?",
        options: ["Fraud is always a small amount", "Fraud is intentional, while error is unintentional",
                  "Error is always found by the auditor", "There is no difference"], correct: 1 },
      { text: "What is professional scepticism?",
        options: ["Assuming management is always dishonest", "A questioning mind and critical assessment of audit evidence",
                  "Accepting everything the client says", "Refusing to complete the audit"], correct: 1 },
      { text: "What is the purpose of tests of controls?",
        options: ["To evaluate whether internal controls operate effectively", "To calculate the company's tax",
                  "To set the audit fee", "To prepare the financial statements"], correct: 0 },
      { text: "What are substantive procedures designed to do?",
        options: ["Train the client's staff", "Detect material misstatements in account balances and transactions",
                  "Change the accounting policies", "Approve management's bonuses"], correct: 1 },
      { text: "Sending confirmation requests to customers mainly provides evidence that accounts receivable ____?",
        options: ["Exist", "Are all overdue", "Are insured", "Were approved by the board"], correct: 0 },
      { text: "What is the role of an audit committee?",
        options: ["It prepares the daily bookkeeping", "A board sub-committee that oversees financial reporting and the audit",
                  "It sells the company's products", "It sets the marketing budget"], correct: 1 },
      { text: "In a going concern review, what does the auditor evaluate?",
        options: ["Whether management's use of the going concern assumption is appropriate",
                  "Whether the company will win new customers", "Whether employees are happy", "Whether the CEO will retire"], correct: 0 },
      { text: "When does an auditor issue an adverse opinion?",
        options: ["When the financial statements are materially and pervasively misstated",
                  "When the audit is finished early", "When the company makes a profit", "When the auditor is on holiday"], correct: 0 },
      { text: "What is a management representation letter?",
        options: ["A marketing brochure", "Written statements from management to the auditor about the financial statements",
                  "A tax return", "A job application"], correct: 1 },
      { text: "What does a cut-off test check?",
        options: ["That transactions are recorded in the correct accounting period", "That employees take breaks",
                  "That bank accounts are closed", "That the audit ends on time"], correct: 0 },
      { text: "Which of these is a DETECTIVE internal control?",
        options: ["Monthly bank reconciliation", "A password to log in to the system", "A locked inventory storeroom",
                  "Requiring approval before ordering"], correct: 0 }
    ]
  },

  finance: {
    name: "Finance",
    icon: "\uD83D\uDCB0", // money bag
    description: "Time value of money, interest and loans, investment and risk, budgeting.",
    questions: [
      { text: "What is compound interest?",
        options: ["Interest on the original amount only", "A fixed fee charged by the bank",
                  "Interest on the amount plus previously earned interest", "Tax paid on savings"], correct: 2 },
      { text: "In the popular 50/30/20 budgeting rule, what does the 20% go to?",
        options: ["Savings and debt repayment", "Entertainment", "Rent", "Groceries"], correct: 0 },
      { text: "Why is money today worth more than the same amount in the future?",
        options: ["Because it can be invested to earn a return", "Because banks print more money each year",
                  "Because future money is illegal", "Because prices never change"], correct: 0 },
      { text: "How much simple interest is earned on $1,000 at 5% per year for 2 years?",
        options: ["$50", "$100", "$110", "$150"], correct: 1 },
      { text: "What is $1,000 worth after 2 years at 10% interest compounded annually?",
        options: ["$1,200", "$1,100", "$1,210", "$1,020"], correct: 2 },
      { text: "What does 'present value' mean?",
        options: ["The value of a gift", "Today's value of money to be received in the future",
                  "The price of a product last year", "The total of all past profits"], correct: 1 },
      { text: "Diversification mainly helps to reduce which type of risk?",
        options: ["Company-specific (unsystematic) risk", "Inflation in the whole economy", "Interest rates in every country",
                  "The risk of a global recession"], correct: 0 },
      { text: "According to the risk-return trade-off, investments with higher potential returns usually have ____?",
        options: ["Higher risk", "Lower risk", "No risk", "Guaranteed profits"], correct: 0 },
      { text: "What does APR stand for, and what does it show?",
        options: ["Annual Percentage Rate: the yearly cost of borrowing", "Average Price Report: the cost of goods",
                  "Annual Profit Return: a company's profit", "Asset Purchase Rule: a tax rule"], correct: 0 },
      { text: "In a loan, what is the principal?",
        options: ["The original amount borrowed", "The interest charged", "The bank's profit", "The monthly late fee"], correct: 0 },
      { text: "What is a budget?",
        options: ["A plan for expected income and spending", "A type of bank loan", "A tax form", "A share of a company"], correct: 0 },
      { text: "How much do many experts suggest saving in an emergency fund?",
        options: ["One week of expenses", "Three to six months of living expenses", "Exactly $100", "Ten years of income"], correct: 1 },
      { text: "Which risk describes the loss of purchasing power of your returns over time?",
        options: ["Inflation risk", "Liquidity risk", "Default risk", "Currency exchange risk"], correct: 0 },
      { text: "What does owning a share of stock represent?",
        options: ["A loan to the company", "A part ownership of the company", "A guaranteed monthly income", "A government tax credit"], correct: 1 },
      { text: "What is a bond?",
        options: ["Part ownership of a company", "A loan to an issuer that pays interest", "A savings account fee", "A type of insurance"], correct: 1 },
      { text: "What does liquidity mean?",
        options: ["How quickly an asset can be turned into cash without losing value", "How much debt a person has",
                  "The interest rate on a loan", "The profit of a company"], correct: 0 },
      { text: "What is the decision rule for Net Present Value (NPV) when judging a project?",
        options: ["Accept the project if NPV is positive", "Accept the project if NPV is negative",
                  "Always reject projects", "Accept only if NPV equals zero"], correct: 0 },
      { text: "Using the Rule of 72, about how many years does it take money to double at 8% interest?",
        options: ["3 years", "6 years", "9 years", "12 years"], correct: 2 },
      { text: "What is a credit score used for?",
        options: ["To estimate how likely a person is to repay borrowed money", "To measure a person's salary",
                  "To calculate income tax", "To rank universities"], correct: 0 },
      { text: "What happens with a fixed-rate loan?",
        options: ["The interest rate stays the same during the loan term", "The interest rate changes every day",
                  "The loan never needs repaying", "Only interest is ever paid"], correct: 0 },
      { text: "How is net worth calculated?",
        options: ["Assets minus liabilities", "Income minus tax", "Liabilities minus assets", "Savings plus income"], correct: 0 },
      { text: "What is a dividend?",
        options: ["A fee paid to a stockbroker", "A portion of a company's profits paid to shareholders",
                  "A type of loan", "A government tax"], correct: 1 },
      { text: "Which of these is generally considered the LOWEST-risk investment?",
        options: ["Short-term government treasury bills", "Shares in a start-up", "Penny stocks", "Speculative cryptocurrency"], correct: 0 },
      { text: "In an amortising loan, what does each regular payment cover?",
        options: ["Interest and part of the principal", "Only interest", "Only fees", "Nothing until the end"], correct: 0 },
      { text: "In corporate finance, what is the main goal of a company's managers?",
        options: ["Maximise shareholder wealth", "Minimise the number of employees", "Avoid ever paying tax", "Maximise the number of products"], correct: 0 }
    ]
  },

  economics: {
    name: "Economics",
    icon: "\uD83D\uDCC8", // chart increasing
    description: "Supply and demand, inflation, opportunity cost, growth, micro and macroeconomics.",
    questions: [
      { text: "According to the law of demand, what happens when the price of a good rises (all else equal)?",
        options: ["Quantity demanded falls", "Quantity demanded rises", "Supply falls to zero", "Nothing changes"], correct: 0 },
      { text: "According to the law of supply, what happens when the price of a good rises (all else equal)?",
        options: ["Quantity supplied falls", "Quantity supplied rises", "Demand disappears", "Nothing changes"], correct: 1 },
      { text: "What is the equilibrium price?",
        options: ["The highest price a seller wants", "The price where quantity demanded equals quantity supplied",
                  "The price set by the government", "The lowest price in the market"], correct: 1 },
      { text: "What is inflation?",
        options: ["A fall in the general price level", "A sustained increase in the general price level",
                  "An increase in unemployment", "A fall in exports"], correct: 1 },
      { text: "What is opportunity cost?",
        options: ["The money paid for a product", "The value of the next best alternative given up",
                  "The cost of opening a business", "The tax on a purchase"], correct: 1 },
      { text: "What does GDP measure?",
        options: ["The total market value of final goods and services produced in a country in a period",
                  "The total savings of all households", "The number of people employed",
                  "The government's debt"], correct: 0 },
      { text: "What happens when the price is set below the equilibrium price?",
        options: ["A surplus", "A shortage", "Perfect balance", "Prices fall further"], correct: 1 },
      { text: "What is a normal good?",
        options: ["A good whose demand rises as consumer income rises", "A good whose demand falls as income rises",
                  "A good sold only by the government", "A good with no substitutes"], correct: 0 },
      { text: "Which of these is a MACROeconomic topic?",
        options: ["A single firm's pricing decision", "A household's grocery budget",
                  "The national unemployment rate", "How one consumer chooses between two goods"], correct: 2 },
      { text: "If the price of tea rises, what is likely to happen to the demand for coffee, a substitute?",
        options: ["It increases", "It decreases", "It stays exactly the same", "It becomes zero"], correct: 0 },
      { text: "What does price elasticity of demand measure?",
        options: ["How responsive quantity demanded is to a change in price", "The size of a firm's profit",
                  "The speed of delivery", "The level of taxes"], correct: 0 },
      { text: "What is a monopoly?",
        options: ["A market with many small sellers", "A market with a single seller", "A market with no buyers",
                  "A market run only by the government"], correct: 1 },
      { text: "A central bank raises interest rates. What is the usual aim?",
        options: ["To reduce borrowing and spending and help lower inflation", "To increase inflation",
                  "To print more money", "To lower taxes"], correct: 0 },
      { text: "What does fiscal policy involve?",
        options: ["Government spending and taxation", "Setting the central bank's interest rate",
                  "Company dividend decisions", "Exchange rate speculation"], correct: 0 },
      { text: "What is frictional unemployment?",
        options: ["Unemployment caused by workers moving between jobs or searching for one", "Unemployment caused by a deep recession",
                  "Unemployment caused by robots only", "Unemployment that never ends"], correct: 0 },
      { text: "Economic growth is usually measured by an increase in ____?",
        options: ["Real GDP", "Interest rates", "Prices only", "The number of banks"], correct: 0 },
      { text: "Which event would shift the supply curve to the LEFT?",
        options: ["A rise in the cost of raw materials", "A new, cheaper technology", "A fall in wages", "A government subsidy"], correct: 0 },
      { text: "What happens when a price ceiling is set below the equilibrium price?",
        options: ["A shortage", "A surplus", "No effect", "Higher quality goods"], correct: 0 },
      { text: "What is comparative advantage?",
        options: ["Producing a good at a lower opportunity cost than others", "Having the most factories",
                  "Selling at the highest price", "Having the largest population"], correct: 0 },
      { text: "What is the difference between real GDP and nominal GDP?",
        options: ["Real GDP is adjusted for inflation", "Nominal GDP is adjusted for inflation",
                  "Real GDP excludes services", "There is no difference"], correct: 0 },
      { text: "What does the economic problem of scarcity mean?",
        options: ["Resources are limited but wants are unlimited", "There are too many resources",
                  "Everything is free", "Only poor countries have shortages"], correct: 0 },
      { text: "What is deflation?",
        options: ["A general fall in the price level", "A general rise in the price level", "A rise in wages", "A fall in the population"], correct: 0 },
      { text: "What is an externality?",
        options: ["A cost or benefit that affects a third party who is not part of the transaction", "A tax on imports",
                  "A company's foreign branch", "A type of loan"], correct: 0 },
      { text: "Which two features describe a pure public good?",
        options: ["Non-excludable and non-rival", "Excludable and rival", "Expensive and rare", "Privately owned and taxed"], correct: 0 },
      { text: "Which statement best describes a recession?",
        options: ["A significant decline in economic activity, often two consecutive quarters of falling real GDP",
                  "A rapid rise in prices", "A period of record profits", "A rise in the stock market"], correct: 0 }
    ]
  }
};

// ---------- 2. SETTINGS (easy to change) ----------
const QUESTIONS_PER_GAME = 10;  // questions picked from the theme's bank each game
const CODE_LENGTH = 6;          // number of safe-code digits (must be <= QUESTIONS_PER_GAME)
const TOTAL_LIVES = 5;
const TIME_PER_QUESTION = 30;   // seconds
const POINTS_PER_CORRECT = 10;
const WARNING_SECONDS = 5;      // the "tick" warning starts at this many seconds left
const MAX_CODE_ATTEMPTS = 3;    // tries at the keypad before the alarm goes off
const DIGIT_SHOW_MS = 2000;     // how long a code digit is visible each time (2 seconds)
const MEMORISE_SECONDS = 5;     // how long the full code is shown before the keypad opens
const DIGIT_GAP_MS = 800;       // the pause (digit hidden) between the first and second showing

// Where the audio files live (relative to index.html).
// To use your own music, replace the file "audio/background-music.mp3"
// or change the path here.
const AUDIO_FILES = {
  music: "audio/background-music.mp3",
  correct: "audio/correct.mp3",
  wrong: "audio/wrong.mp3",
  unlock: "audio/unlock.mp3",
  gameover: "audio/gameover.mp3"
};

// ---------- 3. GAME STATE (values that change while playing) ----------
let currentQuestion = 0;
let lives = TOTAL_LIVES;
let score = 0;
let timeLeft = TIME_PER_QUESTION;
let timerId = null;
let answered = false;       // stops double-clicking on answers

let selectedThemeKey = null; // "accounting", "auditing", "finance" or "economics"
let gameQuestions = [];     // this game's 10 questions (shuffled)
let secretCode = [];        // the 6-digit secret code, e.g. [4, 0, 7, 2, 9, 1]. Never shown on screen.
let codeStatus = [];        // for each of the 6 digits: "pending", "found" or "missed"
let enteredCode = "";       // what the player has typed on the keypad
let attemptsLeft = MAX_CODE_ATTEMPTS;
let vaultBusy = false;      // true while the door opens or the alarm flashes
let pendingTimeouts = [];   // every setTimeout we start, so we can cancel them
let gameEnded = false;      // stops endGame from running twice
let memoTimerId = null;     // the ONE countdown on the memorise screen
let memoDeadline = 0;       // the clock time when the memorise countdown must end
let memoLastShown = -1;     // the last number shown, so we only update when it changes

// Statistics for the result screen (reset only when a new game session starts)
let correctCount = 0;
let incorrectCount = 0;
let digitsFound = 0;
let quizStartMs = 0;        // when the quiz began
let quizEndMs = null;       // when the game logically ended (frozen so animations do not add time)

// ---------- 4. GRAB HTML ELEMENTS ----------
const startScreen = document.getElementById("start-screen");
const themeScreen = document.getElementById("theme-screen");
const quizScreen = document.getElementById("quiz-screen");
const memoriseScreen = document.getElementById("memorise-screen");
const memoCodeEl = document.getElementById("memo-code");
const memoTimerEl = document.getElementById("memo-timer");
const memoBarFillEl = document.getElementById("memo-bar-fill");
const codeScreen = document.getElementById("code-screen");
const resultScreen = document.getElementById("result-screen");

const themeGridEl = document.getElementById("theme-grid");
const themeHintEl = document.getElementById("theme-hint");
const startQuizBtn = document.getElementById("start-quiz-btn");
const quizThemeBadge = document.getElementById("quiz-theme-badge");
const vaultThemeBadge = document.getElementById("vault-theme-badge");

const qNumberEl = document.getElementById("q-number");
const qTotalEl = document.getElementById("q-total");
const livesEl = document.getElementById("lives");
const scoreEl = document.getElementById("score");
const codeProgressEl = document.getElementById("code-progress");
const vaultProgressEl = document.getElementById("vault-progress");
const timerBar = document.getElementById("timer-bar");
const timeLeftEl = document.getElementById("time-left");
const questionTextEl = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");

const revealEl = document.getElementById("reveal");
const revealPosEl = document.getElementById("reveal-pos");
const revealTotalEl = document.getElementById("reveal-total");
const revealDigitEl = document.getElementById("reveal-digit");
const revealStatusEl = document.getElementById("reveal-status");

const vaultEl = document.getElementById("vault");
const lightEl = document.getElementById("light");
const codeDisplayEl = document.getElementById("code-display");
const vaultStatusEl = document.getElementById("vault-status");
const attemptsTextEl = document.getElementById("attempts-text");
const unlockBannerEl = document.getElementById("unlock-banner");

const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const finalScoreEl = document.getElementById("final-score");
const resResultEl = document.getElementById("res-result");
const resThemeEl = document.getElementById("res-theme");
const resCorrectEl = document.getElementById("res-correct");
const resIncorrectEl = document.getElementById("res-incorrect");
const resTimeEl = document.getElementById("res-time");
const resSafeEl = document.getElementById("res-safe");
const resDigitsEl = document.getElementById("res-digits");
const restartBtn = document.getElementById("restart-btn");

const audioBarEl = document.getElementById("audio-bar");
const musicBtn = document.getElementById("music-btn");
const volumeSlider = document.getElementById("volume-slider");


// ---------- 5. SOUND (music files + sound effects) ----------
// Music and the big sound effects (correct, wrong, unlock, game over) are real
// audio files in the "audio" folder. If a file is missing or cannot be played,
// the game automatically uses the old built-in synthesised sounds (Web Audio)
// instead, so the game never goes silent by accident.
const Sound = (function () {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  let supported = !!AudioCtor;
  let ctx = null;           // the Web Audio engine (used for the fallback sounds)
  let master = null;
  let musicBus = null;
  let noiseBuffer = null;
  let musicOn = true;       // is the music button ON?
  let wantMusic = false;    // true while the player is inside a game
  let volume = 0.6;
  let musicTimer = null;
  let musicStep = 0;
  let nextNoteTime = 0;
  let busyUntil = 0;
  const lastPlayed = {};

  // ----- Audio files -----
  const MUSIC_LEVEL = 0.5;   // the music is a little quieter than the effects
  const fileAudio = {};
  const fileBroken = {};     // becomes true if a file cannot be loaded or played
  Object.keys(AUDIO_FILES).forEach(function (key) {
    const a = new Audio();
    a.preload = "auto";
    a.addEventListener("error", function () {
      fileBroken[key] = true;
      console.warn("Audio file could not be loaded: " + AUDIO_FILES[key] + " (using built-in sound instead)");
    });
    a.src = AUDIO_FILES[key];
    fileAudio[key] = a;
  });
  fileAudio.music.loop = true;
  let fadeTimer = null;

  function clearFade() {
    if (fadeTimer !== null) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
  }

  function startFileMusic() {
    const a = fileAudio.music;
    if (fileBroken.music) return false;
    clearFade();
    a.volume = volume * MUSIC_LEVEL;
    const p = a.play();
    if (p && p.catch) {
      p.catch(function (err) {
        // NotAllowedError = the browser wants a click first. Anything else = bad file.
        if (err && err.name !== "NotAllowedError" && err.name !== "AbortError") {
          fileBroken.music = true;
          if (wantMusic && musicOn && init()) startSynthMusic();
        }
      });
    }
    return true;
  }

  function stopFileMusic(fadeSeconds) {
    const a = fileAudio.music;
    clearFade();
    if (a.paused) return;
    if (!fadeSeconds || fadeSeconds < 0.05) {
      a.pause();
      a.currentTime = 0;
      return;
    }
    const startVol = a.volume;
    const steps = Math.max(1, Math.round(fadeSeconds * 20));
    let i = 0;
    fadeTimer = setInterval(function () {
      i++;
      a.volume = Math.max(0, startVol * (1 - i / steps));
      if (i >= steps) {
        clearFade();
        a.pause();
        a.currentTime = 0;
        a.volume = volume * MUSIC_LEVEL;
      }
    }, 50);
  }

  // Plays an effect from its file. Returns true if a file is being used.
  function playFileEffect(name) {
    const a = fileAudio[name];
    if (!a || fileBroken[name]) return false;
    try {
      a.pause();
      a.currentTime = 0;
      a.volume = volume;
      const p = a.play();
      if (p && p.catch) {
        p.catch(function (err) {
          if (err && err.name !== "NotAllowedError" && err.name !== "AbortError") {
            fileBroken[name] = true;
            playSynthEffect(name); // the file is bad, so use the built-in sound
          }
        });
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function stopFileEffects() {
    ["correct", "wrong", "unlock", "gameover"].forEach(function (key) {
      try { fileAudio[key].pause(); fileAudio[key].currentTime = 0; } catch (e) {}
    });
  }

  // ----- Web Audio engine (fallback sounds + small keypad / tick beeps) -----
  function init() {
    if (!supported) return false;
    if (ctx) return true;
    try {
      ctx = new AudioCtor();
      master = ctx.createGain();
      master.gain.value = volume * 0.8;
      master.connect(ctx.destination);

      noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      return true;
    } catch (e) {
      supported = false;
      ctx = null;
      return false;
    }
  }

  // Browsers keep audio paused until the player clicks. Call this inside a click.
  function unlock() {
    if (!init()) return;
    if (ctx.state === "suspended") {
      const p = ctx.resume();
      if (p && p.catch) p.catch(function () {});
    }
  }

  function tone(freq, start, dur, type, vol, dest, endFreq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, start + dur);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(vol, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(dest || master);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  }

  function noise(start, dur, vol, filterFreq, filterType, dest) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(dest || master);
    src.start(start);
    src.stop(start + dur + 0.02);
  }

  const effects = {
    correct: function (t) {
      tone(523.25, t, 0.15, "triangle", 0.4);
      tone(659.25, t + 0.12, 0.15, "triangle", 0.4);
      tone(783.99, t + 0.24, 0.35, "triangle", 0.4);
    },
    wrong: function (t) {
      tone(170, t, 0.4, "sawtooth", 0.25, null, 80);
      tone(160, t, 0.4, "square", 0.12, null, 70);
    },
    tick: function (t) {
      tone(1000, t, 0.06, "square", 0.12);
    },
    key: function (t) {
      tone(700, t, 0.04, "square", 0.08);
    },
    denied: function (t) {
      tone(220, t, 0.2, "square", 0.22);
      tone(165, t + 0.25, 0.3, "square", 0.22);
    },
    unlock: function (t) {
      for (let i = 0; i < 6; i++) {
        noise(t + i * 0.18, 0.04, 0.35, 2500, "highpass");
      }
      tone(80, t + 1.25, 0.3, "sine", 0.7, null, 40);
      noise(t + 1.25, 0.2, 0.5, 800, "lowpass");
      noise(t + 1.35, 2.2, 0.2, 300, "lowpass");
      tone(784, t + 3.6, 0.5, "sine", 0.3);
      tone(988, t + 3.75, 0.5, "sine", 0.3);
      tone(1319, t + 3.9, 0.9, "sine", 0.3);
    },
    gameover: function (t) {
      tone(392, t, 0.35, "sawtooth", 0.2);
      tone(349, t + 0.4, 0.35, "sawtooth", 0.2);
      tone(311, t + 0.8, 0.35, "sawtooth", 0.2);
      tone(233, t + 1.2, 0.8, "sawtooth", 0.22, null, 200);
    }
  };

  const bigEffects = { correct: 0.7, wrong: 0.5, denied: 0.6, unlock: 4.8, gameover: 2.0 };

  function playSynthEffect(name) {
    if (!init() || !effects[name]) return;
    try {
      const now = ctx.currentTime;
      if (lastPlayed[name] !== undefined && now - lastPlayed[name] < 0.08) return;
      if (bigEffects[name]) {
        const important = (name === "unlock" || name === "gameover");
        if (now < busyUntil && !important) return;
        busyUntil = now + bigEffects[name];
      }
      lastPlayed[name] = now;
      effects[name](now + 0.02);
    } catch (e) {
      // if a sound fails, ignore it and keep playing the game
    }
  }

  // The game calls this. File sounds come first, built-in sounds are the backup.
  function play(name) {
    if (AUDIO_FILES[name] && name !== "music") {
      if (playFileEffect(name)) return;
    }
    playSynthEffect(name);
  }

  // ----- Built-in synthesised music (only used if the music file fails) -----
  const STEP_TIME = 60 / 124 / 2;
  const BASS = [55, 0, 55, 0, 55, 0, 58.27, 0, 55, 0, 55, 0, 65.41, 0, 58.27, 0];
  const LEAD = [0, 0, 0, 0, 440, 0, 0, 0, 0, 0, 523.25, 0, 0, 0, 493.88, 0];

  function playMusicStep(i, t) {
    const bus = musicBus;
    if (!bus) return;
    if (i % 4 === 0 || i === 14) tone(130, t, 0.18, "sine", 0.6, bus, 45);
    noise(t, 0.04, i % 2 === 0 ? 0.1 : 0.05, 7000, "highpass", bus);
    if (BASS[i]) tone(BASS[i], t, STEP_TIME * 0.9, "sawtooth", 0.12, bus);
    if (LEAD[i]) tone(LEAD[i], t, STEP_TIME * 1.6, "triangle", 0.1, bus);
  }

  function scheduleMusic() {
    if (!ctx || !musicBus) return;
    while (nextNoteTime < ctx.currentTime + 0.6) {
      playMusicStep(musicStep, nextNoteTime);
      nextNoteTime += STEP_TIME;
      musicStep = (musicStep + 1) % BASS.length;
    }
  }

  function startSynthMusic() {
    if (!ctx || musicTimer !== null) return;
    const now = ctx.currentTime;
    musicBus = ctx.createGain();
    musicBus.gain.setValueAtTime(0.0001, now);
    musicBus.gain.linearRampToValueAtTime(0.35, now + 0.6);
    musicBus.connect(master);
    musicStep = 0;
    nextNoteTime = now + 0.1;
    scheduleMusic();
    musicTimer = setInterval(scheduleMusic, 150);
  }

  function stopSynthMusic(fadeSeconds) {
    if (musicTimer !== null) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
    if (musicBus && ctx) {
      const bus = musicBus;
      musicBus = null;
      const fade = fadeSeconds || 0.2;
      try {
        bus.gain.cancelScheduledValues(ctx.currentTime);
        bus.gain.setValueAtTime(bus.gain.value, ctx.currentTime);
        bus.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + fade);
      } catch (e) {}
      setTimeout(function () {
        try { bus.disconnect(); } catch (e) {}
      }, fade * 1000 + 100);
    }
  }

  // Start whichever music works: the file first, the built-in music as backup
  function startMusic() {
    if (!startFileMusic()) {
      if (init()) startSynthMusic();
    }
  }
  function stopMusic(fadeSeconds) {
    stopFileMusic(fadeSeconds);
    stopSynthMusic(fadeSeconds);
  }

  return {
    isSupported: function () { return supported || !!window.Audio; },
    unlock: unlock,
    play: play,
    stopEffects: stopFileEffects,
    // The game calls these when the player enters and leaves a game
    beginMusic: function () {
      wantMusic = true;
      if (musicOn) startMusic();   // does nothing new if already playing
    },
    endMusic: function (fadeSeconds) {
      wantMusic = false;
      stopMusic(fadeSeconds);
    },
    // The music button calls this. Returns true if the music is now ON.
    toggleMusic: function () {
      musicOn = !musicOn;
      if (musicOn) {
        if (wantMusic) startMusic();
      } else {
        stopMusic(0.2);
      }
      return musicOn;
    },
    setVolume: function (v) {
      volume = v;
      if (master && ctx) master.gain.setTargetAtTime(volume * 0.8, ctx.currentTime, 0.02);
      if (fadeTimer === null) fileAudio.music.volume = volume * MUSIC_LEVEL;
    }
  };
})();


// ---------- 6. SHUFFLE AND GAME-BUILDING HELPERS ----------
// Fisher-Yates shuffle. It returns a NEW shuffled list and leaves the original alone.
function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

// Picks QUESTIONS_PER_GAME different questions from the selected theme, shuffles the
// answer choices, and decides which questions hide a code digit.
// Each option remembers whether it is correct BEFORE shuffling, so the correct
// answer is always found again afterwards (correctIndex).
function buildGameQuestions(themeKey) {
  const bank = THEMES[themeKey].questions;
  const picked = shuffle(bank).slice(0, QUESTIONS_PER_GAME); // no repeats: a shuffled list has each question once

  const questions = picked.map(function (q) {
    const options = q.options.map(function (text, index) {
      return { text: text, isCorrect: index === q.correct };
    });
    const shuffled = shuffle(options);
    return {
      text: q.text,
      options: shuffled.map(function (o) { return o.text; }),
      correctIndex: shuffled.findIndex(function (o) { return o.isCorrect; }),
      digitPos: -1   // -1 = no digit. 0-5 = this question gives that code digit.
    };
  });

  // Randomly choose CODE_LENGTH of the questions to hold a digit.
  // Sorting the chosen positions means digit 1 comes from the earliest chosen question,
  // digit 2 from the next, and so on, so the code is always in the right order.
  const indexes = [];
  for (let i = 0; i < questions.length; i++) indexes.push(i);
  const chosen = shuffle(indexes).slice(0, CODE_LENGTH).sort(function (a, b) { return a - b; });
  chosen.forEach(function (questionIndex, digitPosition) {
    questions[questionIndex].digitPos = digitPosition;
  });
  return questions;
}

// Makes a random 6-digit code like [4, 0, 7, 2, 9, 1]
function makeSecretCode() {
  const code = [];
  for (let i = 0; i < CODE_LENGTH; i++) {
    code.push(Math.floor(Math.random() * 10));
  }
  return code;
}

// setTimeout that we remember, so we can cancel anything still waiting
function later(fn, ms) {
  pendingTimeouts.push(setTimeout(fn, ms));
}
function cancelAllLater() {
  pendingTimeouts.forEach(function (id) { clearTimeout(id); });
  pendingTimeouts = [];
}

// Turns milliseconds into text like "2 min 05 sec"
function formatTime(ms) {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes + " min " + (seconds < 10 ? "0" : "") + seconds + " sec";
}

// Stops the stopwatch at the moment the game really ends
// (so door animations and delays are not counted as time used)
function freezeElapsed() {
  if (quizEndMs === null && quizStartMs > 0) quizEndMs = Date.now();
}


// ---------- 7. BUTTON EVENTS ----------
document.getElementById("start-btn").addEventListener("click", function () {
  Sound.unlock();     // a click is needed before browsers allow sound
  Sound.beginMusic(); // the music starts here and keeps playing
  goThemes();
});
startQuizBtn.addEventListener("click", function () {
  Sound.unlock();
  startQuiz();
});
restartBtn.addEventListener("click", function () {   // Play Again
  Sound.unlock();
  Sound.beginMusic();
  goThemes();
});

// Navigation buttons
document.getElementById("themes-home-btn").addEventListener("click", goHome);
document.getElementById("quiz-home-btn").addEventListener("click", goHome);
document.getElementById("vault-home-btn").addEventListener("click", goHome);
document.getElementById("result-home-btn").addEventListener("click", goHome);
document.getElementById("quiz-themes-btn").addEventListener("click", goThemes);
document.getElementById("vault-themes-btn").addEventListener("click", goThemes);
document.getElementById("memo-home-btn").addEventListener("click", goHome);
document.getElementById("memo-themes-btn").addEventListener("click", goThemes);

// Keypad buttons (the number keys use data-key="0" ... "9")
document.getElementById("keypad").addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.id === "clear-btn") {
    clearCode();
  } else if (button.id === "enter-btn") {
    submitCode();
  } else if (button.dataset.key !== undefined) {
    addDigit(button.dataset.key);
  }
});

// Physical keyboard works on the vault screen too
document.addEventListener("keydown", function (event) {
  if (!codeScreen.classList.contains("active")) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  if (event.key.length === 1 && event.key >= "0" && event.key <= "9") {
    addDigit(event.key);
  } else if (event.key === "Backspace") {
    event.preventDefault();
    backspaceCode();
  } else if (event.key === "Delete" || event.key === "Escape") {
    clearCode();
  } else if (event.key === "Enter") {
    event.preventDefault();
    submitCode();
  }
});

// Music ON/OFF and volume
musicBtn.addEventListener("click", function () {
  Sound.unlock();
  updateMusicButton(Sound.toggleMusic());
});
volumeSlider.addEventListener("input", function () {
  Sound.setVolume(volumeSlider.value / 100);
});

function updateMusicButton(isOn) {
  musicBtn.textContent = isOn ? "Music: ON" : "Music: OFF";
  musicBtn.classList.toggle("off", !isOn);
  musicBtn.setAttribute("aria-pressed", isOn ? "true" : "false");
}

// HOMEPAGE MUSIC
// Browsers do not allow sound until the player clicks or presses a key.
// So we try to start the music when the page loads (it may be blocked), and
// we start it again on the very first click or key press anywhere on the page.
Sound.beginMusic();
function startMusicOnFirstTouch() {
  document.removeEventListener("pointerdown", startMusicOnFirstTouch, true);
  document.removeEventListener("keydown", startMusicOnFirstTouch, true);
  Sound.unlock();
  Sound.beginMusic();
}
document.addEventListener("pointerdown", startMusicOnFirstTouch, true);
document.addEventListener("keydown", startMusicOnFirstTouch, true);

if (!Sound.isSupported()) {
  audioBarEl.classList.add("unsupported");
  musicBtn.title = "Audio is not supported in this browser";
}
Sound.setVolume(volumeSlider.value / 100);
updateMusicButton(true);


// ---------- 8. SHOW ONE SCREEN AT A TIME ----------
function showScreen(screen) {
  startScreen.classList.remove("active");
  themeScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  memoriseScreen.classList.remove("active");
  codeScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  screen.classList.add("active");
}


// ---------- 9. THEME SELECTION ----------
// Build the four theme cards from the THEMES data
function buildThemeCards() {
  themeGridEl.innerHTML = "";
  Object.keys(THEMES).forEach(function (key) {
    const theme = THEMES[key];
    const card = document.createElement("button");
    card.type = "button";
    card.className = "theme-card";
    card.dataset.theme = key;
    card.setAttribute("aria-pressed", "false");
    card.innerHTML =
      '<span class="theme-icon"></span>' +
      '<span class="theme-name"></span>' +
      '<span class="theme-desc"></span>';
    card.querySelector(".theme-icon").textContent = theme.icon;
    card.querySelector(".theme-name").textContent = theme.name;
    card.querySelector(".theme-desc").textContent = theme.description;
    card.addEventListener("click", function () { selectTheme(key); });
    themeGridEl.appendChild(card);
  });
}

function selectTheme(key) {
  selectedThemeKey = key;
  themeGridEl.querySelectorAll(".theme-card").forEach(function (card) {
    const isSelected = card.dataset.theme === key;
    card.classList.toggle("selected", isSelected);
    card.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
  themeHintEl.textContent = "Theme selected: " + THEMES[key].name;
  startQuizBtn.classList.remove("hidden");
}

function clearThemeSelection() {
  selectedThemeKey = null;
  themeGridEl.querySelectorAll(".theme-card").forEach(function (card) {
    card.classList.remove("selected");
    card.setAttribute("aria-pressed", "false");
  });
  themeHintEl.textContent = "Select a theme to continue.";
  startQuizBtn.classList.add("hidden");
}

buildThemeCards();


// ---------- 10. NAVIGATION AND RESETTING ----------
// Wipes everything about the current game: timers, score, lives, questions, code.
function resetGameSession() {
  cancelAllLater();
  clearInterval(timerId);
  timerId = null;
  stopMemorise();          // stop the memorise countdown and wipe the code from its screen
  clearMemoCode();
  Sound.stopEffects();

  currentQuestion = 0;
  lives = TOTAL_LIVES;
  score = 0;
  answered = false;
  gameEnded = false;

  gameQuestions = [];
  secretCode = [];
  codeStatus = [];
  correctCount = 0;
  incorrectCount = 0;
  digitsFound = 0;
  quizStartMs = 0;
  quizEndMs = null;

  answersEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  resetVault();
  hideDigitReveal();
  updateHud();
}

// Homepage: reset the game, keep the music playing, show the welcome screen
function goHome() {
  resetGameSession();
  clearThemeSelection();
  Sound.beginMusic();   // the homepage has background music too
  showScreen(startScreen);
}

// Theme selection: reset the game (nothing carries over), keep the music going
function goThemes() {
  resetGameSession();
  clearThemeSelection();
  Sound.beginMusic();   // does nothing if the music is already playing
  showScreen(themeScreen);
}


// ---------- 11. START A QUIZ ----------
function startQuiz() {
  if (!selectedThemeKey) return;
  const themeKey = selectedThemeKey;

  resetGameSession();              // a fresh session every time
  selectedThemeKey = themeKey;     // resetGameSession does not touch the theme choice, but be safe

  // A fresh random code and a fresh random set of questions for every game
  secretCode = makeSecretCode();
  codeStatus = secretCode.map(function () { return "pending"; });
  gameQuestions = buildGameQuestions(themeKey);

  const themeLabel = THEMES[themeKey].icon + " " + THEMES[themeKey].name;
  quizThemeBadge.textContent = "Theme: " + themeLabel;
  vaultThemeBadge.textContent = "Theme: " + themeLabel;

  qTotalEl.textContent = gameQuestions.length;
  revealTotalEl.textContent = CODE_LENGTH;
  updateHud();

  Sound.beginMusic();              // keeps playing if it already is
  showScreen(quizScreen);
  quizStartMs = Date.now();        // the stopwatch starts when the quiz begins
  showQuestion();
}


// ---------- 12. SHOW A QUESTION ----------
function showQuestion() {
  answered = false;
  hideDigitReveal();
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  const q = gameQuestions[currentQuestion];
  qNumberEl.textContent = currentQuestion + 1;
  questionTextEl.textContent = q.text;

  answersEl.innerHTML = "";
  q.options.forEach(function (optionText, index) {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = optionText;
    btn.addEventListener("click", function () {
      handleAnswer(index);
    });
    answersEl.appendChild(btn);
  });

  startTimer();
}


// ---------- 13. TIMER ----------
function startTimer() {
  clearInterval(timerId);
  timeLeft = TIME_PER_QUESTION;
  updateTimerDisplay();

  timerId = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeout();
    } else if (timeLeft <= WARNING_SECONDS) {
      Sound.play("tick");
    }
  }, 1000);
}

function updateTimerDisplay() {
  timeLeftEl.textContent = timeLeft;
  timerBar.style.width = (timeLeft / TIME_PER_QUESTION) * 100 + "%";
  if (timeLeft <= WARNING_SECONDS) {
    timerBar.classList.add("low");
  } else {
    timerBar.classList.remove("low");
  }
}


// ---------- 14. HANDLE AN ANSWER ----------
// Takes away a life. If that was the last life, the stopwatch stops right now.
function loseLife() {
  lives--;
  if (lives <= 0) freezeElapsed();
}

function handleAnswer(chosenIndex) {
  if (answered) return; // ignore extra clicks
  answered = true;
  clearInterval(timerId);

  const q = gameQuestions[currentQuestion];
  const buttons = answersEl.querySelectorAll(".answer-btn");
  buttons.forEach(function (b) { b.disabled = true; });

  if (chosenIndex === q.correctIndex) {
    // Correct: points for every question, a code digit only for the digit questions
    buttons[chosenIndex].classList.add("correct");
    score += POINTS_PER_CORRECT;
    correctCount++;
    Sound.play("correct");

    if (q.digitPos >= 0) {
      codeStatus[q.digitPos] = "found";
      digitsFound++;
      feedbackEl.textContent = "Correct! +" + POINTS_PER_CORRECT + " points and a code digit!";
      feedbackEl.className = "feedback good";
      updateHud();
      showDigitReveal(q.digitPos);
    } else {
      feedbackEl.textContent = "Correct! +" + POINTS_PER_CORRECT + " points.";
      feedbackEl.className = "feedback good";
      updateHud();
      later(nextStep, 1500);
    }
  } else {
    // Wrong: lose a life. No digit is awarded.
    buttons[chosenIndex].classList.add("wrong");
    buttons[q.correctIndex].classList.add("correct");
    incorrectCount++;
    if (q.digitPos >= 0) codeStatus[q.digitPos] = "missed";
    loseLife();
    Sound.play("wrong");
    feedbackEl.textContent = "Wrong! You lost a life.";
    feedbackEl.className = "feedback bad";
    updateHud();
    later(nextStep, 1800);
  }
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  const q = gameQuestions[currentQuestion];
  const buttons = answersEl.querySelectorAll(".answer-btn");
  buttons.forEach(function (b) { b.disabled = true; });
  buttons[q.correctIndex].classList.add("correct");

  incorrectCount++;
  if (q.digitPos >= 0) codeStatus[q.digitPos] = "missed";
  loseLife();
  Sound.play("wrong");
  feedbackEl.textContent = "Time's up! You lost a life.";
  feedbackEl.className = "feedback bad";

  updateHud();
  later(nextStep, 1800);
}


// ---------- 15. THE DIGIT REVEAL (shown TWICE) ----------
// After a correct answer to a digit question, the SAME digit is shown for 2 seconds,
// hidden for a moment, shown again for 2 seconds, then hidden for good.
// Then the game moves on by itself. "position" is 0-5 (which digit of the code it is).
// The answer buttons are already locked (answered = true), so nothing can be clicked
// during the reveal, and no life is lost.
function showDigitReveal(position) {
  revealPosEl.textContent = position + 1;
  revealEl.classList.remove("hidden");

  // 1st showing now
  showDigitNow(position, 1);
  // hidden for a moment
  later(function () { hideDigitNow(); }, DIGIT_SHOW_MS);
  // 2nd showing: the same digit again
  later(function () { showDigitNow(position, 2); }, DIGIT_SHOW_MS + DIGIT_GAP_MS);
  // hidden for good, then on to the next question (or the vault)
  later(function () {
    hideDigitReveal();
    nextStep();
  }, DIGIT_SHOW_MS * 2 + DIGIT_GAP_MS);
}

function showDigitNow(position, timesShown) {
  revealEl.classList.remove("gap");
  revealDigitEl.textContent = secretCode[position];
  revealStatusEl.textContent = "Showing " + timesShown + " of 2";
}

function hideDigitNow() {
  revealEl.classList.add("gap");
  revealDigitEl.textContent = "?";   // the digit is hidden
  revealStatusEl.textContent = "Hidden... it will appear ONE more time";
}

function hideDigitReveal() {
  revealEl.classList.add("hidden");
  revealEl.classList.remove("gap");
  revealDigitEl.textContent = ""; // the digit is removed from the page
}


// ---------- 16. WHAT HAPPENS AFTER EACH QUESTION ----------
function nextStep() {
  if (gameEnded) return;
  if (lives <= 0) {
    endGame(false, "You ran out of lives. The alarm went off!");
    return;
  }

  currentQuestion++;

  if (currentQuestion < gameQuestions.length) {
    showQuestion();
  } else {
    showMemorise();   // NEW: memorise the code first, then the keypad opens
  }
}


// ---------- 16B. MEMORISE THE SAFE CODE (NEW) ----------
// Shows the full code for MEMORISE_SECONDS, then hides it and opens the keypad by itself.
// There is only ONE countdown (memoTimerId). It uses the real clock (Date.now), so it stays
// accurate even if the browser is busy or the tab is in the background.
function showMemorise() {
  stopMemorise();                          // make sure no other countdown exists

  // Build the six digit boxes from the SAME secretCode the keypad will check
  memoCodeEl.innerHTML = "";
  secretCode.forEach(function (digit) {
    const box = document.createElement("span");
    box.className = "memo-digit";
    box.textContent = digit;
    memoCodeEl.appendChild(box);
  });

  memoDeadline = Date.now() + MEMORISE_SECONDS * 1000;
  memoLastShown = -1;
  renderMemoTime(MEMORISE_SECONDS);
  showScreen(memoriseScreen);

  // restart the (decorative) draining bar
  memoBarFillEl.style.animationDuration = MEMORISE_SECONDS + "s";
  memoBarFillEl.classList.remove("running");
  void memoBarFillEl.offsetWidth;          // forces the browser to restart the animation
  memoBarFillEl.classList.add("running");

  memoTimerId = setInterval(memoTick, 100);  // checks the clock 10 times a second
}

function memoTick() {
  const remaining = Math.max(0, Math.ceil((memoDeadline - Date.now()) / 1000));
  if (remaining !== memoLastShown) {
    renderMemoTime(remaining);
    if (remaining >= 1 && remaining <= 3) Sound.play("tick");  // soft ticks in the last 3 seconds
  }
  if (remaining <= 0) finishMemorise();
}

// Shows the number. Gold for 10-4, red + pulsing for 3-1, no pulse at 0.
function renderMemoTime(seconds) {
  memoLastShown = seconds;
  memoTimerEl.textContent = seconds;
  memoTimerEl.classList.toggle("final", seconds >= 1 && seconds <= 3);
}

// Time is up: hide the code at once and open the keypad automatically
function finishMemorise() {
  stopMemorise();
  clearMemoCode();                         // the code is gone from the page
  showVault();
}

function stopMemorise() {
  if (memoTimerId !== null) {
    clearInterval(memoTimerId);
    memoTimerId = null;
  }
  memoBarFillEl.classList.remove("running");
  memoTimerEl.classList.remove("final");
}

// Removes the digits from the page completely (not just hidden with CSS)
function clearMemoCode() {
  memoCodeEl.innerHTML = "";
}


// ---------- 17. THE VAULT ----------
function showVault() {
  resetVault();
  renderCodeProgress();
  showScreen(codeScreen);
  if (document.activeElement) document.activeElement.blur();
}

// Closes the door and clears the keypad
function resetVault() {
  enteredCode = "";
  attemptsLeft = MAX_CODE_ATTEMPTS;
  vaultBusy = false;
  vaultEl.className = "";
  lightEl.className = "light";
  setVaultStatus("ENTER CODE", "");
  unlockBannerEl.classList.add("hidden");
  updateCodeDisplay();
  updateAttemptsText();
}

function setVaultStatus(text, kind) {
  vaultStatusEl.textContent = text;
  vaultStatusEl.className = "vault-status" + (kind ? " " + kind : "");
}

function updateAttemptsText() {
  attemptsTextEl.textContent = "Attempts left: " + attemptsLeft;
}

// Draws one dot for each digit typed. The real digits are never shown.
function updateCodeDisplay() {
  codeDisplayEl.innerHTML = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    const slot = document.createElement("span");
    slot.className = "slot";
    slot.textContent = i < enteredCode.length ? "●" : "";
    codeDisplayEl.appendChild(slot);
  }
}

function addDigit(digit) {
  if (vaultBusy || enteredCode.length >= CODE_LENGTH) return;
  if (vaultStatusEl.classList.contains("denied")) setVaultStatus("ENTER CODE", "");
  enteredCode += digit;
  Sound.play("key");
  updateCodeDisplay();
}

function backspaceCode() {
  if (vaultBusy) return;
  enteredCode = enteredCode.slice(0, -1);
  updateCodeDisplay();
}

function clearCode() {
  if (vaultBusy) return;
  enteredCode = "";
  Sound.play("key");
  updateCodeDisplay();
}

// The correct code is checked here, inside JavaScript. It is never displayed.
function submitCode() {
  if (vaultBusy || gameEnded) return;

  if (enteredCode.length < CODE_LENGTH) {
    setVaultStatus("ENTER ALL " + CODE_LENGTH + " DIGITS", "denied");
    return; // this does not use up an attempt
  }

  if (enteredCode === secretCode.join("")) {
    unlockSafe();
  } else {
    wrongCode();
  }
}

// Correct code: wheel turns, door swings open, then we show the result.
function unlockSafe() {
  vaultBusy = true;
  freezeElapsed();                  // stop the stopwatch: the code was right
  vaultEl.classList.add("locked");
  setVaultStatus("ACCESS GRANTED", "granted");
  lightEl.className = "light green";
  Sound.play("unlock");
  Sound.endMusic(1.5);

  vaultEl.classList.add("unlocking");
  later(function () { vaultEl.classList.add("open"); }, 1300);
  later(function () { unlockBannerEl.classList.remove("hidden"); }, 4000);
  later(function () {
    endGame(true, "You cracked the code and cleaned out the vault!");
  }, 6200);
}

// Wrong code: red light, shake, door stays closed. Try again if attempts remain.
function wrongCode() {
  attemptsLeft--;
  vaultBusy = true;
  vaultEl.classList.add("locked", "alarm", "shake");
  lightEl.className = "light red";
  Sound.play("denied");
  updateAttemptsText();

  if (attemptsLeft <= 0) {
    freezeElapsed();                // no attempts left: the game is over now
    setVaultStatus("ACCESS DENIED! No attempts left.", "denied");
    later(function () {
      endGame(false, "Too many wrong codes. The alarm sounded and the guards arrived.");
    }, 1800);
    return;
  }

  setVaultStatus("ACCESS DENIED! Try Again.", "denied");
  later(function () {
    vaultEl.classList.remove("locked", "alarm", "shake");
    lightEl.className = "light";
    enteredCode = "";
    updateCodeDisplay();
    vaultBusy = false;
  }, 1300);
}


// ---------- 18. END GAME AND RESULT SCREEN ----------
function endGame(won, message) {
  if (gameEnded) return;
  gameEnded = true;
  clearInterval(timerId);
  freezeElapsed();
  Sound.endMusic(0.6);

  const themeName = THEMES[selectedThemeKey].name;
  const elapsedMs = quizEndMs - quizStartMs;

  resultMessage.textContent = message;
  resResultEl.textContent = won ? "Won" : "Lost";
  resResultEl.className = "rc-value " + (won ? "good" : "bad");
  resThemeEl.textContent = THEMES[selectedThemeKey].icon + " " + themeName;
  resCorrectEl.textContent = correctCount + "/" + gameQuestions.length;
  resIncorrectEl.textContent = incorrectCount;
  finalScoreEl.textContent = score;
  resTimeEl.textContent = formatTime(elapsedMs);
  resSafeEl.textContent = won ? "Unlocked \uD83D\uDD13" : "Locked \uD83D\uDD12";
  resSafeEl.className = "rc-value " + (won ? "good" : "bad");
  resDigitsEl.textContent = digitsFound + "/" + CODE_LENGTH;

  if (won) {
    resultTitle.textContent = "SAFE UNLOCKED!";
    resultTitle.className = "win";
  } else {
    resultTitle.textContent = "HEIST FAILED!";
    resultTitle.className = "lose";
    Sound.play("gameover");
  }

  showScreen(resultScreen);
  restartBtn.focus();
}


// ---------- 19. UPDATE LIVES, SCORE AND CODE PROGRESS ----------
function updateHud() {
  livesEl.textContent = "❤️".repeat(Math.max(lives, 0)) || "💀";
  scoreEl.textContent = score;
  renderCodeProgress();
}

// Shows which digits you have (found), missed, or still have to earn.
// It shows symbols only, never the digit values.
function renderCodeProgress() {
  codeProgressEl.innerHTML = "";
  vaultProgressEl.innerHTML = "";
  codeStatus.forEach(function (status) {
    const symbol = status === "found" ? "●" : (status === "missed" ? "✕" : "○");
    [codeProgressEl, vaultProgressEl].forEach(function (target) {
      const mark = document.createElement("span");
      mark.className = "cp" + (status === "pending" ? "" : " " + status);
      mark.textContent = symbol;
      target.appendChild(mark);
    });
  });
}
