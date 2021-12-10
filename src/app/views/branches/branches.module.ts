import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BranchesComponent } from './branches.component';
import { MaterialModule } from '../../views/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableExporterModule } from 'mat-table-exporter';
import {NgxPrintModule} from 'ngx-print';


const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
  }
]
@NgModule({
  declarations: [
    BranchesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgxPrintModule,
    MatTableExporterModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class BranchesModule { }
