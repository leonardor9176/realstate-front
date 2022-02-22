import { Component, OnInit } from '@angular/core';
import { ProperiesService } from 'src/app/services/properties/properies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public top3: any[] = []

  constructor(
    public propertiesService: ProperiesService
  ) { }

  ngOnInit(): void {
    this.getTop3()
  }


  async getTop3(){
    try {
      this.top3 = await new Promise((resolve) => {
        this.propertiesService.getTop3().subscribe((res: any) => {
          resolve(res.data)
        })
      })
    } catch (error) {
      console.log('Error al obtener top de visitados', error)
    }
  }
}
