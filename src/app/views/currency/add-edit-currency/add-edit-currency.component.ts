import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Branch, Currency } from 'src/app/dataservices/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyService } from 'src/app/dataservices/currency.service';
import { branchService } from 'src/app/dataservices/branch.service';

@Component({
  selector: 'app-add-edit-currency',
  templateUrl: './add-edit-currency.component.html',
  styleUrls: ['./add-edit-currency.component.scss']
})
export class AddEditCurrencyComponent implements OnInit {
  currencyForm: FormGroup;
  currencydata: any[];
  selectedCurrency:any;
  cc:string;
  symbol:string;
  currencies:Currency[];
  currency: Currency;
  branches:Branch[];
  modal_title:String;
  isEdit:Boolean;
  confirmButtonText:String;
  cancelButtonText:String;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddEditCurrencyComponent>, private fb: FormBuilder,private _currencyService:CurrencyService,private _branchService:branchService) { 
    this.currencydata = this._currencyService.countries
    if (data) {
      this.modal_title = data.description;
      this.isEdit = data.isEdit;
      if(this.isEdit){
        this.currency = data.currency;
      }
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }
  getBranches(){
    this._branchService.get().subscribe(data=>{
      this.branches = data;
    })
  }

  currencychange(name){
   
    this.selectedCurrency = this.currencydata.find(x=>x.name == name)
    this.cc = this.selectedCurrency.cc;
    this.symbol = this.selectedCurrency.symbol;
  }
  ngOnInit(): void {
    this.getBranches();

    if (this.isEdit) {
      this.modal_title += " " + this.currency.Currency;
      this.cc = this.currency.ShortName;
      this.symbol = this.currency.Symbol;
      this.currencyForm = this.fb.group({
        id: [this.currency.id],
        Currency: [this.currency.Currency],
        ShortName: [this.currency.ShortName],
        Symbol: [this.symbol],
        ExchangeRate: [this.currency.ExchangeRate],
        isBaseCurrency:[this.currency.IsBaseCurrency],        
      });
     

     
    }
    else {
      // this.cc = this.currency.ShortName;
      // this.symbol = this.currency.Symbol;
      this.currencyForm = this.fb.group({
        Currency: [''],
        ShortName: [''],
        Symbol: [''],
        ExchangeRate: [''],
        isBaseCurrency:[''],
      });
    }

  
    
  }
  save() {
    if (this.isEdit) {

      console.log(this.currencyForm.value);
      this._currencyService.update(this.currencyForm.value).subscribe(() => {
        
        this.dialogRef.close(this.currencyForm.value);
      })

    }
    else {
    
      this._currencyService.Add(this.currencyForm.value).subscribe(data => {
        this.dialogRef.close(this.currencyForm.value);
        this.currency = data;

      })

    }


  }

}
