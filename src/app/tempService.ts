import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Customer, ChequeAsset } from './org.nbd.network';
@Injectable({
  providedIn: 'root'
})
export class TempService {
    public IssuedCheques:Array<ChequeAsset> = [];
    constructor(){}

    addCheque(newCheque:ChequeAsset){
        this.IssuedCheques.push(newCheque);
    }
}
