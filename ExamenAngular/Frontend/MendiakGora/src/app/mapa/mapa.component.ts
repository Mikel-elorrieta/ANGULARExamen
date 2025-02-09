import { Ubicaciones } from '../interfaces/ubicaciones';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as mapboxgl from 'mapbox-gl';
import { MapaService } from './mapa.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {

  @Input() id: Number = 0;
  title = 'mapa';
  map!: mapboxgl.Map;
  private lat: number = 43.26271;
  private lon: number = -2.92528;
  private _ubicaciones: Ubicaciones | undefined;

  constructor(private route: ActivatedRoute, private service: MapaService) {}

  ngOnInit() {
    console.log("Mapa " + this.id);
    this.getLonAndLat();
  }

  async getLonAndLat() {
    try {
      this._ubicaciones = await this.service.finUbicacionesById('' + this.id);
      console.log(this._ubicaciones);

      this.lat = this._ubicaciones?.lat || 43.26271;
      this.lon = this._ubicaciones?.lng || -2.92528;

      this.mapaHasi(  this.lon ,this.lat);
    } catch (error) {
      console.error('Error al obtener la latitud y longitud:', error);
    }
  }

  mapaHasi(lon: number, lat: number) {
    this.map = new mapboxgl.Map({
      container: 'mapa',
      accessToken: 'pk.eyJ1IjoiaXR6aS1hciIsImEiOiJjbTR0cnJvbmgwOG1xMmpyOXphYnk2YXA3In0.nvbObADvRjZvchA9t_gJog',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lon, lat],
      zoom: 10
    });

    this.addMarker(lon, lat);
  }

  addMarker(lon: number, lat: number) {
    const micolor = "#xxxxxx".replace(/x/g, (y) => (Math.random() * 16 | 0).toString(16));
    new mapboxgl.Marker({ color: micolor })
      .setLngLat([lon, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h3 style="margin: 0; color: #007BFF;">${this._ubicaciones?.id}</h3>
          <p style="margin: 0;">nombre: ${this._ubicaciones?.nombre.es}</p>
          <p style="margin: 0;">lat: ${this._ubicaciones?.lat}</p>
          <p style="margin: 0;">lng: ${this._ubicaciones?.lng}</p>
          <p style="margin: 0;">direccion: ${this._ubicaciones?.direccion.es}</p>
          </div>
        `)
      )
      .addTo(this.map);
  }
}
