import { Component, NgModule,AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { branchService } from '../../dataservices/branch.service'
import { Branch } from '../../dataservices/models'
import { AddEditComponent } from './AddEdit/AddEdit.component'
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import autoTable from 'jspdf-autotable'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import 'jspdf-autotable'
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branches: Branch[] = null;
  barnch: Branch;
  basicModalCloseResult: any;
  displayedColumns: string[] = ['id','title', 'address','actions'];
  dataSource = new MatTableDataSource<Branch>(this.branches);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _branchService: branchService, private dialog: MatDialog) { 
    this.dataSource.data=[];
  }

  ngOnInit(): void {
    this.getBranches();
  }



  getBranches() {
    this._branchService.get().subscribe(
      data => {
        
        if(data.length > 0)
          this.branches = data;
      },
      error => {
        console.log(error)
      }
    )

  }
  openAddModal() {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data: {
        isEdit: false,
        description: 'Add Branches',
        buttonText: {
          cancel: 'cancel',
          ok: 'Add'

        },
      },
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.getBranches();
          this.showAlert("Data Added", "success");
        }
      },
    );
  }

  openEditModal(id) {
    this._branchService.getbyId(id).subscribe(data => {
      this.barnch = data;
      const dialogRef = this.dialog.open(AddEditComponent, {
        data: {
          isEdit: true,
          description: 'Edit Branches',
          branch: this.barnch,
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
            this.getBranches();
            this.showAlert("Data Updated", "success");
          }
        },


      );
    })


  }

  deleteBranch(id) {
    this._branchService.delete(id).subscribe(
      data => {
        this.getBranches();
      }
    );

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

  downloadAsPDF(): void {

    this.displayedColumns.splice(this.displayedColumns.length - 1, 1);
    setTimeout(() => {
      const doc = new jsPDF()
      doc.setFontSize(5);
      autoTable(doc, {
        html: '#htmlData',
      })
      doc.save('Branch.pdf')
      this.displayedColumns.push("actions")
    }, 2000);

  }


}
