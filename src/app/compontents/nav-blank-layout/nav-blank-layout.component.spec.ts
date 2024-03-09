import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBlankLayoutComponent } from './nav-blank-layout.component';

describe('NavBlankLayoutComponent', () => {
  let component: NavBlankLayoutComponent;
  let fixture: ComponentFixture<NavBlankLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBlankLayoutComponent]
    });
    fixture = TestBed.createComponent(NavBlankLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
