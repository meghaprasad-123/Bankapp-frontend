import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim='Your perfect banking partner'
  data='enter your acc no'

  acno="";
  pswd="";

  // constructor(private router:Router) { }
  constructor(private router:Router,private ds:DataService,private formbuilder:FormBuilder) {}

  //create login model
  loginForm=this.formbuilder.group({acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
                              pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9\*_@]+')]]})


  ngOnInit(): void {
  }


  acnoChange(event:any){
    console.log(event);
    this.acno = event.target.value //1000
    console.log(this.acno);
    
    
  }
  pswdChange(event:any){
    this.pswd = event.target.value
    console.log(this.pswd);
    
    
  }

  login(){

    console.log(this.loginForm);
    
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
   
   if(this.loginForm.valid){
     this.ds.login(acno,pswd)

     .subscribe((result:any)=>{
      localStorage.setItem('currentUser',JSON.stringify(result.currentUser));
      localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno));
      localStorage.setItem('token',JSON.stringify(result.token));

       alert(result.message);
       this.router.navigateByUrl('dashboard')
     },
     result=>{
       alert(result.error.message)
     }
     )
       
   }
   
   
}}


