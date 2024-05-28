import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model : ElementRef | undefined;
  studentObj : Student = new Student();

  studentList : Student[] =[];
ngOnInit(): void {
  const localData = localStorage.getItem("angularCRUD");
  if(localData != null){
    this.studentList =JSON.parse(localData);
  }
}

  openModel(){
    
    const model = document.getElementById("myModal");
    if(model !=null){
      model.style.display ="block"
    }
  }
  CloseModel(){
    this.studentObj = new Student();
    const model = document.getElementById("myModal");
    if(this.model !=null){
      this.model.nativeElement.style.display ="none"
    }
  }
  onDelete(item :Student){
    const isLocalPresent = localStorage.getItem("angularCRUD");
    if(isLocalPresent!= null){
      const oldArray = JSON.parse(isLocalPresent);
      oldArray.pop(item);
      localStorage.setItem("angularCRUD",JSON.stringify(oldArray));

    }
    this.ngOnInit();

  }
  onEdit(item :Student){
    this.studentObj = item;
    this.openModel();
  }
  SaveStudent(){
    const isLocalPresent = localStorage.getItem("angularCRUD");
    if(isLocalPresent != null){
      const oldArray = JSON.parse(isLocalPresent);
      if(this.studentObj.id!=0){
        const objectToUpdate = this.studentList.find(x=>x.id == this.studentObj.id)
        if(objectToUpdate!= undefined){
          oldArray.pop(objectToUpdate);
          oldArray.push(this.studentObj)
          this.studentList = oldArray;
          localStorage.setItem("angularCRUD",JSON.stringify(oldArray));
        }
        
      }else{

      this.studentObj.id=oldArray.length +1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem("angularCRUD",JSON.stringify(oldArray));
      // const localStorageItems = localStorage.getItem("angularCRUD")
    }
  }
    else{
    const newArray =[];
    this.studentObj.id=1;
    newArray.push(this.studentObj);
    localStorage.setItem("angularCRUD",JSON.stringify(newArray));
    this.studentList =newArray;
    }
    this.CloseModel();
    const model = document.getElementById("myModal");
    if(this.model !=null){
      this.model.nativeElement.style.display ="none"
    }
  }
}
  export class Student{
    id :number;
    name:string;
    mobileNumber:string;
    email:string;
    state:string;
    city:string;
    pincode:string;
    address:string;
    constructor(){
      this.id=0;
      this.name="";
      this.email="";
      this.mobileNumber="";
      this.state="";
      this.city="";      
      this.pincode="";
      this.address="";

    }
  }
