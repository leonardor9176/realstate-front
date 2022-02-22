import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faShower } from '@fortawesome/free-solid-svg-icons';
import { ProperiesService } from 'src/app/services/properties/properies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentsService } from 'src/app/services/agents/agents.service';

@Component({
  selector: 'app-propery-page',
  templateUrl: './propery-page.component.html',
  styleUrls: ['./propery-page.component.css'],
  providers: [ NgbModal]
})
export class ProperyPageComponent implements OnInit {

  @ViewChild('agent_info_modal', { static: false }) private agentInfoModal: any

  currentModal: any

  public property: any
  faBed = faBed
  faShower = faShower
  agent: any = {}

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private propertiesService: ProperiesService,
    private agentsService: AgentsService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    if (id == this.dataService.storage?._id) {
      this.property = this.dataService.storage
    }
    else {
      try {
        this.getPropery(id)
        .then(async(res) => {
          this.property = await res
        })
        
      } catch (error) {
        console.log('Error al obtener la propiedad', error)
      }
    }
  }

  async getPropery(id: string) {
    const promise = await new Promise((resolve) => {
      this.propertiesService.getPropertyByParams(`_id=${id}`).subscribe((res: any) => {
        resolve(res.data[0])
      })
    })
    return promise
  }

  async openCreateProperty() {
    try {
      this.agent = await new Promise<any>((resolve, reject) => {
        this.agentsService.getAgent({id: this.property.agent}).subscribe((res: any) => {
          if (res.status) {
            resolve(res.data.agent[0])
          }
          else {
            reject(res.error)
          }
        })
      })
    }
    catch (error) {
      console.log('Error al obtener el usuario.', error)
    }
    this.currentModal = this.modalService.open(this.agentInfoModal, { size: 'mg' });
  }
}
