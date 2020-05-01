import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVisitService } from 'app/shared/model/visit-service.model';

type EntityResponseType = HttpResponse<IVisitService>;
type EntityArrayResponseType = HttpResponse<IVisitService[]>;

@Injectable({ providedIn: 'root' })
export class VisitServiceService {
  public resourceUrl = SERVER_API_URL + 'api/visit-services';

  constructor(protected http: HttpClient) {}

  create(visitService: IVisitService): Observable<EntityResponseType> {
    return this.http.post<IVisitService>(this.resourceUrl, visitService, { observe: 'response' });
  }

  update(visitService: IVisitService): Observable<EntityResponseType> {
    return this.http.put<IVisitService>(this.resourceUrl, visitService, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVisitService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVisitService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
