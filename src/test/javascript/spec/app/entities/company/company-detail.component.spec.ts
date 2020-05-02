import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HealthcareTestModule } from '../../../test.module';
import { CompanyDetailComponent } from 'app/entities/company/company-detail.component';
import { Company } from 'app/shared/model/company.model';

describe('Component Tests', () => {
  describe('Company Management Detail Component', () => {
    let comp: CompanyDetailComponent;
    let fixture: ComponentFixture<CompanyDetailComponent>;
    const route = ({ data: of({ company: new Company(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HealthcareTestModule],
        declarations: [CompanyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CompanyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CompanyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load company on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.company).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
