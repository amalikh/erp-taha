import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../dataservices/currency.service'
import { Currency } from '../../dataservices/models'
import { AddEditCurrencyComponent } from './add-edit-currency/add-edit-currency.component'
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ThemePalette } from '@angular/material/core';
import { by } from 'protractor';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {


  currencies: Currency[] = null;
  currency: Currency;
  checked = false;
  color: ThemePalette = 'primary';
  displayedColumns: string[] = ['id', 'Currency', 'ShortName', 'Symbol', 'ExchangeRate', 'IsBaseCurrency', 'actions'];
  dataSource = new MatTableDataSource<Currency>(this.currencies);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _currencyService: CurrencyService, private dialog: MatDialog) {
    this.dataSource.data = [];
  }

  ngOnInit(): void {
    this.getCurrencies();
  }



  getCurrencies() {
    this._currencyService.get().subscribe(
      data => {

        if (data.length > 0)
          this.currencies = data;
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )

  }
  openAddModal() {
    const dialogRef = this.dialog.open(AddEditCurrencyComponent, {
      data: {
        isEdit: false,
        description: 'Add Currency',
        buttonText: {
          cancel: 'cancel',
          ok: 'Add'
        },
      },
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.getCurrencies();
          this.showAlert("Data Added", "success");
        }
      },
    );
  }

  openEditModal(id) {
    this._currencyService.getbyId(id).subscribe(data => {
      this.currency = data;
      console.log(data)
      const dialogRef = this.dialog.open(AddEditCurrencyComponent, {
        data: {
          isEdit: true,
          description: 'Edit ',
          currency: this.currency,
          buttonText: {
            cancel: 'cancel',
            ok: 'update'

          },
        },
      });
      dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data)
          if (data) {
            this.getCurrencies();
            this.showAlert("Data Updated", "success");
          }
        },


      );
    })


  }

  deleteCurrency(id) {
    this._currencyService.delete(id).subscribe(
      data => {
        this.getCurrencies();
      }
    );
  }


  changed(currency,event) {
    currency.IsBaseCurrency = event.checked;
    this._currencyService.update(currency).subscribe(() =>{
      this.getCurrencies();
    })
  }





  showAlert(msg, type) {
    Swal.fire({
      position: 'top-end',
      icon: type,
      width: 200,
      title: msg,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    }
    )
  }

}
