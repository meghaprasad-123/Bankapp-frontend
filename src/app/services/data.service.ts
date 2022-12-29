import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//global http header object
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser:any
  currentAcno:any

  //reduntant
  userDetails:any={
    1000:{acno:1000, username:'Akash', password:123, balance:0,transaction:[]},
    1001:{acno:1001, username:'Amal', password:147, balance:0,transaction:[]},
    1002:{acno:1002, username:'Vishnu', password:120, balance:0,transaction:[]},
    1003:{acno:1003, username:'Rahul', password:123, balance:0,transaction:[]},
    1004:{acno:1004, username:'Karthik', password:852, balance:0,transaction:[]}
  }


  constructor(private http:HttpClient) {
    // this.getDetails()

   }

   //method to store datas in local storage
  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('Database',JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
  }
  // to take data from locatstorage
  // getDetails(){
  //   if(localStorage.getItem('database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('database') || '')
  //   }
  //   if(localStorage.getItem('currentUser')){
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser') || '')
  //   }
  //   if(localStorage.getItem('currentAcno')){
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno') || '')
  //   }
  // }


  register(acno:any,username:any,password:any){
     
    const data={acno, password, username}
    return this.http.post('http://localhost:3000/register',data)

    //  var userDetails=this.userDetails
    //  if(acno in userDetails){
    //   return false
    //  }
    //  else{
    //   userDetails[acno]={acno,username,password,balance:0,transaction:[]}
    //   // console.log(userDetails);
    //   this.saveData()
    //   return true
    //  }
  }


  login(acno:any,pswd:any){

    const data={
      acno,
      pswd
    }

    return this.http.post('http://localhost:3000/login',data)


    // var userDetails=this.userDetails
    // this.currentuser=userDetails[acno]['username']

    // if(acno in userDetails){
      
    //     if(psd==userDetails[acno]['password']){

    //       this.currentacno=acno
    //       this.saveData()
    //        return true
    //     }
    //     else{
    //      alert('Incorrect password')
    //      return false
    //     }
    // }
    // else{
    //  alert('User not exist')
    //  return false
    // }
 }

 getToken(){
  //fetch token from local storage
  const token=JSON.parse(localStorage.getItem('token')|| '');
  //append token inside the header
  let headers= new HttpHeaders()

  if(token){
    options.headers=headers.append('x-access-token', token)
  }
  return options
 }


 deposit(acno:any,pswd:any,amt:any){
  const data={
    acno,
    pswd,
    amount:amt
  }
  return this.http.post('http://localhost:3000/deposit',data, this.getToken())

  // let userDetails=this.userDetails
  // // to convert string amnt to integer
  // var amount=parseInt(amnt)
  // if(acno in userDetails){
  //   if(psd==userDetails[acno]['password']){
  //     userDetails[acno]['balance']+=amount

  //     //add deposit details in transaction array
  //     userDetails[acno]['transaction'].push({type:'Credit',amount})
  //     this.saveData()
  //     return userDetails[acno]['balance']
  //   }
  //   else{
  //     alert('incorrect password')
  //     return false
  //   }
  //   }
  //   else{
  //     alert('incorrect ac no')
  //     return false
  //   }
  }

 
  withdraw(acno:any,pswd:any,amt:any){
    const data={
      acno,
      pswd,
      amount:amt
    }
    return this.http.post('http://localhost:3000/withdraw',data, this.getToken())    }


    //for request
    getTransaction(acno:any){
      const data={
        acno
        
      }
      return this.http.post('http://localhost:3000/transaction',data, this.getToken())    
      }


      //delete
    deleteAcc(acno:any){
        return this.http.delete('http://localhost:3000/deleteAcc/'+acno)    

      }
}
