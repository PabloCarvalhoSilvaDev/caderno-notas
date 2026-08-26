import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MenuLateral } from './menu-lateral';

describe('MenuLateral', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLateral],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(MenuLateral);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar os links de navegação', () => {
    const fixture = TestBed.createComponent(MenuLateral);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('.menu-lateral__nav a');
    expect(links.length).toBe(3);
    expect(links[0].textContent?.trim()).toBe('Início');
    expect(links[1].textContent?.trim()).toBe('Sobre');
    expect(links[2].textContent?.trim()).toBe('Produtos');
  });
});
