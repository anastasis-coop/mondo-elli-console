import { TestBed } from '@angular/core/testing';

import { AgendaPercorsoService } from './agenda-percorso.service';

describe('AgendaPercorsoService', () => {
  let service: AgendaPercorsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaPercorsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate Dates without Introduction', () => {
    let inizio = new Date('2023-05-18T00:00:00.000Z');
    let periodi = service.calcolaDatePercorsoSenzaIntroduzione(inizio, 14);
    expect(periodi.length).toBe(4);
    expect(periodi[0].inizio.toISOString().substring(0, 10)).toBe('2023-05-18');
    expect(periodi[0].fine.toISOString().substring(0, 10)).toBe('2023-05-31');
    expect(periodi[1].inizio.toISOString().substring(0, 10)).toBe('2023-06-01');
    expect(periodi[1].fine.toISOString().substring(0, 10)).toBe('2023-06-14');
    expect(periodi[2].inizio.toISOString().substring(0, 10)).toBe('2023-06-15');
    expect(periodi[2].fine.toISOString().substring(0, 10)).toBe('2023-06-28');
    expect(periodi[3].inizio.toISOString().substring(0, 10)).toBe('2023-06-29');
    expect(periodi[3].fine.toISOString().substring(0, 10)).toBe('2023-07-12');
  });

  it('should calculate Dates with Introduction', () => {
    let inizio = new Date('2023-05-18T00:00:00.000Z');
    let periodi = service.calcolaDatePercorsoConIntroduzione(inizio, 7, 14);
    expect(periodi.length).toBe(5);
    expect(periodi[0].inizio.toISOString().substring(0, 10)).toBe('2023-05-18');
    expect(periodi[0].fine.toISOString().substring(0, 10)).toBe('2023-05-24');
    expect(periodi[1].inizio.toISOString().substring(0, 10)).toBe('2023-05-25');
    expect(periodi[1].fine.toISOString().substring(0, 10)).toBe('2023-06-07');
    expect(periodi[2].inizio.toISOString().substring(0, 10)).toBe('2023-06-08');
    expect(periodi[2].fine.toISOString().substring(0, 10)).toBe('2023-06-21');
    expect(periodi[3].inizio.toISOString().substring(0, 10)).toBe('2023-06-22');
    expect(periodi[3].fine.toISOString().substring(0, 10)).toBe('2023-07-05');
    expect(periodi[4].inizio.toISOString().substring(0, 10)).toBe('2023-07-06');
    expect(periodi[4].fine.toISOString().substring(0, 10)).toBe('2023-07-19');
  });

});
