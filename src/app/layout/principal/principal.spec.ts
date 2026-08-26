import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Principal } from './principal';

describe('Principal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Principal],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(Principal);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve exibir o nome do usuário', () => {
    const fixture = TestBed.createComponent(Principal);
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('.principal__usuario')?.textContent).toContain('Pablo Carvalho Silva');
  });

  it('deve alternar o menu lateral', () => {
    const fixture = TestBed.createComponent(Principal);
    fixture.detectChanges();

    const menu = fixture.nativeElement.querySelector('.principal__menu') as HTMLElement;
    expect(menu.classList.contains('is-recolhido')).toBeTrue();

    (fixture.nativeElement.querySelector('.principal__alternar') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(menu.classList.contains('is-recolhido')).toBeFalse();
  });
});
