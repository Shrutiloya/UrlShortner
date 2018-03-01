import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from "angular4-social-login";
import {DataService} from "../services/data.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private user: SocialUser;
  public loggedIn: boolean = false;

    constructor(private authService: AuthService, private dataService: DataService) {
    }

    ngOnInit() {
      /*
       * Get social login user data
       */
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if(user !=null)
        {
          localStorage.setItem("username", user.name);
          console.log(user);
          this.dataService.setLoginStatus(true);
        }

      });
    }


    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    /*
     * Social logout
     */
    signOut(): void {
      this.authService.signOut();
      this.dataService.setLoginStatus(false);
    }



}
