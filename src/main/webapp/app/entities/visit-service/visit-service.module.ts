import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HealthcareSharedModule } from 'app/shared/shared.module';
import { VisitServiceComponent } from './visit-service.component';
import { VisitServiceDetailComponent } from './visit-service-detail.component';
import { VisitServiceUpdateComponent } from './visit-service-update.component';
import { VisitServiceDeleteDialogComponent } from './visit-service-delete-dialog.component';
import { visitServiceRoute } from './visit-service.route';

@NgModule({
  imports: [HealthcareSharedModule, RouterModule.forChild(visitServiceRoute)],
  declarations: [VisitServiceComponent, VisitServiceDetailComponent, VisitServiceUpdateComponent, VisitServiceDeleteDialogComponent],
  entryComponents: [VisitServiceDeleteDialogComponent]
})
export class HealthcareVisitServiceModule {}
