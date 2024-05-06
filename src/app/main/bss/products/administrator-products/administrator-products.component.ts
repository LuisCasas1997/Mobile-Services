import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ColumnSource } from '../../../components/dynamic-table/dynamic-table.entities';
import { Observable, Subscription } from 'rxjs';
import { GenericDialogService } from '../../../components/generic-dialog/generic-dialog.service';
import { AddProductsComponent } from './add-products/add-products.component';

@Component({
  selector: 'app-administrator-products',
  templateUrl: './administrator-products.component.html',
  styleUrls: ['./administrator-products.component.scss']
})

export class AdministratorProductsComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();;
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
    private productService: ProductService,
    private _genericDialogService: GenericDialogService,
  ) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  getProducts() {
    this.$list = this.productService.getProducts();
  }

  truncateText(text: string, limit: number = 10): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  addProduct() {
    this._genericDialogService.openDialog(
      AddProductsComponent,
      'Agregar Producto',
      null,
      false,
      'generic-dialog-container',
      'receipt',
      'Añadir un nuevo producto al inventario'
    ).afterClosed().subscribe(r => {
      this.getProducts();
    });
  }
}
