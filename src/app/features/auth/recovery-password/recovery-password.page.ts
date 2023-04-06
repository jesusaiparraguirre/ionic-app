import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../../services/api/login.service';
import { Location } from '@angular/common';
import { Messages } from 'src/services/utils/constants/messages.constant';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage implements OnInit {

  submitted: Boolean = false;
  recoverForm: FormGroup;
  partners: Array<any> = [];
  messages = Messages;
  email: string;

  constructor(
    public alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private navController: NavController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
    const data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    this.partners = data.partners;
    this.email = data.email;
    this.recoverForm.get('email').patchValue(data.email);
    this.recoverForm.get('partner').patchValue(data.partner);
  }

  initForm() {
    this.recoverForm = this.formBuilder.group({
      email: [null,  Validators.compose([Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)])],
      partner: [null,  Validators.compose([Validators.required, Validators.min(1)])],
    });
  }

  get f() {
    return this.recoverForm.controls;
  }

  async showAlert(item, status) {
    const alert = await this.alertController.create({
      header: status,
      message: item,
      buttons: [
        {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            if (status === 'CORRECTO') {
              let params = {
                email: this.email,
                partner: this.recoverForm.value.partner,
                partners: this.partners
              }
              this.navController.navigateRoot(['/password-send', JSON.stringify(params)]);
            }
          }
        },
      ]
    });

    await alert.present();
  }

  onSubmit() {
    this.submitted = true;
    const form = this.recoverForm;
    if (form.valid) {
      this.loginService.doRecover(form.value).subscribe(
        data => {
          // this.showAlert(data.message, 'CORRECTO');
          let params = {
            email: this.email,
            partner: this.recoverForm.value.partner,
            message: data.message,
            partners: this.partners
          }
          this.navController.navigateRoot(['/password-send', JSON.stringify(params)]);
        }, error => {
          this.showAlert(error.error.message, 'ERROR');
        }
      )
    }
  }

  backButton() {
    const form = this.recoverForm;
    let params = {
      partners: this.partners,
      email: form.value.email
    }
    this.navController.navigateRoot(['/login', JSON.stringify(params)]);
  }
}
