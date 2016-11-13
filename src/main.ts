import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeNgStyles, createNewHosts, createInputTransfer, bootloader } from '@angularclass/hmr';

import { AppState } from './app/app.state';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [ AppModule ]
})
class MainModule {

    constructor(public appRef: ApplicationRef, private store$: Store<AppState>) {}

    hmrOnInit(store: any) {
        if (!store || !store.state) { return; }
        console.log('HMR store', JSON.stringify(store, null, 2));
        // reset state
        //this.store$.dispatch({
        //    type: 'RESET_STATE',
        //    payload: store.state || {}
        //});
        // restore input values
        if ('restoreInputValues' in store) { store.restoreInputValues(); }
        this.appRef.tick();
        Object.keys(store).forEach(prop => delete store[prop]);
    }

    hmrOnDestroy(store: any) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        //this.store$.take(1).subscribe(s => {
        //    store.state = s;
        //});
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: any) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}

export function main() {
    return platformBrowserDynamic().bootstrapModule(MainModule);
}

// boot on document ready
bootloader(main);
