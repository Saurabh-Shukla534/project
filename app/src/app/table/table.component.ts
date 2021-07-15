import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IRegister } from 'src/register';
import { RegistrationService } from '../shared/registration.service';
import { MatTableDataSource} from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormsComponent } from '../forms/forms.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  title : string = "Student Records";
  selectedRow?: IRegister;
  public Row: IRegister = {
    id: 0, name: '', email: '', mobileNumber: 10, dob: '', state: '', city: '', pinCode: 6
  }
  records!: IRegister[];
  displayedColumns: string[] = ['id','name','email','mobileNumber','dob','state','city','pinCode','actions']
  dataSource = new MatTableDataSource<IRegister>(this.records);
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reg: RegistrationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAlldata();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAlldata() {
    let res = this.reg.studentDetails();
    res.subscribe(result => this.dataSource.data = result as IRegister[])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(row?: any) {
    const dialogRef = this.dialog.open(FormsComponent, {
      width:'1000px',
      data: row ? row : {}
    });
    
    dialogRef.afterClosed().subscribe( val => {
      row = val;
      
      if(row && row.id) {
        this.reg.updateRecords(row.id, row).subscribe( result1 => this.getAlldata());
        this.selectedRow = this.Row;
      }

      else if (row) {
        this.reg.register(val).subscribe( result1 => this.getAlldata());
      }

      else {
        row = this.Row;
      }
    })
  }

  removeData(student: any) {
    this.reg.deleteRecords(student).subscribe( x => this.getAlldata());
  }

  updateData(element: any) {    
    this.openDialog(element);
  }

}