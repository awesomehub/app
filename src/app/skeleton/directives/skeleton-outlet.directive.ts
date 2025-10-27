import { Directive, Input, inject, ComponentRef, ViewContainerRef, Type, Output, EventEmitter } from '@angular/core'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ah-skeleton-outlet',
  exportAs: 'skeleton',
  standalone: false,
})
export class SkeletonOutletDirective<C = any> {
  @Input() name = 'primary'
  @Output() activate = new EventEmitter<C>(false)
  @Output() deactivate = new EventEmitter<C>(false)

  private vcRef = inject(ViewContainerRef)
  private ref?: ComponentRef<C>

  attach(component: Type<C>, props?: Partial<C>): ComponentRef<C> {
    this.clear()
    const ref = this.vcRef.createComponent(component)
    if (props) Object.assign(ref.instance, props)
    this.ref = ref
    this.activate.emit(ref.instance)
    return ref
  }

  clear() {
    if (!this.ref) return
    this.deactivate.emit(this.ref.instance)
    this.ref.destroy()
    this.vcRef.clear()
    this.ref = undefined
  }
}
