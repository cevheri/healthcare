import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HealthcareSharedModule } from 'app/shared/shared.module';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientUpdateComponent } from './patient-update.component';
import { PatientDeleteDialogComponent } from './patient-delete-dialog.component';
import { patientRoute } from './patient.route';

@NgModule({
  imports: [HealthcareSharedModule, RouterModule.forChild(patientRoute)],
  declarations: [PatientComponent, PatientDetailComponent, PatientUpdateComponent, PatientDeleteDialogComponent],
  entryComponents: [PatientDeleteDialogComponent]
})
export class HealthcarePatientModule {}
