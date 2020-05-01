import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVisit, Visit } from 'app/shared/model/visit.model';
import { VisitService } from './visit.service';
import { VisitComponent } from './visit.component';
import { VisitDetailComponent } from './visit-detail.component';
import { VisitUpdateComponent } from './visit-update.component';

@Injectable({ providedIn: 'root' })
export class VisitResolve implements Resolve<IVisit> {
  constructor(private service: VisitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((visit: HttpResponse<Visit>) => {
          if (visit.body) {
            return of(visit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Visit());
  }
}

export const visitRoute: Routes = [
  {
    path: '',
    component: VisitComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'healthcareApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VisitDetailComponent,
    resolve: {
      visit: VisitResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VisitUpdateComponent,
    resolve: {
      visit: VisitResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VisitUpdateComponent,
    resolve: {
      visit: VisitResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'healthcareApp.visit.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
