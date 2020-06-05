import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbDialogService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './core/user.service';
import { AuthService } from './core/auth.service';
import { interval, Subscription, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { LogoutComponent } from './modules/logout/logout.component';
import { User } from './core/user';
import { AboutComponent } from './modules/about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  constructor(private nbMenuService: NbMenuService, private router: Router, private user: UserService, public auth: AuthService,
    private dialogService: NbDialogService,
  ) { }
  title = 'JewelleryStore';
  userEmail: string;
  userDisplayName: string;
  fullUser: User;
  subscription: Subscription;
  loggedInItems = [
    { title: 'Profile', link: '/profile' },
    { title: 'Logout' },
  ];
  loggedOutItems = [
    { title: 'Login' },
  ];

  jewelleryMenuItems = [
    { title: 'Rings', link: '/cat/rings' },
    { title: 'Earrings', link: '/cat/earrings' },
    { title: 'Necklaces', link: '/cat/necklaces' },
    { title: 'Bracelets', link: '/cat/bracelets' },
    { title: 'All Products', link: '/cat/' },
  ]
  navigate(type) {
    switch (type) {
      case "Logout":
        this.logout();
        break;
      // case "Profile":
      //   // this.router.navigate(['/profile']);
      //   break;
      case "Login":
        this.router.navigate(['/login']);
        break;

      default:
        break;
    }
  }

  logout() {
    this.dialogService.open(LogoutComponent, {
      context: {
        fullUser: this.fullUser,
      },
    }).onClose.subscribe(username => this.fullUser = username);
  }

  about(){
    this.dialogService.open(AboutComponent, {
      context: {
      },
    });

  }
  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            this.fullUser = { userName: user.displayName, userEmail: user.email, userImage: user.photoURL }
          }
          else {
            this.fullUser = null;
          }
        })
      }
    )
  }


  onDeactivate(status) {
    for (let [key, value] of Object.entries(status)) {
      if (key == "status") {
        this.getUser();

      }
    }
  }

  ngOnInit(): void {
    this.getUser();

    this.nbMenuService.onItemClick()
      .pipe(
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        this.navigate(title);
      });
  }
}
