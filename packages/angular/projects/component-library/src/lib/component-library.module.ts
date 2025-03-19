import { APP_INITIALIZER, NgModule } from "@angular/core"
import { defineCustomElements } from "@stencil-storybook-boilerplate/core/loader"

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class ComponentLibraryModule {}
