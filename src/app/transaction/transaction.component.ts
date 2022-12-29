import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  // constructor() { }

  acno:any
  transaction:any

  constructor(private ds:DataService) {
      this.acno=JSON.parse(localStorage.getItem('currentAcno')|| '')
      this.ds.getTransaction(this.acno)

      // console.log(this.transaction)

      .subscribe((result:any)=>{
        this.transaction=result.transaction
      },
      result=>{
        alert(result.error.message)
      })
      
   }

  ngOnInit(): void {
  }

}
// function subscribe(arg0: (result: any) => void, arg1: (result: any) => void) {
//   throw new Error('Function not implemented.');
// }

