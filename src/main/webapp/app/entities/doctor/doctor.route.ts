import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoctor, Doctor } from 'app/shared/model/doctor.model';
import { DoctorService } from './doctor.service';
import { DoctorComponent } from './doctor.component';
import { DoctorDetailComponent } from './doctor-detail.component';
import { DoctorUpdateComponent } from './doctor-update.component';

@Injectable({ providedIn: 'root' })
export class DoctorResolve implements Resolve<IDoctor> {
  constructor(private service: DoctorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoctor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doctor: HttpResponse<Doctor>) => {
          if (doctor.body) {
            return of(doctor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Doctor());
  }
}

export const doctorRoute: Routes = [
  {
    path: '',
    component: DoctorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'healthcareApp.doctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoctorDetailComponent,
    resolve: {
      doctor: DoctorResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.doctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoctorUpdateComponent,
    resolve: {
      doctor: DoctorResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.doctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoctorUpdateComponent,
    resolve: {
      doctor: DoctorResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.doctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
