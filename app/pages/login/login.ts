import '../../operators/loader';

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page } from 'ui/page';

import { Router } from '../../providers/router';
import { AuthService } from '../../service/auth.service';

@Component({
  moduleId: module.id,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public cpfControl: AbstractControl;

  constructor(
    private router: Router,
    private page: Page,
    private authService: AuthService,
    private fb: FormBuilder
  ) {

  }

  public ngOnInit() {
    this.page.actionBarHidden = true;

    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required]],
    });

    this.cpfControl = this.loginForm.controls['cpf'];
    this.cpfControl.setValue('02742246584');

    if (this.authService.isLoggedIn()) {
      this.router.navigate('/event', { clearHistory: true });
    }
  }

  public next() {
    this.authService
      .login(this.cpfControl.value)
      .first()
      .loader('Efetuando login')
      .subscribe(() => {
        this.router.navigate('/event', { clearHistory: true });
      });
  }

}