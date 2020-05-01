import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { VisitDetailComponent } from 'app/entities/visit/visit-detail.component';
import { Visit } from 'app/shared/model/visit.model';

describe('Component Tests', () => {
  describe('Visit Management Detail Component', () => {
    let comp: VisitDetailComponent;
    let fixture: ComponentFixture<VisitDetailComponent>;
    const route = ({ data: of({ visit: new Visit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [VisitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VisitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load visit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
