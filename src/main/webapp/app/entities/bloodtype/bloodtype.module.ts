import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HealthcareSharedModule } from 'app/shared/shared.module';
import { BloodtypeComponent } from './bloodtype.component';
import { BloodtypeDetailComponent } from './bloodtype-detail.component';
import { BloodtypeUpdateComponent } from './bloodtype-update.component';
import { BloodtypeDeleteDialogComponent } from './bloodtype-delete-dialog.component';
import { bloodtypeRoute } from './bloodtype.route';

@NgModule({
  imports: [HealthcareSharedModule, RouterModule.forChild(bloodtypeRoute)],
  declarations: [BloodtypeComponent, BloodtypeDetailComponent, BloodtypeUpdateComponent, BloodtypeDeleteDialogComponent],
  entryComponents: [BloodtypeDeleteDialogComponent]
})
export class HealthcareBloodtypeModule {}
