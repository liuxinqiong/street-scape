import { environment } from 'environments/environment.dev';
import { CategoryColors } from 'constants/colors';

export class StreetView {
  id: number;
  color: string;
  src: string;
  constructor(id: number, categoryId: number, district: string, pic: string) {
    this.id = id;
    this.color = CategoryColors[categoryId];
    this.src = `${environment.assertUrl}/pic?district=${district}&id=${pic}`;
  }
}
