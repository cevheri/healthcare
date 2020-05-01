import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { VisitServiceDetailComponent } from 'app/entities/visit-service/visit-service-detail.component';
import { VisitService } from 'app/shared/model/visit-service.model';

describe('Component Tests', () => {
  describe('VisitService Management Detail Component', () => {
    let comp: VisitServiceDetailComponent;
    let fixture: ComponentFixture<VisitServiceDetailComponent>;
    const route = ({ data: of({ visitService: new VisitService(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [VisitServiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VisitServiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitServiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load visitService on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visitService).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
