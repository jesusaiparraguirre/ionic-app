import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SessionEmailService } from 'src/services/api/session-email.service'
import { Messages } from 'src/services/utils/constants/messages.constant';
import { LoginService } from 'src/services/api/login.service';
import { GlobalService } from 'src/services/api/global.service';
import { environment } from 'src/environments/environment';

@Component({
  providers: [LoginService],
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted: Boolean = false;
  messages = Messages;
  countries = [];
  partners = [];
  typePassword: string = 'password';
  country: any;
  onePartner = false;

  constructor(
    private navController: NavController,
    private sessionEmailService: SessionEmailService,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.getCountry();
    this.getPartner();
    this.initForm();
  }

  getCountry(){
    this.loginService.listCountry().subscribe(
      data => {
          this.countries = data;
      }, error => {
          this.showAlert(error.error.message);
      }
    )
  }

  getPartner(){
    this.loginService.listPartner().subscribe(
      data => {
        this.partners = data;
        if(data.length == 1){
          this.onePartner = true;          
        }
      }, error => {
        this.showAlert(error.error.message);
      }
    )
  }

  initForm() {
    if(environment.android == true){
      this.registerForm = this.formBuilder.group({
        name: [null,
        Validators.compose([Validators.required])],
        lastname: [null,
          Validators.compose([Validators.required])],
        phone: [null,
          Validators.compose([Validators.required])],
        phoneCode: [null],
        email: [null,
          Validators.compose([Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]),
        ],
        password: [null,
          Validators.compose([Validators.required, Validators.minLength(5)])],
        country: [null,
          Validators.compose([Validators.required])],
        partnerId: [null],
      });
    } else {
      this.registerForm = this.formBuilder.group({
        name: [null,
        Validators.compose([Validators.required])],
        lastname: [null,
          Validators.compose([Validators.required])],
        email: [null,
          Validators.compose([Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]),
        ],
        password: [null,
          Validators.compose([Validators.required, Validators.minLength(5)])],
        partnerId: [null],
      });
    }
    
  }

  onSubmit() {
    this.submitted = true;
    const form = this.registerForm;
    if(this.onePartner){
      form.value.partnerId = this.partners[0].id
    }
    // console.log('form',form.value);
    if (form.valid) {
        this.loginService.doRegister(form.value).subscribe(
            data => {
                this.globalService.setToken(data.token);
                this.globalService.setPartner(form.value.partnerId);
                this.navController.navigateRoot(['/app/home']);
            }, error => {
                this.showAlert(error.error.message);
            }
        )
    }


    // const form = this.loginForm;
    // console.log(form.value.email);
    // console.log(form.value)
    // this.submitted = true;
    // const form = this.loginForm;
    // if (form.valid) {
    //   this.sessionEmailService.doAuthentication(form.value.email).subscribe(
    //     data => {
    //       let params = {
    //         partners: data.data,
    //         email: form.value.email
    //       }
    //       this.navController.navigateForward(['/login', JSON.stringify(params)]);
    //     }, error => {
    //       this.showAlert(error.error.message);
    //     }
    //   )
    // }
  }

  get f() {
    return this.registerForm.controls;
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
    
  }

  backButton() {
    this.navController.navigateForward(['/session-email']);
  }

  toggleShow() {
    this.typePassword = this.typePassword === 'text' ? 'password' : 'text';
  }

  changeCountry() {
    const countryId = this.registerForm.get('country').value;
    this.country = this.countries.find(x => x.id == countryId);
    if (this.country) {
      this.registerForm.patchValue({
        phoneCode: '+' + this.country.phoneCode
      })
    }
  }

  get e() {
    return environment;
  }


}
