import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './app/compiled/src/app/app.module.ngfactory';

if (ENV.APP_ENV === 'production') {
    enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
