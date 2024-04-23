import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  products: any[] = [];
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      technicalSpecs: ['', [Validators.required, Validators.maxLength(200)]],
      physicalSpecs: ['', [Validators.required, Validators.maxLength(200)]],
      image: [null, Validators.required]
    });

    this.loadProducts();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).then(() => {
        this.loadProducts();
      });
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result as string;
        this.productForm.patchValue({ image: base64Image });
        this.productForm.get('image')?.updateValueAndValidity();
      };
        reader.readAsDataURL(file);
      }
    }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  viewMore(product: any) {
  }
}
