import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
//import { HomeService } from '../../home/home.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor (private translateService: TranslateService, private router : Router, private auths : AuthService) {}

  /**
   * Hautatutako hizkuntza lortzen du HTMLSelectElement-etik eta itzulpen zerbitzua erabiltzen du hizkuntza hori aplikatzeko.
   *
   * @param event - HTMLSelectElement elementutik datorren gertaera.
   */
  translatetext (event: Event) {

  const lang = (event.target as HTMLSelectElement).value
	this.translateService.use(lang);
  }
  private _logued : boolean = false;

  ngOnInit(){
    this._logued = this.auths.logeatutaDago();
  }



  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  goHome() {


   

    this.router.navigate(['']);
    
  }

  get logued() {
    return this._logued;
  }


}
