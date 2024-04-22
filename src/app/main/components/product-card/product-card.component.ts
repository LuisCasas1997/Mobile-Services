import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;

  viewMore() {
    console.log('View more about: ', this.product.name);
    // Aquí puedes añadir lógica para manejar el "Ver más"
  }
}
