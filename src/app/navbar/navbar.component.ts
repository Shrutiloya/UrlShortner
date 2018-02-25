import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from "angular4-social-login";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private user: SocialUser;
  public loggedIn: boolean;

    constructor(private authService: AuthService) {
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
        }

      });
    }


    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    /*
     * Social logo9ut
     */
    signOut(): void {
      this.authService.signOut();
    }



}
