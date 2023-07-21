const mongoose = require('mongoose');

// Department Schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Other department fields
});

// Directorate Schema
const directorateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  bank: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  }],
  districts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
  }],
  schemes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schemes',
    
  }],
  openingBalance:'openingBalanceSchema'
});

// District Schema
const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  directorate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directorate',
    required: true,
  },
  bank: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  }],
  schemes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schemes',
    
  }],
  openingBalance:'openingBalanceSchema'
  // Other district fields
});

// Bank Details Schema
const bankDetailsSchema = new mongoose.Schema({
  bank: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  IFSCNumber: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['NEFT', 'RTGS','Cheque','DemandDraft'],
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  reconciliation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankReconciliation',
  }
  // Other bank details fields
});

// Scheme Schema
const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  directorate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directorate',
    required: true,
  },
  openingBalance:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OpeningBalance',
    required: true,
  },
  banks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    
  }],
  cash:[{
    // Cash
  }],
  treasury:[{
    // Cash
  }]
  // Other scheme fields
});

// Cash Book Register Schema
const cashBookRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Other cash book register fields
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation',
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  // Other user fields
});

// Financial Year Schema
const financialYearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  // Other financial year fields
});

// Designation Schema
const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Other designation fields
});

// Bank Reconciliation Schema
const bankReconciliationSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending','Successful', 'Failed'],
    required: true,
  },
  // Other bank reconciliation fields
});

// Ledger Schema
const ledgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  payer: {
    type: String,
    required: true,
  },
  payee: {
    type: String,
    required: true,
  },
  voucherNo: {
    type: String,
    required: true,
  },
  sanctionOrderNo: {
    type: String,
    required: true,
  },
  reconciliation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankReconciliation',
  },
  ledgerType:{
    type:String,
    enum: ['payment', 'receipt']
    
  }
});

// Bank Account Schema
const bankAccountSchema = new mongoose.Schema({
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  reconciliation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankReconciliation',
  },
  // Other bank account fields
});

// Opening Balance Schema
const openingBalanceSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  scheme:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
    required: true,
  }],
  Ledger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LedgerDetails',
  },

  // Other opening balance fields
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  // Other notification fields
});

// Beneficiary Schema
const beneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gst:{
    type: String,
  },
  pan:{
    type: String,
    required: true,
  },
  bankAccDetails:beneficiaryBankSchema,
  transactionDetails:transactionSchema,
  address:{
    type: String,
    required: true,
  }
  // Other beneficiary fields
});
const beneficiaryBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  IFSC:{
    type: String,
  },
 Branch:{
    type: String,
    required: true,
  },
  AccNo:{
    type: String,
    required: true,
  },
  Address:{
    type: String,
    required: true,
  }
  
});

// Advance Schema
const advanceSchema = new mongoose.Schema({
  beneficiary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beneficiary',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  voucherNo:{
    type:String,
    required: true,
  },
  transactionDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'transaction',
    required: true,
  }
});

// Journal Schema
const journalSchema = new mongoose.Schema({
  ledger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ledger',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  debit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ledger',
    required: true,
  },
  credit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ledger',
    required: true,
  },
  advance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advance',
  },
  voucherNo:{
    type:String,
    required: true,
  }
  // Other journal fields
});


// RTGS Schema
const rtgsSchema = new mongoose.Schema({
  transactionDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  rtgsNo:{
    type:String,
    required: true,
  },
});

// NEFT Schema
const neftSchema = new mongoose.Schema({
  transactionDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  neftNo:{
    type:String,
    required: true,
  }
});

// Cheque Schema
const chequeSchema = new mongoose.Schema({
  transactionDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  chequeNo:{
    type:String,
    required: true,
  },
});

// Demand Draft Schema
const demandDraftSchema = new mongoose.Schema({
  transactionDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  demandDraftNo:{
    type:String,
    required: true,
  }
});


const transactionSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ['Cash', 'Treasury', 'RTGS', 'NEFT', 'Cheque', 'DemandDraft'],
    required: true,
  },
  beneficiary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BeneficiaryMaster',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  senderBank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  },
  receiverBank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  },
  VocucherNo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LedgerDetails',
  }
  // Other transaction fields
});

const mongoose = require('mongoose');


const contraSchema = new mongoose.Schema({
  cash: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cash',
    required: true,
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank',
    required: true,
  },
  voucherNo:{
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
    required: true,
  },
});










// Consolidated Schema
const consolidatedSchema = {
  Department: mongoose.model('Department', departmentSchema),
  Directorate: mongoose.model('Directorate', directorateSchema),
  District: mongoose.model('District', districtSchema),
  BankDetails: mongoose.model('BankDetails', bankDetailsSchema),
  Scheme: mongoose.model('Scheme', schemeSchema),
  CashBookRegister: mongoose.model('CashBookRegister', cashBookRegisterSchema),
  CashBookEntry: mongoose.model('CashBookEntry', cashBookEntrySchema),
  Fund: mongoose.model('Fund', fundSchema),
  User: mongoose.model('User', userSchema),
  FinancialYear: mongoose.model('FinancialYear', financialYearSchema),
  Designation: mongoose.model('Designation', designationSchema),
  BankReconciliation: mongoose.model('BankReconciliation', bankReconciliationSchema),
  Ledger: mongoose.model('Ledger', ledgerSchema),
  BankAccount: mongoose.model('BankAccount', bankAccountSchema),
  OpeningBalance: mongoose.model('OpeningBalance', openingBalanceSchema),
  Notification: mongoose.model('Notification', notificationSchema),
  Beneficiary: mongoose.model('Beneficiary', beneficiarySchema),
  PaymentLedger: mongoose.model('PaymentLedger', paymentLedgerSchema),
  ReceiptLedger: mongoose.model('ReceiptLedger', receiptLedgerSchema),
  Advance: mongoose.model('Advance', advanceSchema),
  Journal: mongoose.model('Journal', journalSchema),
  rtgs: mongoose.model('RTGS', rtgsSchema),
  neft: mongoose.model('NEFT', neftSchema),
  cheque: mongoose.model('Cheque', chequeSchema),
  demandDraft:mongoose.model('DemandDraft', demandDraftSchema),
  Transaction:mongoose.model('Transaction', transactionSchema),
  Contra:mongoose.model('Contra', contraSchema) // contra
};

module.exports = consolidatedSchema;
