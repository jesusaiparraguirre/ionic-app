import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SessionEmailService } from 'src/services/api/session-email.service'
import { Messages } from 'src/services/utils/constants/messages.constant';

@Component({
  providers: [SessionEmailService],
  selector: 'app-session-email',
  templateUrl: './session-email.page.html',
  styleUrls: ['./session-email.page.scss'],
})
export class SessionEmailPage implements OnInit {

  loginForm: FormGroup;
  submitted: Boolean = false;
  messages = Messages;

  constructor(
    private navController: NavController,
    private sessionEmailService: SessionEmailService,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, //admin@jurgenklaric.com
        Validators.compose([Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]),
      ]
    });
  }

  onSubmit() {
    this.submitted = true;
    const form = this.loginForm;
    if (form.valid) {
      this.sessionEmailService.doAuthentication(form.value.email).subscribe(
        data => {
          let params = {
            partners: data.data,
            email: form.value.email
          }
          this.navController.navigateForward(['/login', JSON.stringify(params)]);
        }, error => {
          this.showAlert(error.error.message);
        }
      )
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  async showAlert(item) {
    const alert = await this.alertController.create({
      header: 'ERROR',
      message: item,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  register(){
    this.navController.navigateRoot(['/register']);
  }
}
