import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBloodtype, Bloodtype } from 'app/shared/model/bloodtype.model';
import { BloodtypeService } from './bloodtype.service';
import { BloodtypeComponent } from './bloodtype.component';
import { BloodtypeDetailComponent } from './bloodtype-detail.component';
import { BloodtypeUpdateComponent } from './bloodtype-update.component';

@Injectable({ providedIn: 'root' })
export class BloodtypeResolve implements Resolve<IBloodtype> {
  constructor(private service: BloodtypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBloodtype> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bloodtype: HttpResponse<Bloodtype>) => {
          if (bloodtype.body) {
            return of(bloodtype.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bloodtype());
  }
}

export const bloodtypeRoute: Routes = [
  {
    path: '',
    component: BloodtypeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'healthcareApp.bloodtype.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BloodtypeDetailComponent,
    resolve: {
      bloodtype: BloodtypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.bloodtype.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BloodtypeUpdateComponent,
    resolve: {
      bloodtype: BloodtypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.bloodtype.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BloodtypeUpdateComponent,
    resolve: {
      bloodtype: BloodtypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.bloodtype.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
