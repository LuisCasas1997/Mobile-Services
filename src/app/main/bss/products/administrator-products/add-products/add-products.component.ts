import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit {

  productForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {

  }

  ngOnInit(): void {
    this._createForm(null);
  }

  _createForm(item: any) {
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
      this.productService.addProduct(this.productForm.value).then(() => {
        this.productForm.reset();
      });
    }
  }

  truncateText(text: string, limit: number = 10): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
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
