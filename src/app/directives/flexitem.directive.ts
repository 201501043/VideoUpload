import { Directive, ElementRef } from '@angular/core';

/*
  Example:
  ```html
  <div [appFlexitem] data-basis="60%">...</div>```
*/

@Directive({
  selector: '[appFlexitem]'
})
export class FlexitemDirective {
  constructor(private ele: ElementRef<HTMLDivElement>) { 
    let flexBasis = this.ele.nativeElement
    flexBasis.style.flexBasis = flexBasis.getAttribute('data-basis')!;
  }

}
