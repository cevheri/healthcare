import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(m => m.HealthcarePatientModule)
      },
      {
        path: 'department',
        loadChildren: () => import('./department/department.module').then(m => m.HealthcareDepartmentModule)
      },
      {
        path: 'doctor',
        loadChildren: () => import('./doctor/doctor.module').then(m => m.HealthcareDoctorModule)
      },
      {
        path: 'visit-service',
        loadChildren: () => import('./visit-service/visit-service.module').then(m => m.HealthcareVisitServiceModule)
      },
      {
        path: 'visit',
        loadChildren: () => import('./visit/visit.module').then(m => m.HealthcareVisitModule)
      },
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.HealthcareCompanyModule)
      },
      {
        path: 'bloodtype',
        loadChildren: () => import('./bloodtype/bloodtype.module').then(m => m.HealthcareBloodtypeModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class HealthcareEntityModule {}
