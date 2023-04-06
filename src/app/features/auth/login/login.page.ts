import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, IonSelect, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/services/api/login.service';
import { GlobalService } from 'src/services/api/global.service';
import { Messages } from 'src/services/utils/constants/messages.constant';

@Component({
    providers: [LoginService],
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    submitted: Boolean = false;
    loginForm: FormGroup;
    partners: Array<any> = [];
    type: string = 'password';
    @ViewChild(IonSelect, {static: true}) select: IonSelect;
    messages = Messages;
    onlyPartner = false;
    
    constructor(
        public alertController: AlertController,
        private activatedRoute: ActivatedRoute,
        private loginService: LoginService,
        private globalService: GlobalService,
        private navController: NavController,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.initForm();
        const data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
        // console.log(data, 'data guard');
        this.partners = data.partners;
        //console.log(this.partners);
        if(this.partners.length == 1){
            this.onlyPartner = true;
            this.loginForm.get('partner').patchValue(this.partners[0].id);
        } else {
            this.onlyPartner = false;
        }
        // console.log(this.onlyPartner);

        this.loginForm.get('email').patchValue(data.email);
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: [null,  Validators.compose([Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)])],
            partner: [null,  Validators.compose([Validators.required, Validators.min(1)])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        });
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

    onSubmit() {
        this.submitted = true;
        const form = this.loginForm;
        if (form.valid) {
            this.loginService.doLogin(form.value).subscribe(
                data => {
                    this.globalService.setToken(data.token);
                    this.globalService.setPartner(form.value.partner);
                    this.navController.navigateRoot(['/app/home']);
                }, error => {
                    this.showAlert(error.error.message);
                }
            )
        }
    }

    toggleShow() {
        this.type = this.type === 'text' ? 'password' : 'text';
    }

    backButton() {
        this.navController.navigateRoot(['/session-email']);
    }

    recoverPassword() {
        const form = this.loginForm;
        if (!form.value.partner) {
            this.showAlert('Debes elegir un partner');
            return;
        }
        let params = {
            email: form.value.email,
            partner: form.value.partner,
            partners: this.partners
        }
        this.navController.navigateForward(['/recovery-password', JSON.stringify(params)]);
    }
}
