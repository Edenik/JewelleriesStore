import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/core/user';
import { NbDialogRef, NbToastrService, NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, protected dialogRef: NbDialogRef<LogoutComponent>, private toastrService: NbToastrService, ) { }

  @Input() fullUser: User;

  logOut() {
    // console.log('out')
    this.auth.googleLogout().then(res => {
      this.toast(this.fullUser.userName)
      this.fullUser = null;
      this.submit(this.fullUser);
      this.router.navigate(['/cat']);
    }).catch(err => console.log(err))

  }

  toast(userName) {
    const iconConfig: NbIconConfig = { icon: 'log-out', pack: 'eva' };
    this.toastrService.show(
      `Hope to see you soon, ${userName}`,
      `Logged out succesfully!`,
      iconConfig
    );
  }

  cancel() {
    this.dialogRef.close(this.fullUser);
  }

  submit(fullUser) {
    this.dialogRef.close(fullUser);
  }


  ngOnInit(): void {
  }

}
