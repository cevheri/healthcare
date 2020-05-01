import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVisitService, VisitService } from 'app/shared/model/visit-service.model';
import { VisitServiceService } from './visit-service.service';
import { VisitServiceComponent } from './visit-service.component';
import { VisitServiceDetailComponent } from './visit-service-detail.component';
import { VisitServiceUpdateComponent } from './visit-service-update.component';

@Injectable({ providedIn: 'root' })
export class VisitServiceResolve implements Resolve<IVisitService> {
  constructor(private service: VisitServiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisitService> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((visitService: HttpResponse<VisitService>) => {
          if (visitService.body) {
            return of(visitService.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VisitService());
  }
}

export const visitServiceRoute: Routes = [
  {
    path: '',
    component: VisitServiceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'healthcareApp.visitService.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VisitServiceDetailComponent,
    resolve: {
      visitService: VisitServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.visitService.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VisitServiceUpdateComponent,
    resolve: {
      visitService: VisitServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.visitService.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VisitServiceUpdateComponent,
    resolve: {
      visitService: VisitServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.visitService.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
