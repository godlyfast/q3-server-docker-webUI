import { Component, OnInit } from '@angular/core';
import {MapsService} from '../../services/maps.service';
import {Q3Map} from '../../interfaces/q3map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  maps: Q3Map[];

  constructor(private mapService: MapsService) { }

  ngOnInit() {
    this.mapService.get().subscribe(maps => this.maps = maps);
  }

  public setMap(name: string) {
    this.mapService.setMap(name);
  }
}
