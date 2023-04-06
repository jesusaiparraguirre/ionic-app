import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LeadGodsService } from '../../../../services/api/leadgods.service';
import { Logo } from 'src/services/utils/models/model.interface';

@Component({
  selector: 'app-password-send',
  templateUrl: './password-send.page.html',
  styleUrls: ['./password-send.page.scss'],
})
export class PasswordSendPage implements OnInit {

  partner: any = null;
  message: string;
  logo: Logo;
  email: string;
  partners: Array<any>;

  constructor(
    public navController: NavController,
    private activatedRoute: ActivatedRoute,
    private leadGodsService: LeadGodsService
  ) {
    const data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    // console.log('data password send',data);
    this.partner = data.partner;
    this.message = data.message;
    this.email = data.email;
    this.partners = data.partners;
  }

  ngOnInit() {
    this.getLogo();
  }

  getLogo() {
    this.leadGodsService.getLogo(this.partner).subscribe(
      data => {
        this.logo = data.logo;
      }
    )
  }
  backButton() {
    let params = {
      email: this.email,
      partner: this.partner,
      partners: this.partners
    }
    // console.log(params);
    this.navController.navigateForward(['/recovery-password', JSON.stringify(params)]);
  }
  login(){
    let params = {
      partners: this.partners,
      email: this.email
    }
    this.navController.navigateForward(['/login', JSON.stringify(params)]);
  }
}
