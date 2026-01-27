import { Company, GroupType, SystemType } from './types';

// --- 1. SALES OPS DATA ---
export const SALES_OPS_DATA: Company[] = [
  // Core (Center)
  { id: 'vvc', name: 'Verdienende Vrienden Club', abbreviation: 'VVC', group: 'core' },
  { id: 'iq', name: 'Investbotiq', abbreviation: 'IQ', group: 'core' },
  { id: 'sp', name: 'Spontiva', abbreviation: 'SP', group: 'core' },
  { id: 'dj', name: 'Djobba', abbreviation: 'DJ', group: 'core' },
  { id: 'wv', name: 'WoningVry', abbreviation: 'WV', group: 'core' },

  // Secondary (2nd Circle)
  { id: 'boast', name: 'Boastplug', group: 'secondary' },
  { id: 'innova', name: 'Innovadoc', group: 'secondary' },
  { id: 'sabi', name: 'SabiBank', group: 'secondary' },

  // Marketing (3rd Circle)
  { id: 'colalt', name: 'Collectiefalternatief', group: 'marketing' },
  { id: 'immpunt', name: 'Immigratiepunt', group: 'marketing' },
  { id: 'stopc', name: 'Stopcontact', group: 'marketing' },
  { id: 'bespaar', name: 'Besparenmetai', group: 'marketing' },
  { id: 'nettest', name: 'Netwerk Tester', group: 'marketing' },
  { id: 'influwin', name: 'Influwinactie', group: 'marketing' },

  // Investment (4th Circle)
  { id: 'amac', name: 'Ama compleet', group: 'invest' },
  { id: '22n', name: '22NIGHTS', group: 'invest' },
  { id: 'huasca', name: 'Huascabar', group: 'invest' },
  { id: 'cyber31', name: 'Cybersecurity 31', group: 'invest' },
  { id: 'spraak', name: 'Spraakzaam Samen', group: 'invest' },
  { id: 'angels', name: 'Angels Mediate', group: 'invest' },
  { id: 'salesz', name: 'SaleszBook', group: 'invest' },

  // Software (5th Circle)
  { id: 'artist', name: 'Artistplatform', group: 'software' },
  { id: 'influplat', name: 'Influencerfan platform', group: 'software' },
  { id: 'photo', name: 'Photo edit tool', group: 'software' },
  { id: 'serverless', name: 'Serverless Cloud', group: 'software' },
];

