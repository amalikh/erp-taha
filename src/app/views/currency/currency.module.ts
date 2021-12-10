import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../views/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyComponent } from './currency.component';
import { AddEditCurrencyComponent } from './add-edit-currency/add-edit-currency.component';


const routes: Routes = [
  {
    path: '',
    component: CurrencyComponent,
  }
]
@NgModule({
  declarations: [ AddEditCurrencyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class CurrencyModule { }
