import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  acno:any
  uname:any
  pswd:any

  constructor(private ds:DataService,private router:Router,private formbuilder:FormBuilder) { }


    //create register form model
    registerForm=this.formbuilder.group({uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9\*_@]+')]]})

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm);


    var acno=this.registerForm.value.acno
    var uname=this.registerForm.value.uname
    var pswd=this.registerForm.value.pswd
 
    if(this.registerForm.valid){

      
       console.log(this.registerForm.get('uname')?.errors);
        
        this.ds.register(acno,uname,pswd)
     .subscribe((result:any)=>{
       alert(result.message);
       this.router.navigateByUrl('')
     },

     result=>{
      alert(result.error.message)
     })
      }
     
    

    //  else{
      

    //      ('Invalid form')

    
   // if(this.registerForm.valid){
   //   const result= this.ds.register(acno,uname,psd)
   //   if(result){
   //     alert('successfully registered')
   //     this.router.navigateByUrl('')
   //  }
   //  else{
   //     alert('user already exist')
   //  }
   // }
    
   
  //  }
 
 }
}
//  function username(acno: string | null | undefined, username: any, password: any) {
//    throw new Error('Function not implemented.');
//  }
 
//  function password(acno: string | null | undefined, username: (acno: string | null | undefined, username: any, password: any) => void, password: any) {
//    throw new Error('Function not implemented.');
//  }
 