// --- 2. ONBOARDING OPS DATA ---
export const ONBOARDING_OPS_DATA: Company[] = [
  // --- LEVEL 1 ---
  { id: 'ob_l1_1', name: 'Leer over VVC', group: 'core', tags: ['Level 1: Core', 'Education'] },
  { id: 'ob_l1_2', name: 'Quiz', group: 'core', tags: ['Level 1: Core', 'Assessment'] },
  { id: 'ob_l1_3', name: 'VVC account compleet maken', abbreviation: 'ACC', group: 'core', tags: ['Level 1: Core', 'Action'] },

  // --- LEVEL 2 ---
  { id: 'ob_l2_learn', name: 'Leer', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Education'] },
  { id: 'ob_l2_quiz', name: 'Quiz', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Assessment'] },
  { id: 'ob_l2_1', name: 'Investbotiq aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },
  { id: 'ob_l2_2', name: 'Spontiva aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },
  { id: 'ob_l2_3', name: 'Djobba aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },
  { id: 'ob_l2_4', name: 'WoningVry aanmelden', group: 'secondary', tags: ['Level 2: Cloud Registratie', 'Cloud'] },

  // --- LEVEL 3 ---
  { id: 'ob_l3_learn', name: 'Leren', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Education'] },
  { id: 'ob_l3_quiz', name: 'Quiz', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Assessment'] },
  { id: 'ob_l3_1', name: 'CV', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_2', name: 'Vragenlijst', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_3', name: 'Persoonlijkheid test 1', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_4', name: 'Persoonlijkheid test 2', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_5', name: 'Ondernemingsplan', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },
  { id: 'ob_l3_6', name: 'VOG', group: 'secondary', tags: ['Level 3: Persoonlijk', 'Personal'] },

  // --- LEVEL 4 ---
  { id: 'ob_l4_learn', name: 'Leren', group: 'secondary', tags: ['Level 4: Legal', 'Education'] },
  { id: 'ob_l4_quiz', name: 'Quiz', group: 'secondary', tags: ['Level 4: Legal', 'Assessment'] },
  { id: 'ob_l4_1', name: 'Paspoort', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_2', name: 'Adres', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_3', name: 'DigiD', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_4', name: 'KVK', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_5', name: 'LTD', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },
  { id: 'ob_l4_6', name: 'Huidige bank', group: 'secondary', tags: ['Level 4: Legal', 'Legal'] },

  // --- LEVEL 5 ---
  { id: 'ob_l5_1', name: 'LinkedIN', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_2', name: 'Facebook', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_3', name: 'Instagram', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_4', name: 'WhatsApp BS', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_5', name: 'TikTok', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_6', name: 'Reddit', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_7', name: 'Github', group: 'marketing', tags: ['Level 5 Online positionering', 'Dev'] },
  { id: 'ob_l5_8', name: 'Discord', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_9', name: 'Slack', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_10', name: 'Teams', group: 'marketing', tags: ['Level 5 Online positionering', 'Comms'] },
  { id: 'ob_l5_11', name: 'Google', group: 'marketing', tags: ['Level 5 Online positionering', 'Tools'] },
  { id: 'ob_l5_12', name: 'Neo', group: 'marketing', tags: ['Level 5 Online positionering', 'Tools'] },
  { id: 'ob_l5_13', name: 'Canva', group: 'marketing', tags: ['Level 5 Online positionering', 'Design'] },
  { id: 'ob_l5_14', name: 'Buy me Coffee', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },
  { id: 'ob_l5_15', name: 'Glassdoor', group: 'marketing', tags: ['Level 5 Online positionering', 'Social'] },

  // --- LEVEL 6 ---
  { id: 'ob_l6_learn', name: 'Leren', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Education'] },
  { id: 'ob_l6_quiz', name: 'Quiz', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Assessment'] },
  { id: 'ob_l6_1', name: 'Pripost', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_2', name: 'Revolut', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_3', name: 'Revolut BS', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_4', name: 'N26', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_5', name: 'Wise', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_6', name: 'Tide', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_7', name: 'Vialet', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_8', name: 'Algbra', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_9', name: 'SumUp', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_10', name: 'Payoneer', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },
  { id: 'ob_l6_11', name: 'Genome', group: 'invest', tags: ['Level 6: Aanmelden Kwaliteitscontroles 1 (Banken)', 'Bank'] },

  // --- LEVEL 7 ---
  { id: 'ob_l7_learn', name: 'Leren', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Education'] },
  { id: 'ob_l7_quiz', name: 'Quiz', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Assessment'] },
  { id: 'ob_l7_1', name: 'Bitvavo', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_2', name: 'Blockchain', abbreviation: 'BC', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_3', name: 'Wirex', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_4', name: 'Binance', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_5', name: 'Crypto', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_6', name: 'Bitpay', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_7', name: 'Kraken', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_8', name: 'Coinbase', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_9', name: 'Bitpanda', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_10', name: 'Neteller', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_11', name: 'Skrill', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },
  { id: 'ob_l7_12', name: 'Paysafe', group: 'invest', tags: ['Level 7 Aanmelden Kwaliteitscontroles 2 (Crypto Banken)', 'Crypto'] },

  // --- LEVEL 8 (Werk) ---
  { id: 'ob_l8_1', name: 'Young Capital', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_2', name: 'Temper', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_3', name: 'Young Ones', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_4', name: 'StaffYou', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_5', name: 'NowJobs', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_6', name: 'Jobdex', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  { id: 'ob_l8_7', name: 'Jobner', group: 'software', tags: ['Level 8 Aanmelden Kwaliteitscontroles 3 (Werk platformen)', 'Work'] },
  
  // --- LEVEL 8 (Factor) ---
  { id: 'ob_l8f_1', name: 'Timing', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_2', name: 'Fleks', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_3', name: 'Voldaan', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_4', name: 'o2factoring', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_5', name: 'Impactfactoring', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_6', name: 'Factornick', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_7', name: 'Please', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_8', name: 'Kolibrie Payroll', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_9', name: 'Janssen Payroll', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_10', name: 'Linda', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_11', name: 'thefactorcompany', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_12', name: 'thebluefactor', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },
  { id: 'ob_l8f_13', name: 'Direct Payrolling', group: 'software', tags: ['Level 8 Aanmelden voor de Kwaliteitscontroles 3 (Factor oplossingen)', 'Factor'] },

  // --- LEVEL 9 ---
  { id: 'ob_l9_1', name: 'Uber', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_2', name: 'Uber Drive', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_3', name: 'Uber Eats', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_4', name: 'Bolt', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_5', name: 'Booking', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_6', name: 'Airbnb', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_7', name: 'Grover', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_8', name: 'Fiverr', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_9', name: 'Hubspot', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_10', name: 'Marktplaats', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_11', name: 'Vinted', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_12', name: 'TicketSwap', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_13', name: 'Jooble', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },
  { id: 'ob_l9_14', name: 'Lusha', group: 'software', tags: ['Level 9 Reg voor Kwaliteitscontroles 4 (Platformen)', 'Platform'] },

  // --- LEVEL 10 ---
  { id: 'ob_l10_1', name: 'Multisafepay', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_2', name: 'Tinka', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_3', name: 'Pay.', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_4', name: 'Biller', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_5', name: 'Splitit', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_6', name: 'Riverty', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_7', name: 'Klarna', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_8', name: 'Adyen', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_9', name: 'Billink', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_10', name: 'Buckeroo', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_11', name: 'Authorize', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_12', name: '2checkout', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_13', name: 'Stripe', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_14', name: 'Square', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_15', name: 'Adyen', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_16', name: 'Mollie', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_17', name: 'CCV', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_18', name: 'MyPos', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_19', name: 'Viva Wallet', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_20', name: 'EMSPay', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },
  { id: 'ob_l10_21', name: 'Mangopay', group: 'invest', tags: ['Level 10 Reg voor Kwaliteitscontroles (Payment Solutions)', 'Payment'] },

  // --- LEVEL 11 ---
  { id: 'ob_l11_1', name: 'Havelaere', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_2', name: 'KPN', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_3', name: 'Odido', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_4', name: 'Ziggo', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_5', name: 'VF', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },
  { id: 'ob_l11_6', name: 'Eneco', group: 'software', tags: ['Level 11 Reg voor Kwaliteitscontroles (Nuts)', 'Nuts'] },

  // --- LEVEL 12 ---
  { id: 'ob_l12_1', name: 'Interhouse', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_2', name: 'Dak', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_3', name: 'Rooms', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_4', name: 'Nomos', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_5', name: 'HBhousing', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_6', name: 'Vastgoedunie', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_7', name: 'Rappage', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_8', name: '123wonen', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },
  { id: 'ob_l12_9', name: 'Grandrelocation', group: 'software', tags: ['Level 12 Reg voor Kwaliteitscontroles (Vastgoed)', 'Real Estate'] },

  // --- LEVEL 13 ---
  { id: 'ob_l13_1', name: 'Spotify', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_2', name: 'Apple Music', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_3', name: 'Tidal', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_4', name: 'Deezer', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_5', name: 'Amazon Music', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_6', name: 'Pandora', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_7', name: 'YouTube', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },
  { id: 'ob_l13_8', name: 'SoundCloud', group: 'software', tags: ['Level 13 Reg voor Mining', 'Mining'] },

  // --- LEVEL 14 ---
  { id: 'ob_l14_1', name: 'Alibaba', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_2', name: 'AliExpress', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_3', name: 'Amazon', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_4', name: 'Depop', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_5', name: 'eBay', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },
  { id: 'ob_l14_6', name: 'Gunroad', group: 'software', tags: ['Level 14 Reg voor Kwaliteitscontrole (Sales)', 'Sales'] },

  // --- LEVEL 15 ---
  { id: 'ob_l15_1', name: 'GoFundMe', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_2', name: 'Kickstart', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_3', name: 'Indiegogo', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_4', name: 'Patreon', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
  { id: 'ob_l15_5', name: 'Fundly', group: 'invest', tags: ['Level 15 Reg voor kwaliteitcontrole (Crowd Funding)', 'Crowd'] },
];

export const GROUP_COLORS: Record<string, string> = {
  core: '#f43f5e', // Rose-500
  secondary: '#f97316', // Orange-500
  marketing: '#eab308', // Yellow-500
  invest: '#10b981', // Emerald-500
  software: '#3b82f6', // Blue-500
};

export const GROUP_LABELS: Record<string, string> = {
  core: 'Core / Fundamentals',
  secondary: 'Secondary / Setup',
  marketing: 'Marketing / Identity',
  invest: 'Invest / Financials',
  software: 'Software / Platforms',
};

export const ORDERED_GROUPS: GroupType[] = ['core', 'secondary', 'marketing', 'invest', 'software'];

export const getSystemData = (system: SystemType): Company[] => {
    switch (system) {
        case 'onboarding': return ONBOARDING_OPS_DATA;
        case 'sales': 
        default: return SALES_OPS_DATA;
    }
};

export const getSystemTitle = (system: SystemType): string => {
    switch(system) {
        case 'onboarding': return 'OnboardingOps';
        case 'sales': return 'SalesOps';
        default: return 'Ecosystem';
    }
};