import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IVisit, Visit } from 'app/shared/model/visit.model';
import { VisitService } from './visit.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';
import { IDoctor } from 'app/shared/model/doctor.model';
import { DoctorService } from 'app/entities/doctor/doctor.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';
import { IVisitService } from 'app/shared/model/visit-service.model';
import { VisitServiceService } from 'app/entities/visit-service/visit-service.service';

type SelectableEntity = IPatient | IDoctor | IDepartment | IVisitService;

@Component({
  selector: 'jhi-visit-update',
  templateUrl: './visit-update.component.html'
})
export class VisitUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[] = [];
  doctors: IDoctor[] = [];
  departments: IDepartment[] = [];
  visitservices: IVisitService[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    type: [],
    patientId: [],
    doctorId: [],
    departmentId: [],
    visitServices: []
  });

  constructor(
    protected visitService: VisitService,
    protected patientService: PatientService,
    protected doctorService: DoctorService,
    protected departmentService: DepartmentService,
    protected visitServiceService: VisitServiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visit }) => {
      if (!visit.id) {
        const today = moment().startOf('day');
        visit.date = today;
      }

      this.updateForm(visit);

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));

      this.doctorService.query().subscribe((res: HttpResponse<IDoctor[]>) => (this.doctors = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartment[]>) => (this.departments = res.body || []));

      this.visitServiceService.query().subscribe((res: HttpResponse<IVisitService[]>) => (this.visitservices = res.body || []));
    });
  }

  updateForm(visit: IVisit): void {
    this.editForm.patchValue({
      id: visit.id,
      date: visit.date ? visit.date.format(DATE_TIME_FORMAT) : null,
      type: visit.type,
      patientId: visit.patientId,
      doctorId: visit.doctorId,
      departmentId: visit.departmentId,
      visitServices: visit.visitServices
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visit = this.createFromForm();
    if (visit.id !== undefined) {
      this.subscribeToSaveResponse(this.visitService.update(visit));
    } else {
      this.subscribeToSaveResponse(this.visitService.create(visit));
    }
  }

  private createFromForm(): IVisit {
    return {
      ...new Visit(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      type: this.editForm.get(['type'])!.value,
      patientId: this.editForm.get(['patientId'])!.value,
      doctorId: this.editForm.get(['doctorId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value,
      visitServices: this.editForm.get(['visitServices'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IVisitService[], option: IVisitService): IVisitService {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
