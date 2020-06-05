import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private activeRoute: ActivatedRoute, private user: UserService) { }
  route: any[];
  secondRoute: any[];
  status: string;
  userEmail: string;
  loginWithGoogle() {
    this.status = "logged";
    this.auth.googleLogin().then(res => {
      if (!this.route) {
        this.router.navigateByUrl('/profile');
      }
      else if (this.secondRoute) {
        this.router.navigate([this.route, this.secondRoute])
      }
      else if (this.route && !this.secondRoute) {
        this.router.navigate([this.route])
      }
    }
    )
  }

  loginWithFacebook() {
    this.status = "logged";
    this.auth.facebookLogin().then(res => {
      if (!this.route) {
        this.router.navigateByUrl('/profile');
      }
      else if (this.secondRoute) {
        this.router.navigate([this.route, this.secondRoute])
      }
      else if (this.route && !this.secondRoute) {
        this.router.navigate([this.route])
      }
    }
    )
  }

  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            this.userEmail = user.email;
          }
          else {
            this.userEmail = null;
          }
        })
      }
    )
  }

  ngOnInit(): void {
    this.getUser();
    this.activeRoute.params.subscribe(params => {
      if (params.secondRoute) {
        this.route = params.route;
        this.secondRoute = params.secondRoute;
        // console.error(this.route + "/" + this.secondRoute + "    two params")

      }
      else if (params.route) {
        this.route = params.route;
        // console.error(this.route)
      }

    })
  }

}
