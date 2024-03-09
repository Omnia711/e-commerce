import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAuthLayoutComponent } from './nav-auth-layout.component';

describe('NavAuthLayoutComponent', () => {
  let component: NavAuthLayoutComponent;
  let fixture: ComponentFixture<NavAuthLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavAuthLayoutComponent]
    });
    fixture = TestBed.createComponent(NavAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
