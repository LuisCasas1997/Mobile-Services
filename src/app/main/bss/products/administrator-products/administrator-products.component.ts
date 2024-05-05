import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ColumnSource } from '../../../components/dynamic-table/dynamic-table.entities';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-administrator-products',
  templateUrl: './administrator-products.component.html',
  styleUrls: ['./administrator-products.component.scss']
})

export class AdministratorProductsComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();;
  productForm!: FormGroup;
  keywordCtrl: FormControl = new FormControl('');
  $list: Observable<any[]> = new Observable();

  displayedColumns: ColumnSource[] = [
    { columnDef: 'productName', headerName: 'Nombre Producto' },
    { columnDef: 'price', headerName: 'Precio', hideOnSm: true, hideOnXs: true },
    { columnDef: 'image', headerName: 'Imagen', hideOnSm: true, hideOnXs: true, cell: (element: any) => { return this.truncateText(element.image) } },
    { columnDef: 'technicalSpecs', headerName: 'Especificaciónes Técnicas', hideOnSm: true, hideOnXs: true },
    { columnDef: 'physicalSpecs', headerName: 'Espercificaciones Físicas' },
    {
      columnDef: 'operations', headerName: 'Acciones'
      , operations: [
        {
          icon: 'edit'
          , color: 'accent-900-fg'
          , action: (element: any) => { }
          , toolTip: "Editar"
        },
        {
          icon: 'delete_outline'
          , color: 'red-900-fg'
          , action: (element: any) => { }
          , toolTip: "Eliminar"
        },
      ]
    },
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {

    this._createForm(null);
  }

  ngOnInit(): void {
    this.$list = this.productService.getProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
