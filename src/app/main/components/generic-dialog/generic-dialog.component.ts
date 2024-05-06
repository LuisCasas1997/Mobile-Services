import { AfterViewInit, Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericDialogDirective } from './generic-dialog.directive';
import { IGenericDialog } from './generic-dialog.inteface';


@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericDialogComponent implements OnInit, AfterViewInit {
  @ViewChild("genericDialogDirective", { static: false }) genericDialogDirective!: GenericDialogDirective;

  title: String = "NOT TITLE";
  icon: String = "";
  subtitle: String = "";
  component: any;
  data: any;
  actions: any[] = [];

  constructor(
    public _matDialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.component = this._data.component;
    this.title = this._data.title;
    this.data = this._data.data;
    this.icon = this._data.icon;
    this.subtitle = this._data.subtitle;
  }

  ngOnInit() {
    // Intentionally empty for now
  }

  ngAfterViewInit() {
    console.log('Directive:', this.genericDialogDirective);
    if (this.genericDialogDirective) {
      this.loadComponent();
    } else {
      console.error('GenericDialogDirective is still not initialized!');
    }
  }


  loadComponent() {
    if (!this.genericDialogDirective) {
      console.error('GenericDialogDirective is not initialized!');
      return;
    }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory<IGenericDialog>(this.component);
    try {
      const viewContainerRef = this.genericDialogDirective.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent<IGenericDialog>(componentFactory);
      // configuraciones adicionales...
    } catch (error) {
      console.error('Error when initializing the component:', error);
    }
  }

}
