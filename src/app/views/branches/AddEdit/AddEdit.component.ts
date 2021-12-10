import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { branchService } from 'src/app/dataservices/branch.service';
import { Branch } from 'src/app/dataservices/models';

@Component({
  selector: 'app-edit',
  templateUrl: './AddEdit.component.html',
  styleUrls: ['./AddEdit.component.scss']
})


export class AddEditComponent {
  branch:Branch;
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  description = "Edit Branches";
  form: FormGroup;
  isEdit:boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddEditComponent>, private fb: FormBuilder,private _branchservice:branchService) {
    if (data) {
      this.branch = data.branch;
      this.isEdit = data.isEdit;
      this.description = data.description;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  
  ngOnInit(): void {
    if(this.isEdit){
      this.form = this.fb.group({
        id:this.branch.id,
        title: [this.branch.title, Validators.required],
        address: [this.branch.address, Validators.required],
      })
    }
    else{
      this.form = this.fb.group({
        title: ['', Validators.required],
        address: ['', Validators.required],
      })
    }
  }
  save() {
    if(this.isEdit){
      this._branchservice.update(this.form.value).subscribe(()=>{
        this.dialogRef.close(this.form.value);
      })
      
    }
    else{
      this._branchservice.Add(this.form.value).subscribe(() => {
        this.dialogRef.close(this.form.value);
      })
      
    }
    
    
  }

 
}
