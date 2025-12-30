import {ElementRef} from '@angular/core';

export function focusElement(element: ElementRef) {
  if (element) {
    setTimeout(() => element.nativeElement.focus(), 0);
  }
}
