import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SkeletonComponent } from './components'
import { SkeletonOutletDirective } from './directives'
import { SkeletonService } from './services'

@NgModule({
  imports: [CommonModule],
  declarations: [SkeletonComponent, SkeletonOutletDirective],
  exports: [SkeletonComponent, SkeletonOutletDirective],
})
export class SkeletonModule {
  static provideService(): ModuleWithProviders<SkeletonModule> {
    return {
      ngModule: SkeletonModule,
      providers: [SkeletonService],
    }
  }
}
