import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRehberUpdateComponent } from './admin-rehber-update.component';

describe('AdminRehberUpdateComponent', () => {
  let component: AdminRehberUpdateComponent;
  let fixture: ComponentFixture<AdminRehberUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRehberUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminRehberUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
