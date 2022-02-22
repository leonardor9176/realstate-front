import { Component, OnInit } from '@angular/core';
import { ProperiesService } from 'src/app/services/properties/properies.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  public properties: any[] = []
  public propertiesToDisplay: any[] = []
  public locationsList: any[] = []
  public rows: any[] = []
  public cols = Array(4).fill(1).map((x,i)=>i)
  public lastRow: any[] = []

  public filterForm: FormGroup

  public location: AbstractControl
  public fee: AbstractControl
  public n_rooms: AbstractControl
  public n_bathrooms: AbstractControl
  public integral_kitchen: AbstractControl
  public yard: AbstractControl

  public rangePrice: any[] = []


  constructor(
    public propertiesService: ProperiesService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      location: [''],
      fee: [''],
      n_rooms: [''],
      n_bathrooms: [''],
      integral_kitchen: [''],
      yard: [''],
    })

    this.location = this.filterForm.controls['location']
    this.fee = this.filterForm.controls['fee']
    this.n_rooms = this.filterForm.controls['n_rooms']
    this.n_bathrooms = this.filterForm.controls['n_bathrooms']
    this.integral_kitchen = this.filterForm.controls['integral_kitchen']
    this.yard = this.filterForm.controls['yard']

    
   }

  ngOnInit(): void {
    this.getProperties()
    this.getLocations()
  }
  async getProperties() {
    try {
      this.properties = await new Promise((resolve) => {
        this.propertiesService.getProperties().subscribe((res: any) => {
          resolve(res.data)
        })
      })
      this.propertiesToDisplay = this.properties
      this.rangePrice.push(Math.min(...this.propertiesToDisplay.map(p => p.fee)))
      this.rangePrice.push(Math.max(...this.propertiesToDisplay.map(p => p.fee)))
      let totRows = Math.ceil  ((this.properties.length / 4))
      this.rows = Array(totRows).fill(1).map((x,i)=>i)
      let colsLastRow = this.properties.length - (totRows * 4)
      this.lastRow = Array(colsLastRow).fill(1).map((x,i)=>i+(this.rows.length*4))
    } catch (error) {
      console.log('Error al obtener lista de propiedades', error)
    }
  }

  async getLocations() {
    try {
      this.locationsList = await new Promise((resolve) => {
        this.propertiesService.getLocations().subscribe((res: any) => {
          resolve(res.data)
        })
      })
    } catch (error) {
      console.log('Error al obtener lista de ubicaciones', error)
    }
  }

  filter () {
    const location = this.filterForm.controls['location'].value
    const fee = this.filterForm.controls['fee'].value
    const n_rooms = this.filterForm.controls['n_rooms'].value
    const n_bathrooms = this.filterForm.controls['n_bathrooms'].value
    const integral_kitchen = (this.filterForm.controls['integral_kitchen'].value == '')? '': Boolean(this.filterForm.controls['integral_kitchen'])
    const yard = (this.filterForm.controls['yard'].value == '')? '': Boolean(this.filterForm.controls['integral_kitchen'])

    let propertiesFiltered = this.properties
    let filter = false

    if (location !== ''){
      propertiesFiltered = propertiesFiltered.filter(p => p.location == location)
      filter = true
    }
    if (fee !== ''){
      propertiesFiltered = propertiesFiltered.filter(p => p.fee <= fee)
      filter = true
    }
    if (n_rooms !== ''){
      propertiesFiltered = propertiesFiltered.filter(p => p.n_rooms >= n_rooms)
      filter = true
    }
    if (n_bathrooms !== ''){
      propertiesFiltered = propertiesFiltered.filter(p => p.n_bathrooms >= n_bathrooms)
      filter = true
    }
    if (integral_kitchen !== ''){
      propertiesFiltered = propertiesFiltered.filter(p => p.integral_kitchen == integral_kitchen)
      filter = true
    }
    if (yard !== ''){
      propertiesFiltered = propertiesFiltered.filter(p => p.yard == yard)
      filter = true
    }
    if (filter) {
      this.propertiesToDisplay = propertiesFiltered
    }
    else{
      this.propertiesToDisplay = this.properties
    }
  }
}
