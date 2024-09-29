import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
  standalone: true
})
export class ScrollToBottomDirective implements OnInit{
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();

  @Input() threshold = 20;

  private window!: Window;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.window = window;
  }

  @HostListener('window:scroll', ['$event.target'])
  windowScrollEvent(event: KeyboardEvent) {
    const heightOfWholePage = this.window.document.documentElement.scrollHeight;
    const heightOfElement = this.el.nativeElement.offsetHeight;
    const currentScrolledY = this.window.scrollY;
    const innerHeight = this.window.innerHeight;

    const spaceOfElementAndPage = heightOfWholePage - heightOfElement;

    const scrollToBottom = heightOfElement - innerHeight - currentScrolledY +  spaceOfElementAndPage;

    if(scrollToBottom < this.threshold) {
      this.nearEnd.emit();
    }
  }

}
