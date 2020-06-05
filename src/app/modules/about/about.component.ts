import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<AboutComponent>) { }

  cancel() {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }

}
