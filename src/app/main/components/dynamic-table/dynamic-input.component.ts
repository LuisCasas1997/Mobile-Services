import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent implements OnInit {

  @Input() type: 'text' | 'decimal' | 'number' | 'email' | 'currency' = 'text';
  @Input() value: any = undefined;
  @Input() placeholder: string = "Ingresar valor";
  @Input() disabledInput: boolean = false;

  @Output() valueChanges: EventEmitter<any> = new EventEmitter();

  formControl: FormControl = new FormControl();

  constructor() {

  }

  ngOnInit(): void {

    this.formControl = new FormControl();
    this.formControl.valueChanges
      .pipe(
        debounceTime(300)
        , distinctUntilChanged()
      )
      .subscribe(c => this.valueChanges.emit(c));
    if (this.value) {
      this.formControl.setValue(this.value);
    }

    this.disabledInput == true ? this.formControl.disable() : this.formControl.enable();

  }

}
