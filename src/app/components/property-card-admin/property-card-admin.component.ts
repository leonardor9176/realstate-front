import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; //////////////////


@Component({
  selector: 'app-property-card-admin',
  templateUrl: './property-card-admin.component.html',
  styleUrls: ['./property-card-admin.component.css'],
  //providers: [NgbModalConfig, NgbModal] //////////////////
})
export class PropertyCardAdminComponent implements OnInit {

  @Input() property: any = {};
  @Output() sendProperty = new EventEmitter<string>();
  @Output() delProperty = new EventEmitter<string>();

  constructor() {  }

  ngOnInit(): void {
  }

  editProperty(){
    this.sendProperty.next(this.property._id)
  }

  deleteProperty(){
    this.delProperty.next(this.property._id)
  }

}
