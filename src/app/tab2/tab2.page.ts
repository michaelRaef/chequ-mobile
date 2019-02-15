import { Component, OnInit } from '@angular/core';
import { issueCheque, ChequeAsset, ExchangeToBank } from '../org.nbd.network';
import{user}from '../user.conf';
import { DataService } from '../data.service';
import { ToastController, AlertController } from '@ionic/angular';
import { TempService } from '../tempService';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private NAMESPACE = 'issueCheque';
  public toBank = false;
  constructor(private dataservice:DataService<issueCheque>,public alertController: AlertController,public ts:TempService,public toastController: ToastController){}
  public chequeData:issueCheque;
  public ChequeAsset:ChequeAsset;
  ngOnInit(){
    this.chequeData = new issueCheque();
    this.chequeData.owner = "resource:org.cheque.network.Customer#"+user.customerID;
    this.chequeData.chequeID = user.customerID+'-'+Math.floor(Math.random()*90000);
    this.chequeData.issueDate=new Date();
    this.chequeData.exchangeDate=null;
    this.chequeData.payedTo='';
    this.chequeData.exchangeValue=0.0;
    this.chequeData.exchangeCurrency='EGP';
    this.chequeData.fingerPrint=user.fingerPrint;
    this.chequeData.memo='';
    this.chequeData.status='Issued';
    this.chequeData.valid=true;
    this.chequeData.bankDetails = new ExchangeToBank();
    this.chequeData.bankDetails.bankAccount = "";
    this.chequeData.bankDetails.customerID = "102";

  }

  issueCheque(){
    this.dataservice.add(this.NAMESPACE,this.chequeData).subscribe(
      data=>{
        this.presentToast(data['msg']);
        console.warn(data);
      },
      error=>{
        this.presentToast(error.statusText);
      }
    )
    this.ngOnInit(); 
    this.ts.addCheque(this.ChequeAsset);
    this.presentToast("Cheque was issued Successfully!");
    this.ngOnInit();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Scan <strong>Fingerprint</strong> to issue cheque',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Done',
          handler: () => {
            this.issueCheque();
          }
        }
      ]
    });

    await alert.present();
  }
} 
