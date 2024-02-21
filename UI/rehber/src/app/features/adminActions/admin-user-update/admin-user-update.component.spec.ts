import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserUpdateComponent } from './admin-user-update.component';

describe('AdminUserUpdateComponent', () => {
  let component: AdminUserUpdateComponent;
  let fixture: ComponentFixture<AdminUserUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
