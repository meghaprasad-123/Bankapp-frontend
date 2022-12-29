import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any

  acno:any
  pswd:any
  amount:any

  acno1:any
  pswd1:any
  amount1:any

  sdate:any

  constructor(private ds:DataService,private formbuilder:FormBuilder,private router:Router) {
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')|| '');

    } 

    this.sdate=new Date()
  }

  //create dashboard model
  depositForm=this.formbuilder.group({acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9\W]+')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]+')]]})

  withdrawForm=this.formbuilder.group({acno1:['',[Validators.required,Validators.pattern('[0-9]+')]],
  pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9\W]+')]],
  amount1:['',[Validators.required,Validators.pattern('[0-9]+')]]})

  ngOnInit(): void {
        if(!localStorage.getItem('currentUser')){
      alert('Login first')
      this.router.navigateByUrl('')

    }

    this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    console.log(this.user);
  }

  deposit(){

    console.log(this.depositForm);
    
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount

    if(this.depositForm.valid){
      // const result=this.ds.deposit(acno,psw,amnt)
      this.ds.deposit(acno,pswd,amount)

      .subscribe((result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      }
      )
      
    }
     
    
  }

  withdraw(){

    console.log(this.withdrawForm);
    
    var acno=this.withdrawForm.value.acno1
    var pswd=this.withdrawForm.value.pswd1
    var amount=this.withdrawForm.value.amount1

    if(this.withdrawForm.valid){
      this.ds.withdraw(acno,pswd,amount)
      .subscribe((result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      }
      )
    }
  }

  logout(){
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')

    this.router.navigateByUrl('')
  }

  delete(){
    // alert('clicked')
    this.acno=JSON.parse(localStorage.getItem('currentAcno')|| '') 
  }

  onCancel(){
    this.acno="";
  }

  onDelete(event:any){
    // alert(event)
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('');
    },
    result=>{
      alert(result.error.message)
    })
  }

}
