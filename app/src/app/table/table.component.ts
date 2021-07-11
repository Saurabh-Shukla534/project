import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IRegister } from 'src/register';
import { RegistrationService } from '../shared/registration.service';
import { MatTableDataSource} from '@angular/material/table'
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  title : string = "Student Records";
  selectedrow: any;
  records!: IRegister[]
  displayedColumns: string[] = ['id','name','email','mobileNumber','dob','state','city','pinCode','actions']
  dataSource = new MatTableDataSource<IRegister>(this.records);
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reg: RegistrationService) { }

  ngOnInit(): void {
    this.getAlldata();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public getAlldata() {
    let res = this.reg.studentDetails();
    res.subscribe(result => this.dataSource.data = result as IRegister[])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  highlight(row: any,evt: any) :void{
    console.log(row,evt);
    this.selectedrow = row;
  }  

  removeData(student: IRegister[]) {
    this.reg.deleteRecords(student).subscribe( x => this.getAlldata());
  }

}
