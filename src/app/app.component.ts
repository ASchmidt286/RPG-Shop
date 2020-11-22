import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'superawesomeprogram';
  text:string = 'irgendnentext';
  summe;
  gegenstandsliste:string[] = [];
  newitem:string;
  searchItem:string;
  result:string;
  ngOnInit(): void {
    let nummer:number = 3;
    let zahl:number = 4;
    this.summe = this.title+zahl;
    if(localStorage.getItem("gegenstandsliste")!== null) {
      this.gegenstandsliste = JSON.parse(localStorage.getItem("gegenstandsliste"));
    }
  }
  additem(){
    this.gegenstandsliste.push(this.newitem.trim());
    this.newitem = "";
    this.persistList();
    }
  eingabeBestaetigen(event:KeyboardEvent){
    if(event.code==="Enter"||event.code==="NumpadEnter"){
      this.additem();
    }
  }
  lookForItem(){
          this.result=this.gegenstandsliste.find(item => item.toLowerCase()==this.searchItem.toLowerCase().trim());   
          if(this.result==undefined){
            this.result="Kein Eintrag gefunden!";
        }
        this.searchItem="";
  }
  sucheBestaetigen(event:KeyboardEvent){
    if(event.code==="Enter"||event.code==="NumpadEnter"){
      this.lookForItem();
    }
  }
  deleteItem(x:string){
    if(this.gegenstandsliste.find(item => item==x)!=undefined){
    let y:number = this.gegenstandsliste.indexOf(x);
    this.gegenstandsliste.splice(y,1);
    this.persistList();
    }
  }
  persistList(): void {
  localStorage.setItem("gegenstandsliste", JSON.stringify(this.gegenstandsliste));
  }
}
