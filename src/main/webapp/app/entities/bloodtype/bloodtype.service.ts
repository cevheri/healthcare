import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBloodtype } from 'app/shared/model/bloodtype.model';

type EntityResponseType = HttpResponse<IBloodtype>;
type EntityArrayResponseType = HttpResponse<IBloodtype[]>;

@Injectable({ providedIn: 'root' })
export class BloodtypeService {
  public resourceUrl = SERVER_API_URL + 'api/bloodtypes';

  constructor(protected http: HttpClient) {}

  create(bloodtype: IBloodtype): Observable<EntityResponseType> {
    return this.http.post<IBloodtype>(this.resourceUrl, bloodtype, { observe: 'response' });
  }

  update(bloodtype: IBloodtype): Observable<EntityResponseType> {
    return this.http.put<IBloodtype>(this.resourceUrl, bloodtype, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBloodtype>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBloodtype[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
