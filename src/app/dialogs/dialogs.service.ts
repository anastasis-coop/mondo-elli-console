import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CentroDto } from '../dto/centro-dto';
import { PercorsoDto } from '../dto/percorso-dto';
import { OperatoreDto } from '../dto/operatore-dto';
import { UtenteDto } from '../dto/utente-dto';
import { UserService } from '../security/user.service';
import { AccountService } from '../services/account.service';
import { SerieUtentiDto } from '../dto/serie-utenti-dto';
import { CentroService } from '../services/centro.service';
import { PercorsoService } from '../services/percorso.service';
import { OperatoreService } from '../services/operatore.service';
import { UtenteService } from '../services/utente.service';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { DialogCambioEmailComponent } from './dialog-cambio-email/dialog-cambio-email.component';
import { DialogDatiCentroComponent } from './dialog-dati-centro/dialog-dati-centro.component';
import { DialogDatiOperatoreComponent } from './dialog-dati-operatore/dialog-dati-operatore.component';
import { DialogDatiPercorsoComponent } from './dialog-dati-percorso/dialog-dati-percorso.component';
import { DialogDatiUtenteComponent } from './dialog-dati-utente/dialog-dati-utente.component';
import { DialogDatiProfiloComponent } from './dialog-dati-profilo/dialog-dati-profilo.component';
import { DialogSceltaOperatoriComponent } from './dialog-scelta-operatori/dialog-scelta-operatori.component';
import { DialogSceltaPercorsiComponent } from './dialog-scelta-percorsi/dialog-scelta-percorsi.component';
import { DialogSerieUtentiComponent } from './dialog-serie-utenti/dialog-serie-utenti.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { DialogConfirmDeleteComponent } from './dialog-confirm-delete/dialog-confirm-delete.component';

