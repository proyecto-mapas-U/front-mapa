import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formlogin = new FormGroup({
    'name': new FormControl('', Validators.required),
    'numero': new FormControl('', Validators.required)
  });

  constructor(
    private readonly router: Router
  ) {
  }


  login() {
    this.router.navigate(['/mapa']);
  }

  get name() {
    return this.formlogin.get('name')
  }

  get numero() {
    return this.formlogin.get('numero')
  }

}
