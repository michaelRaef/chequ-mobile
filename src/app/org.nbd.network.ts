import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.cheque.network{
   export class MyMsg {
      msg: string;
   }
   export class ChequeTransactions {
      txID: string;
      txType: string;
      txTime: Date;
      txMsg: string;
      txBy: string;
      updated: boolean;
   }
   export class ExchangeToBank {
      bankAccount: string;
      customerID: string;
   }
   export class Customer extends Participant {
      customerID: string;
      firstName: string;
      lastName: string;
      bankAccount: number;
      balance: number;
      fingerPrint: string;
   }
   export class ChequeAsset extends Asset {
      chequeID: string;
      issueDate: Date;
      exchangeDate: Date;
      payedTo: string;
      exchangeValue: number;
      exchangeCurrency: string;
      fingerPrint: string;
      memo: string;
      status: string;
      valid: boolean;
      bankDetails: ExchangeToBank;
      history: ChequeTransactions[];
      fraudCount: number;
      owner: Customer;
   }
   export class issueCheque extends Transaction {
      chequeID: string;
      issueDate: Date;
      exchangeDate: Date;
      payedTo: string;
      exchangeValue: number;
      exchangeCurrency: string;
      fingerPrint: string;
      memo: string;
      status: string;
      valid: boolean;
      bankDetails: ExchangeToBank;
      owner: string;
   }
   export class exchangeCheque extends Transaction {
      asset: ChequeAsset;
      payedTo: string;
      exchangeValue: number;
      exchangeCurrency: string;
      toBank: boolean;
   }
   export class chequeOperations extends Transaction {
      asset: string;
      status: string;
   }
// }
