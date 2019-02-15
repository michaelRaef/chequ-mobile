import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ChequeAsset } from '../org.nbd.network';

@Component({
  selector: 'app-cheque-details',
  templateUrl: './cheque-details.component.html',
  styleUrls: ['./cheque-details.component.scss']
})
export class ChequeDetailsComponent implements OnInit {
  public cheque:ChequeAsset;
  constructor(private dataService:DataService<ChequeAsset>) { }

  ngOnInit() {
    this.cheque = this.dataService.chosenCheque;
  }

}
