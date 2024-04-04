import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() title!: string;
  @Input() cols!: string;
  @Input() rows!: string;
  @Input() limit:number = 100 
  @Input() formControlT!: FormControl;
  length = 0;

  changeLength(event: any){
    this.length = event.target.value.length;
  }
}
