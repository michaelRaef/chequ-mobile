import { Component, OnInit } from '@angular/core';
import { ChequeAsset, chequeOperations } from '../org.nbd.network';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { ActionSheetController, ToastController, ModalController } from '@ionic/angular';
import { user } from '../user.conf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page implements OnInit {
  private NAMESPACE = 'ChequeAsset';
  private NAMESPACE2 = 'chequeOperations';
  interval: any;
  private subscription: Subscription = new Subscription();
  private allCheques: ChequeAsset[];

  constructor(private router:Router,public modalController: ModalController,private dataService: DataService<ChequeAsset>,private dataService2: DataService<chequeOperations>, public toastController: ToastController, public actionSheetController: ActionSheetController) { }
  ngOnInit() {
    this.allCheques = [];
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  refreshData() {
    this.dataService.getAll(this.NAMESPACE).subscribe(data => {
      let temp = data;
      this.allCheques = temp.filter(a => a.owner.toString().split("#")[1] == user.customerID);
    })
  }

  chequeActions(index) {
    let status = this.allCheques[index].status
    if (status == "Cancelled") {
      this.presentActionSheet(index);
    } else if (status == "Issued" || status == "Pending") {
      this.presentActionSheet2(index);
    } else {
      if (status == "Accepted") {
        this.presentToast("Cannot change status as cheque is already purchased");
      } else {
        this.presentToast("Cannot change status as cheque is marked as Fraud");
      }
    }
  }
  async presentActionSheet(index) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
        text: 'Pending',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.changeChequeStatus("Pending",index);
        }
      },
      {
        text: 'Details',
        role: 'destructive',
        icon: 'filing',
        handler: () => {
          this.showDetails(index);
        }
      }
    ]
    });
    await actionSheet.present();

  }

  async presentActionSheet2(index) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Cancel',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.changeChequeStatus("Cancelled",index);
        }
      },
      {
        text: 'Details',
        role: 'destructive',
        icon: 'filing',
        handler: () => {
          this.showDetails(index);
        }
      }
    ]
    });
    await actionSheet.present();

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  changeChequeStatus(status,index){
    let id = this.allCheques[index].chequeID;
    let temp = new chequeOperations();
    temp.asset = "resource:org.cheque.network.ChequeAsset#"+id;
    temp.status = status;
    this.dataService2.add(this.NAMESPACE2,temp).subscribe();
  }

  showDetails(index){
    let temp = this.allCheques[index];
    this.dataService.setChosenCheque(temp);
    this.router.navigate(['/cheque']);
  }
}

