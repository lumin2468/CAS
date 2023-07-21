const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // bankDetails: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'BankDetails',
  // },
  // directorates: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Directorate',
  // }],
});

const DirectorateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  districts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
  }],
  schemes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
  }],
});

const DistrictSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  officename: {
    type: String,
    required: true,
  },
  officeAddress: {
    type: String,
    
  },
  directorate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directorate',
  },
  bankDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
  },
  ledgers: [{
    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
    },
    income: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: Number,
      default: 0,
    },
  }],
});

const BankDetailsSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  IFSCcode:{
    type: String,
    required: true,
  },
  branchname:{
    type: String,
    required: true,
  },
  branchAddress:{
    type: String,
    required: true,
  }
  // Other bank details fields...
});

const SchemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate:{
      type: Date,
      default: Date.now,
      required: true,
    },
  endDate:{
    type: Date,
    required: true,
  },
  description:{
    type: String,
  },
  funds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fund',
  }],
  cashBookRegister: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CashBookRegister',
  },
});

const CashBookRegisterSchema = new mongoose.Schema({
  scheme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
  },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CashBookEntry',
  }],
});

const CashBookEntrySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const FundSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation',
  },
 officename:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'District',
  
 },
 mobile:{
  type:Number,
  required: true,
 },
 email:{
  type:String,
  required: true,
 },
 password:{
  type:String,
  required: true,
 },
 active:{
  type:Boolean,
  required: true,
 }
  // Other user fields...
});
const DesignationSchema = new mongoose.Schema({
  name:{
    type: 'string',
    required:true,
  }
})

const FinancialYearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Department = mongoose.model('Department', DepartmentSchema);
const Directorate = mongoose.model('Directorate', DirectorateSchema);
const District = mongoose.model('District', DistrictSchema);
const BankDetails = mongoose.model('BankDetails', BankDetailsSchema);
const Scheme = mongoose.model('Scheme', SchemeSchema);
const CashBookRegister = mongoose.model('CashBookRegister', CashBookRegisterSchema);
const CashBookEntry = mongoose.model('CashBookEntry', CashBookEntrySchema);
const Fund = mongoose.model('Fund', FundSchema);
const User = mongoose.model('User', UserSchema);
const FinancialYear = mongoose.model('FinancialYear', FinancialYearSchema);
const Designation = mongoose.model('Designation',DesignationSchema)

module.exports = {
  Department,
  Directorate,
  District,
  BankDetails,
  Scheme,
  CashBookRegister,
  CashBookEntry,
  Fund,
  User,
  FinancialYear,
  Designation,
};
