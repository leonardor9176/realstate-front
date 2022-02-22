import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProperiesService } from 'src/app/services/properties/properies.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminPropertiesComponent implements OnInit {

  @ViewChild('edit_property', { static: false }) private content: any
  @ViewChild('delete_property', { static: false }) private deleteModal: any


  public properties: any[] = []
  public propertyToEdit: any
  private propertyId: string = ''

  currentModal: any
  propertyAux: any

  public editPropertyForm: FormGroup

  public location: AbstractControl
  public address: AbstractControl
  public floor: AbstractControl
  public n_rooms: AbstractControl
  public n_bathrooms: AbstractControl
  public integral_kitchen: AbstractControl
  public yard: AbstractControl
  public fee: AbstractControl
  public picture: AbstractControl
  public description: AbstractControl

  public sub = false

  constructor(
    private propertiesService: ProperiesService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    config: NgbModalConfig,

    private formBuilder: FormBuilder
  ) {
    config.backdrop = 'static'
    config.keyboard = false

    this.editPropertyForm = this.formBuilder.group({
      location: ['', Validators.required],
      address: ['', Validators.required],
      floor: ['', Validators.required],
      n_rooms: ['', Validators.required],
      n_bathrooms: ['', Validators.required],
      integral_kitchen: ['', Validators.required],
      yard: ['', Validators.required],
      fee: ['', Validators.required],
      picture: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.location = this.editPropertyForm.controls['location']
    this.address = this.editPropertyForm.controls['address']
    this.floor = this.editPropertyForm.controls['floor']
    this.n_rooms = this.editPropertyForm.controls['n_rooms']
    this.n_bathrooms = this.editPropertyForm.controls['n_bathrooms']
    this.integral_kitchen = this.editPropertyForm.controls['integral_kitchen']
    this.yard = this.editPropertyForm.controls['yard']
    this.fee = this.editPropertyForm.controls['fee']
    this.picture = this.editPropertyForm.controls['picture']
    this.description = this.editPropertyForm.controls['description']
  }

  ngOnInit(): void {
    const agentId = this.route.snapshot.params['agent-id']
    try {
      this.getProperties(agentId)
        .then(async (res) => {
          this.properties = await res
        })

    } catch (error) {
      console.log('Error al obtener la propiedad', error)
    }
  }

  async getProperties(id: string) {
    const promise = await new Promise<Array<Object>>((resolve) => {
      this.propertiesService.getPropertyByParams(`agent=${id}`).subscribe((res: any) => {
        resolve(res.data)
      })
    })
    return promise
  }

  openCreateProperty() {
    this.propertyToEdit = {}
    this.open(this.content)
  }

  editProperty(event: any) {
    this.propertyToEdit = this.properties.find(p => p?._id == event)
    this.open(this.content)
  }

  open(content: any) {
    this.currentModal = this.modalService.open(content, { size: 'lg' });
  }

  get f() {
    return this.editPropertyForm.controls
  }

  validate() {
    this.sub = true
    if (this.editPropertyForm.invalid) {
      return
    }
    else {
      this.createPoperty()
    }
  }

  async createPoperty() {
    const propertyAux = {
      location: this.editPropertyForm.controls['location'].value,
      address: this.editPropertyForm.controls['address'].value,
      floor: this.editPropertyForm.controls['floor'].value,
      n_rooms: this.editPropertyForm.controls['n_rooms'].value,
      n_bathrooms: this.editPropertyForm.controls['n_bathrooms'].value,
      integral_kitchen: this.editPropertyForm.controls['integral_kitchen'].value,
      yard: this.editPropertyForm.controls['yard'].value,
      fee: this.editPropertyForm.controls['fee'].value,
      description: this.editPropertyForm.controls['description'].value,
      picture: this.editPropertyForm.controls['picture'].value,
      agent: this.route.snapshot.params['agent-id'],
      _id: this.propertyToEdit._id
    }
    if (this.propertyToEdit._id) {
      // edit property
      const promise = await new Promise<any>((resolve) => {
        this.propertiesService.updateProperty(propertyAux).subscribe((res: any) => {
          resolve(res)
        })
      })
      if (promise.status) {
        const index = this.properties.indexOf((p: { _id: any; }) => p._id == promise.data._id)
        this.properties.splice(index, 1, promise.data)
        this.properties = [...this.properties]
      }
    }
    else {
      // create property
      const promise = await new Promise<any>((resolve) => {
        this.propertiesService.createProperty(propertyAux).subscribe((res: any) => {
          resolve(res)
        })
      })
      if (promise.status) {
        this.properties.push(promise.data)
      }
    }
    this.currentModal.close()
  }

  openDeleteProperty(id: any) {
    this.propertyId = id
    this.open(this.deleteModal)
  }

  async deleteProperty() {
    console.log('deleting property ', this.propertyId)

    try {
      const promise = await new Promise<any>((resolve) => {
        this.propertiesService.deleteProperty(this.propertyId).subscribe((res: any) => {
          resolve(res)
        })
      })
      if (promise?.status) {
        this.properties.splice(this.properties.indexOf((p: { _id: string; }) => p._id == this.propertyId), 1)
      }
    }
    catch (error) {
      console.log('Error al eliminar la propiedad: ', error)
    }

    this.propertyId = ''
    this.currentModal.close()
  }

  // async getProperties(id: string) {
  //   const promise = await new Promise<Array<Object>>((resolve) => {
  //     this.propertiesService.getPropertyByParams(`agent=${id}`).subscribe((res: any) => {
  //       resolve(res.data)
  //     })
  //   })
  //   return promise
  // }
}
