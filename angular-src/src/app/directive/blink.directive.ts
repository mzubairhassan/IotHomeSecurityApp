import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ selector: '[alBlink]' })

export class BlinkDirective {
  
    constructor(el: ElementRef, renderer: Renderer) {
      setInterval(() => { 
        let style = "hidden";
        if(el.nativeElement.style.visibility && el.nativeElement.style.visibility == "hidden") {
          style = "visible";
        }
        renderer.setElementStyle(el.nativeElement, 'visibility', style); 
      }, 750);
    }
    
}