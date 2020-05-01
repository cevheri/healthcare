import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { DoctorUpdateComponent } from 'app/entities/doctor/doctor-update.component';
import { DoctorService } from 'app/entities/doctor/doctor.service';
import { Doctor } from 'app/shared/model/doctor.model';

describe('Component Tests', () => {
  describe('Doctor Management Update Component', () => {
    let comp: DoctorUpdateComponent;
    let fixture: ComponentFixture<DoctorUpdateComponent>;
    let service: DoctorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [DoctorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DoctorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DoctorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoctorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Doctor(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Doctor();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
