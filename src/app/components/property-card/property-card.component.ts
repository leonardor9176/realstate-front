import { Component, OnInit, Input } from '@angular/core';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faShower } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { ProperiesService } from 'src/app/services/properties/properies.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  faBed = faBed
  faShower = faShower

  @Input() property: any = {};

  constructor(
    public propertiesService: ProperiesService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  async increaseVisit(id: any) {
    this.dataService.storage = this.property

    try {
      let resp = await new Promise((resolve) => {
        this.propertiesService.increaseVisits(id).subscribe((res: any) => {
          console.log('sent')
          resolve(res)
        })
      })
      console.log(resp)
    } catch (error) {
      console.log('Error al obtener top de visitados', error)
    }
  }
}
