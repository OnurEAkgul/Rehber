import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersPanelComponent } from './admin-users-panel.component';

describe('AdminUsersPanelComponent', () => {
  let component: AdminUsersPanelComponent;
  let fixture: ComponentFixture<AdminUsersPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsersPanelComponent]
    });
    fixture = TestBed.createComponent(AdminUsersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
