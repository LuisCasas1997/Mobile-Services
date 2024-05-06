import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ColumnSource } from './dynamic-table.entities';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, OnDestroy {
  @ViewChild('TABLE') table: ElementRef = new ElementRef([]);

  @Input("showFooter") showFooter: boolean = false;
  @Input("canFilter") canFilter: boolean = true;
  @Input("canAddItem") canAddItem: boolean = true;
  @Input("columns") columns: ColumnSource[] = [];
  @Input("data") data: Observable<any[]> = new Observable();
  @Input("pageSize") pageSize: number = 10;
  @Input("hidePaginator") hidePaginator: boolean = false;
  @Input("tableClassName") tableClassName: string = "data-table";
  @Input("defaultSortColumn") defaultSortColumn: string = '';
  @Input("filterControl") filterControl: FormControl = new FormControl();
  @Input("isSelectable") isSelectable: boolean = true;
  @Input("hideHeader") hideHeader: boolean = false;
  @Input("loading") loading: boolean = false;
  @Input("emptyLabel") emptyLabel: string = 'No hay datos a mostrar';
  @Input("addIcon") addIcon: String = "add";
  @Input("addTooltip") addTooltip: String = "Nuevo";
  @Input("pageSizeOptions") pageSizeOptions: any[] = [5, 10, 25, 50, 100];
  @Input("filterDisabled") filterDisabled: boolean = false;
  @Input("filterTitle") filterTitle: string = "Buscar";
  @Input("serverLoading") serverLoading: boolean = false;
  @Input("total") total: number = 0;
  @Input("resetPaginator") resetPaginator: Observable<boolean> = new Observable();

  @Output() onSelectItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() addItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() customFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() getPage: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDblClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('tablePaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filter: string = '';
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  selectedRow: any;
  filterInputControl: FormControl;
  private _unsuscribeAll: Subject<any> = new Subject();

  serverPageSize: FormControl = new FormControl();
  itemsPerPage: number[] = [];
  offset: number = 0;
  limit: number = 0;

  constructor() {
    this.filterInputControl = new FormControl('');
  }

  ngOnDestroy(): void {
    this._unsuscribeAll.next(null);
    this._unsuscribeAll.complete();
  }

  ngOnInit() {

    this.serverPageSize = new FormControl(this.pageSize);
    this.limit = this.pageSize;
    this.itemsPerPage = this.pageSizeOptions;

    this.serverPageSize.valueChanges.pipe(debounceTime(200)).subscribe(c => {
      this.offset = 0;
      this.limit = c;
      this.getPageEmit();
    });

    this.filterInputControl
      .valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(keyword => {
        if (!this.serverLoading) {
          if (!this.filterDisabled) {
            this.dataSource.filter = keyword.trim().toLowerCase();
            if (this.dataSource.paginator) {
              this.dataSource.paginator.firstPage();
            }
          }
          else {
            this.customFilter.emit(keyword.trim().toLowerCase());
          }
        } else {
          this.offset = 0;
          this.limit = this.pageSize;
          this.getPageEmit();
        }
      });

    if (this.filterControl != null) {
      this.filterControl
        .valueChanges
        .subscribe(c => {
          this.filterInputControl.setValue(c);
        });
    }

    if (!this.columns)
      this.columns = [];
    this.displayedColumns = this.columns.map(column => column.columnDef);

    // this.resetPaginator
    //     .subscribe(x => {

    //         if(x){
    //             this.offset = 0;
    //         }
    //     });

    this.data
      .pipe(takeUntil(this._unsuscribeAll))
      .subscribe(c => {



        this.dataSource = new MatTableDataSource(c);
        this.dataSource.sort = this._defineSort();
        if (!this.hidePaginator)
          this.dataSource.paginator = this.paginator;

        setTimeout(() => {
          if (this.offset > this.total) {
            this.offset = 0;
          }
        }, 200);
      });

    if (this.resetPaginator != undefined) {
      this.resetPaginator
        .subscribe(x => {

          if (x) {
            this.offset = 0;
          } else {
            this.offset = -1;
          }
        });
    }

  }

  private _defineSort(): MatSort {
    let resultSort = this.sort;

    var sortColumnFilter = this.columns.filter(c => c.defaultSort || c.defaultSortDesc);
    if (sortColumnFilter.length > 0) {
      let order = sortColumnFilter[0].defaultSort ? 'desc' : 'asc';
      this.defaultSortColumn = `${sortColumnFilter[0].columnDef}:${order}`;
    }
    if (this.defaultSortColumn) {
      let sortColumn = this.defaultSortColumn;
      let sortOrder = 'asc';
      let arr = this.defaultSortColumn.split(':');
      if (arr.length > 1) {
        sortColumn = arr[0];
        sortOrder = arr[1].toLowerCase().trim() == 'desc' ? 'desc' : 'asc';
      }
      this.sort.sort(({ id: sortColumn, start: sortOrder }) as MatSortable);
    }

    return resultSort;
  }

  clear() {
    if (this.filterInputControl)
      this.filterInputControl.setValue('');
    if (this.filterControl)
      this.filterControl.setValue('');
  }

  newItem() {
    this.addItem.emit(null);
  }

  select(item: any) {
    if (!this.isSelectable) return;

    this.selectedRow = item;
    if (item != null)
      this.onSelectItem.emit(item);
  }

  dblclick(item: any) {
    if (item != null && this.onDblClick)
      this.onDblClick.emit(item);
  }

  previous() {
    if (this.offset > 0) {
      this.offset -= this.serverPageSize.value;
      this.getPageEmit();
    }
  }

  next() {
    if (this.offset < (this.total - this.serverPageSize.value)) {
      this.offset += this.serverPageSize.value;
      this.getPageEmit();
    }
  }

  getPageEmit() {
    this.getPage.emit({
      limit: this.limit
      , offset: this.offset
      , filter: this.filterInputControl.value.trim().toLowerCase()
    });
  }


  getValidThemePalette(color: string): ThemePalette {
    return ['primary', 'accent', 'warn'].includes(color) ? color as ThemePalette : 'primary';
  }

}
