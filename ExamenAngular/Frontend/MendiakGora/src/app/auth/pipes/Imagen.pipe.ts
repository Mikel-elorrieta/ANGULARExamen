import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Pipe({
  name: 'imagen',
  pure: true,
})
export class ImagenPipePipe implements PipeTransform {
  transform(erabiltzailea: IUser): string {
    if (erabiltzailea.argazkia) {


      if (erabiltzailea.argazkia.type === 'Buffer') {
        const buffer = erabiltzailea.argazkia.data;

        if (Array.isArray(buffer) && buffer.length > 0) {
          const uint8Array = new Uint8Array(buffer);
          const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
          return `${binaryString}`;
        }
      }
    }
    return 'default/no-image.jpg';
  }

}
