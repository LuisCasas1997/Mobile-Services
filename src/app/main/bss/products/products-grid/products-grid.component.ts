import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  productForm!: FormGroup;
  products: any[] = [];

  constructor
  (
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    console.log('ProductsGridComponent constructor');
  }

  ngOnInit() {
    console.log('ProductsGridComponent initialized');
    this.productForm = this.fb.group({
      price: ['', Validators.required],
      technicalSpecs: ['', [Validators.required, Validators.maxLength(200)]],
      physicalSpecs: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log('Products loaded', this.products);
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).then(() => {
        console.log('Product added');
        this.loadProducts(); // Recarga los productos para incluir el nuevo
      });
    }
  }

  viewMore(product: any) {
    console.log('View more about product', product);
    // Aquí podrías abrir un modal o navegar a otra vista con más detalles del producto
  }
}
