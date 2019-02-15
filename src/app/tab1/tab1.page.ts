import { Component, OnInit } from '@angular/core';
import { Customer } from '../org.nbd.network';
import { user } from '../user.conf';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  private NAMESPACE = 'Customer';
  interval: any;
  private subscription: Subscription = new Subscription();

  public usr: Customer;
  constructor(private dataService: DataService<Customer>) { }
  ngOnInit() {
    this.usr = user;
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
    this.dataService.getSingle(this.NAMESPACE, user.customerID).subscribe(
      (data) => {
        if (data != null) {
          this.usr = data;
        }
      },
      (error) => {
        this.subscription.unsubscribe();
        clearInterval(this.interval);
      }
    )
  }
}
