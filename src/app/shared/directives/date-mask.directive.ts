import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDateMask]',
})
export class DateMaskDirective {
  @Input() mask;
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (
      this.mask &&
      (this.mask.length === 2 || this.mask.length === 5) &&
      event.key !== 'Backspace'
    ) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'value',
        this.mask + '/'
      );
    }
  }
}
