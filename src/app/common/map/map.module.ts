import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDabS4raAsDjXnijh_ywWfrjEmUa1sBuyo '
    })
  ],
  exports: [MapComponent],
  providers: [MapService, CamelizePipe]
})
export class MapModule {}
