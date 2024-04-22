import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrator-products',
  templateUrl: './administrator-products.component.html',
  styleUrl: './administrator-products.component.scss'
})

export class AdministratorProductsComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
     private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      technicalSpecs: ['', [Validators.required, Validators.maxLength(200)]],
      physicalSpecs: ['', [Validators.required, Validators.maxLength(200)]],
      image: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value)
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
}