const PANEL_CLASS = 'mondoelli-dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private dialog: MatDialog,
    private userService: UserService,
    private centroService: CentroService,
    private accountService: AccountService,
    private percorsoService: PercorsoService,
    private operatoreService: OperatoreService,
    private utenteService: UtenteService) { }

  showAlert(title: string, message: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.dialog.open(DialogAlertComponent, { panelClass: PANEL_CLASS, data: { title, message } })
        .afterClosed().subscribe(() => resolve());
    });
  }

  askConfirmation(title: string, message: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.dialog.open(DialogConfirmComponent, { panelClass: PANEL_CLASS, data: { title, message } })
        .afterClosed().subscribe(confirmed => resolve(confirmed));
    });
  }

  askDeleteConfirmation(title: string, message: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.dialog.open(DialogConfirmDeleteComponent, { panelClass: PANEL_CLASS, data: { title, message } })
        .afterClosed().subscribe(confirmed => resolve(confirmed));
    });
  }

  createCentro(): Promise<CentroDto> {
    return new Promise<CentroDto>((resolve, reject) => {
      this.dialog.open(DialogDatiCentroComponent, { panelClass: PANEL_CLASS, disableClose: true }).afterClosed().subscribe({
        next: (datiCentro: CentroDto) => {
          if (datiCentro) {
            this.centroService.createCentro(datiCentro).subscribe({
              next: centro => resolve(centro),
              error: error => reject(error)
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  editCentro(centro: CentroDto): Promise<CentroDto> {
    return new Promise<CentroDto>((resolve, reject) => {
      this.dialog.open(DialogDatiCentroComponent, { panelClass: PANEL_CLASS, disableClose: true, data: centro }).afterClosed().subscribe({
        next: (datiCentro: CentroDto) => {
          if (datiCentro) {
            this.centroService.updateCentro(datiCentro.id, datiCentro).subscribe({
              next: centro => resolve(centro),
              error: error => reject(error)
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  createPercorsoGruppo(centro: CentroDto, operatoreId: number | null): Promise<PercorsoDto> {
    return new Promise<PercorsoDto>((resolve, reject) => {
      this.dialog.open(DialogDatiPercorsoComponent, { panelClass: PANEL_CLASS, disableClose: true, data: { tipo: 'GRUPPO' } }).afterClosed().subscribe({
        next: (datiPercorso: PercorsoDto) => {
          if (centro && datiPercorso) {
            this.centroService.createPercorso(centro.id, datiPercorso).subscribe({
              next: percorso => {
                if (operatoreId) {
                  this.operatoreService.addPercorsoToOperatore(percorso.id, operatoreId).subscribe({
                    next: () => resolve(percorso),
                    error: error => reject(error)
                  });
                } else {
                  resolve(percorso);
                }
              },
              error: error => reject(error)
            });
          }
        }
      });
    });
  }

  createPercorsoSingolo(centro: CentroDto, operatoreId: number | null): Promise<PercorsoDto> {
    return new Promise<PercorsoDto>((resolve, reject) => {
      this.dialog.open(DialogDatiPercorsoComponent, { panelClass: PANEL_CLASS, disableClose: true, data: { tipo: 'SINGOLO' } }).afterClosed().subscribe({
        next: (datiPercorso: PercorsoDto) => {
          if (centro && datiPercorso) {
            this.centroService.createPercorso(centro.id, datiPercorso).subscribe({
              next: percorso => {
                if (operatoreId) {
                  this.operatoreService.addPercorsoToOperatore(percorso.id, operatoreId).subscribe({
                    next: () => {
                      this.createUtente(percorso, false).then(
                        () => resolve(percorso),
                        (error) => reject(error)
                      );
                    },
                    error: error => reject(error)
                  });
                } else {
                  this.createUtente(percorso, false).then(
                    () => resolve(percorso),
                    (error) => reject(error)
                  );
                }
              },
            });
          }
        }
      });
    });
  }

  editPercorso(percorso: PercorsoDto): Promise<PercorsoDto> {
    return new Promise<PercorsoDto>((resolve, reject) => {
      this.dialog.open(DialogDatiPercorsoComponent, { panelClass: PANEL_CLASS, disableClose: true, data: { percorso } }).afterClosed().subscribe({
        next: (datiPercorso: PercorsoDto) => {
          if (datiPercorso) {
            this.percorsoService.updatePercorso(datiPercorso.id, datiPercorso).subscribe({
              next: percorso => resolve(percorso),
              error: error => reject(error)
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  createOperatore(centro: CentroDto, lockReferente: boolean): Promise<OperatoreDto> {
    return new Promise<OperatoreDto>((resolve, reject) => {
      this.dialog.open(DialogDatiOperatoreComponent, { panelClass: PANEL_CLASS, disableClose: true }).afterClosed().subscribe({
        next: (datiOperatore: OperatoreDto) => {
          if (centro && datiOperatore) {
            this.centroService.createOperatore(centro.id, datiOperatore).subscribe({
              next: operatore => {
                this.operatoreService.invioMailPrimoAccesso(operatore.id).subscribe({
                  next: () => resolve(operatore),
                  error: error => reject(error)
                });
              },
              error: error => reject(error)
            });
          }
        }
      });
    });
  }

  editOperatore(operatore: OperatoreDto): Promise<OperatoreDto> {
    return new Promise<OperatoreDto>((resolve, reject) => {
      this.dialog.open(DialogDatiOperatoreComponent, { panelClass: PANEL_CLASS, disableClose: true, data: operatore }).afterClosed().subscribe({
        next: (datiOperatore: OperatoreDto) => {
          if (datiOperatore) {
            this.operatoreService.updateOperatore(datiOperatore.id, datiOperatore).subscribe({
              next: operatore => resolve(operatore),
              error: error => reject(error)
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  editProfilo(profilo: OperatoreDto): Promise<OperatoreDto> {
    return new Promise<OperatoreDto>((resolve, reject) => {
      this.dialog.open(DialogDatiProfiloComponent, { panelClass: PANEL_CLASS, disableClose: true, data: profilo }).afterClosed().subscribe({
        next: (profilo: OperatoreDto) => {
          if (profilo) {
            this.operatoreService.updateOperatore(profilo.id, profilo).subscribe({
              next: profilo => resolve(profilo),
              error: error => reject(error)
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  cambioEmail(account: OperatoreDto): Promise<OperatoreDto> {
    return new Promise<OperatoreDto>((resolve, reject) => {
      this.dialog.open(DialogCambioEmailComponent, { panelClass: PANEL_CLASS, disableClose: true, data: account.username }).afterClosed().subscribe({
        next: (username: string) => {
          if (username) {
            this.accountService.setAccountUsername(account.id, username).subscribe({
              next: token => {
                account.username = username;
                this.userService.updateUsername(username);
                this.userService.updateToken(token.token);
                resolve(account);
              },
              error: error => reject(error)
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  createUtente(percorso: PercorsoDto, gruppoVuoto: boolean): Promise<UtenteDto> {
    return new Promise<UtenteDto>((resolve, reject) => {
      this.dialog.open(DialogDatiUtenteComponent, { panelClass: PANEL_CLASS, disableClose: true, data: { gruppoVuoto } }).afterClosed().subscribe({
        next: (datiUtente: UtenteDto) => {
          if (percorso && datiUtente) {
            this.percorsoService.createUtente(percorso.id, datiUtente).subscribe({
              next: utente => resolve(utente),
              error: error => {
                if (error.status == 409) {
                  this.showAlert('Operazione annullata', 'Username già esistente o password non valida').then(() => {
                    reject(error);
                  });
                } else {
                  reject(error);
                }
              }
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  editUtente(utente: UtenteDto): Promise<UtenteDto> {
    return new Promise<UtenteDto>((resolve, reject) => {
      this.dialog.open(DialogDatiUtenteComponent, { panelClass: PANEL_CLASS, disableClose: true, data: { gruppoVuoto: false, utente } }).afterClosed().subscribe({
        next: (datiUtente: UtenteDto) => {
          if (datiUtente) {
            this.utenteService.updateUtente(datiUtente.id!, datiUtente).subscribe({
              next: utente => resolve(utente),
              error: error => reject(error)
            });
          } else {
            reject();
          }
        }
      });
    });
  }

  selectOperatori(centro: CentroDto, percorso: PercorsoDto, operatori: OperatoreDto[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.centroService.getOperatoriCentro(centro.id).subscribe(operatoriCentro => {
        if (operatoriCentro.length > 0) {
          let operatoriPercorso: number[] = operatori.map(o => o.id);
          this.dialog.open(DialogSceltaOperatoriComponent, {
            panelClass: PANEL_CLASS, disableClose: true,
            data: {
              centro,
              operatoriPercorso,
              operatoriCentro
            }
          }).afterClosed().subscribe((selezione: number[]) => {
            if (selezione) {
              this.applyChangesOperatori(percorso, operatoriPercorso, selezione).then(
                () => resolve(),
                error => reject(error)
              );
            } else {
              reject();
            }
          });
        } else {
          this.showAlert('Operazione annullata', 'In questo centro non ci sono operatori.')
        }
      });
    });
  }

  applyChangesOperatori(percorso: PercorsoDto, before: number[], after: number[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let operazioni: Observable<void>[] = [];
      after.forEach(id => {
        if (!before.includes(id)) {
          operazioni.push(this.operatoreService.addPercorsoToOperatore(percorso.id, id));
        }
      });
      before.forEach(id => {
        if (!after.includes(id)) {
          operazioni.push(this.operatoreService.removePercorsoFromOperatore(percorso.id, id));
        }
      });
      zip(operazioni).subscribe({
        next: () => resolve(),
        error: error => reject(error)
      });
    });
  }

  selectPercorsi(centro: CentroDto, operatore: OperatoreDto, percorsi: PercorsoDto[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.centroService.getPercorsiCentro(centro.id).subscribe(percorsiCentro => {
        if (percorsiCentro.length > 0) {
          let percorsiOperatore: number[] = percorsi.map(g => g.id);
          percorsiCentro = percorsiCentro.filter(p => p.archiviato !== true);
          this.dialog.open(DialogSceltaPercorsiComponent, {
            panelClass: PANEL_CLASS, disableClose: true,
            data: {
              centro,
              percorsiOperatore,
              percorsiCentro
            }
          }).afterClosed().subscribe((selezione: number[]) => {
            if (selezione) {
              this.applyChangesPercorsi(operatore, percorsiOperatore, selezione).then(
                () => resolve(),
                error => reject(error)
              );
            } else {
              reject();
            }
          });
        } else {
          this.showAlert('Operazione annullata', 'In questo centro non ci sono percorsi.')
        }
      });
    });
  }

  applyChangesPercorsi(operatore: OperatoreDto, before: number[], after: number[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let operazioni: Observable<void>[] = [];
      after.forEach(id => {
        if (!before.includes(id)) {
          operazioni.push(this.percorsoService.addOperatoreToPercorso(operatore.id, id));
        }
      });
      before.forEach(id => {
        if (!after.includes(id)) {
          operazioni.push(this.percorsoService.removeOperatoreFromPercorso(operatore.id, id));
        }
      });
      zip(operazioni).subscribe({
        next: () => resolve(),
        error: error => reject(error)
      });
    });
  }

  createSerieUtenti(percorso: PercorsoDto, gruppoVuoto: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.dialog.open(DialogSerieUtentiComponent, { panelClass: PANEL_CLASS, disableClose: true, data: { gruppoVuoto } }).afterClosed().subscribe({
        next: (datiSerieUtenti: SerieUtentiDto) => {
          if (percorso && datiSerieUtenti) {
            this.percorsoService.createSerieUtenti(percorso.id, datiSerieUtenti).subscribe({
              next: () => resolve(),
              error: error => {
                if (error.status == 409) {
                  this.showAlert('Operazione annullata', 'Username già esistente o password non valida').then(() => {
                    reject(error);
                  });
                } else {
                  reject(error);
                }
              }
            });
          }
        }
      });
    });
  }

}
