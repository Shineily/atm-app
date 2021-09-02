import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({    
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  amounForm = new FormGroup({    
    enter: new FormControl('', [Validators.required, Validators.min(0)]),
    withdraw: new FormControl('', [Validators.required, Validators.min(0)])
  })

  get name() {return this.loginForm.get('name');}
  get password() {return this.loginForm.get('password');}

  get enter() {return this.amounForm.get('enter');}
  get withdraw() {return this.amounForm.get('withdraw');}

  loginSubmit(){

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      return
    }

    this.confirmPasswordAndUser(this.name.value, this.password.value)
  }

  confirmPasswordAndUser(user, password){
    this.handleErrorPassword = false
    this.handleErrorUser = false


    const userFinder = this.cuentas.find(
      cuenta => {
        return cuenta.nombre === user
      }
    )

    if(userFinder){
      if(userFinder.password === password){
        this.handleLogin = true

        this.userLogged = userFinder

        this.amount =  userFinder.saldo
      } else {
        this.handleErrorPassword = true
      }
    } else {
      this.handleErrorUser = true
    }

  }

  checkBalance(){
    this.handleBalanceShow = true
    this.handleEnterBalanceShow = false
    this.handleWithdrawAmountShow = false

    this.reset()
  }

  enterAmount(){
    this.handleBalanceShow = false
    this.handleEnterBalanceShow = true
    this.handleWithdrawAmountShow = false

    this.reset()
  }

  withdrawAmount(){
    this.handleBalanceShow = false
    this.handleEnterBalanceShow = false
    this.handleWithdrawAmountShow = true

    this.reset()
  }

  cancelAll(){
    this.handleBalanceShow = false
    this.handleEnterBalanceShow = false
    this.handleWithdrawAmountShow = false

    this.reset()
  }

  reset(){
    this.messageValidator=null

    this.enter.setValue('')
    this.withdraw.setValue('')

    this.enter.markAsUntouched()
    this.withdraw.markAsUntouched()
  }

  sendEnterAmount(){
    console.log(this.enter)
    if(this.enter.invalid){
      this.enter.markAsTouched()
      return
    }

    if(this.amount + this.enter.value > 990 ){
      this.messageValidator = "No se puede ingresar la cantidad, supera el límite permitido"
      return
    } else {
      this.messageValidator = null
    }
    
    this.amount = this.amount + this.enter.value

    this.checkBalance()

    console.log(this.amount)
  }

  sendWithdrawAmount(){
    if(this.withdraw.invalid){
      this.withdraw.markAsTouched()
      return
    }

    if(this.amount - this.withdraw.value < 10 ){
      this.messageValidator = "No se puede retirar la cantidad ingresada, supera el límite inferior permitido"
      return
    } else {
      this.messageValidator = null
    }

    this.amount = this.amount - this.withdraw.value

    this.checkBalance()

    console.log(this.amount)
  }

  logout(){
    this.userLogged = null
    this.amount = null
    this.handleLogin = false
  }


  cuentas = [
  { nombre: "Mali", saldo: 200, password: 'helloworld'},
  { nombre: "Gera", saldo: 290, password: 'l33t' },
  { nombre: "Maui", saldo: 67, password: '123' }
  ];

  handleLogin = false
  handleErrorPassword = false
  handleErrorUser = false

  handleBalanceShow = false
  handleEnterBalanceShow = false
  handleWithdrawAmountShow = false
  messageValidator = null

  userLogged = null
  amount = null

}
