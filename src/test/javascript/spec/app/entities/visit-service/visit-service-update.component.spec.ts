import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { VisitServiceUpdateComponent } from 'app/entities/visit-service/visit-service-update.component';
import { VisitServiceService } from 'app/entities/visit-service/visit-service.service';
import { VisitService } from 'app/shared/model/visit-service.model';

describe('Component Tests', () => {
  describe('VisitService Management Update Component', () => {
    let comp: VisitServiceUpdateComponent;
    let fixture: ComponentFixture<VisitServiceUpdateComponent>;
    let service: VisitServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [VisitServiceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VisitServiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitServiceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitServiceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VisitService(123);
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
        const entity = new VisitService();
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
