import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this._createForm(this.data.data);
  }

  _createForm(item: any){
    if(!item){
      item = {
        productName: '',
        price: '',
        technicalSpecs: '',
        physicalSpecs: '',
        image: null
      }
    }

    this.productForm = this.fb.group({
      productName: [item.productName, Validators.required],
      price: [item.price, Validators.required],
      technicalSpecs: [item.technicalSpecs, [Validators.required, Validators.maxLength(200)]],
      physicalSpecs: [item.physicalSpecs, [Validators.required, Validators.maxLength(200)]],
      image: [item.image, Validators.required]
    });
  }

  onSubmit() {
    if(this.data.data.id == null && this.data.data.id == undefined){
      if (this.productForm.valid) {
        this.productService.addProduct(this.productForm.value).then(() => {
          this.productForm.reset();
        });
      }
    }else{
      if (this.productForm.valid) {
        this.productService.editProduct(this.data.data.id, this.productForm.value).then(() => {
        });
      }
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
