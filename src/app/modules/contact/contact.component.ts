import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { UserService } from 'src/app/core/user.service';
import { NgForm } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Email } from 'src/app/core/email';
import { DatePipe } from '@angular/common';
import { Item } from 'src/app/core/item';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private submissionForm: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore, private user: UserService, protected dialogRef: NbDialogRef<ContactComponent>, private datePipe: DatePipe, ) { }

  @Input() item: Item;
  fullUserName: string;
  userEmail: string;
  userPhone: string;
  helpText: string;
  date: string;
  fullMail: Email;

  @ViewChild('f') signupForm: NgForm;
  submitData(image) {
    let data = { "name": "eden", "phone": "+972504242429", "image": image, "email": this.userEmail }
    // console.log(data)
    this.submissionForm.add(data).then(res => {
    }).catch(err => console.log(err))
  }

  getUser() {
    new Promise(
      (resolve, reject) => {
        this.user.getCurrentUser().then(user => {
          if (user) {
            // console.log(user)
            this.userEmail = user.email;
            this.fullUserName = user.displayName;
          }
          else {
            this.fullUserName = "";
            this.userEmail = "";
          }
        })
      }
    )
  }

  onSubmit() {
    this.date = this.datePipe.transform(Date.now(), 'dd-MM-yyyy');

    this.fullMail = { userName: this.fullUserName, userEmail: this.userEmail, userPhone: this.userPhone, itemImage: this.item.image, date: this.date, helpText: this.helpText, itemTitle: this.item.title, itemLink: 'https://jewellerystore-47b3d.web.app/product/' + this.item.id };
    // console.log(this.fullMail)

    this.submissionForm.add(this.fullMail).then(res => {
      this.dialogRef.close();
      // console.log(res)
    }).catch(err => console.log(err))
  }


  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // console.log(this.item)
    this.getUser();
    this.submissionForm = this.firestore.collection('submissions');
  }



}
