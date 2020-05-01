import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { VisitUpdateComponent } from 'app/entities/visit/visit-update.component';
import { VisitService } from 'app/entities/visit/visit.service';
import { Visit } from 'app/shared/model/visit.model';

describe('Component Tests', () => {
  describe('Visit Management Update Component', () => {
    let comp: VisitUpdateComponent;
    let fixture: ComponentFixture<VisitUpdateComponent>;
    let service: VisitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [VisitUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VisitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Visit(123);
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
        const entity = new Visit();
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
