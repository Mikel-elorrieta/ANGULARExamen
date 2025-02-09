import { Component } from '@angular/core';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { HomeOrganiComponent } from "../home-organi/home-organi.component";
import { HomePartiComponent } from "../home-parti/home-parti.component";
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../../interfaces/users';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  imports: [HomeAdminComponent, HomeOrganiComponent, HomePartiComponent, CommonModule, MatSidenavModule, MatToolbarModule, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  

  constructor(private auth : AuthService) { }

  ngOnInit() {



  console.log(this.auth.auth);
  }


  get logUser() : IUser | undefined {

    return this.auth.auth;
  }

}
