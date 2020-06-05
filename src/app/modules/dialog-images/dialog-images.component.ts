import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-images',
  templateUrl: './dialog-images.component.html',
  styleUrls: ['./dialog-images.component.css']
})
export class DialogImagesComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<DialogImagesComponent>) { }
  @Input() images: string[];
  imageObject: Array<object> = [];

  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.images.forEach(element => {
      this.imageObject.push({ path: element });
    });
  }

}
