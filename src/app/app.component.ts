import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'toller Text';
  items: string[] = [];
  newValue: string = '';
  searchValue: string = '';
  searchResult: string = '';

  ngOnInit(): void {
    if (localStorage.getItem("items") !== null) {
      this.items = JSON.parse(localStorage.getItem("items"));
    }
  }

  inputKeyPress(event: KeyboardEvent): void {
    if (event.code === "Enter" || event.code === 'NumpadEnter') {
      this.addValueToList();
    }
  }

  searchKeyPress(event: KeyboardEvent): void {
    if (event.code === "Enter" || event.code === 'NumpadEnter') {
      const itemIsInList = this.isItemInList(this.searchValue);
      if (itemIsInList){
        this.searchResult = this.searchValue;
      }
      else{
        this.searchResult = "Wert konnte nicht gefunden werden.";
      }
      this.searchValue = "";
    }
  }

  addValueToList(): void {
    if (this.newValue.trim().length > 0 && !this.isItemInList(this.newValue)){
      this.items.push(this.newValue);
      this.newValue = '';
      this.persistList();
    }
  }

  deleteValueFromList(id: number): void {
    this.items.splice(id, 1);
    this.persistList();
  }

  isItemInList(value: string): boolean {
    let isInList: boolean = false;
    this.items.forEach(item => {
      if (item.trim().toLowerCase() === value.trim().toLowerCase()) {
        isInList = true;
      }
    });
    return isInList;
  }

  persistList(): void {
    localStorage.setItem("items", JSON.stringify(this.items));
  }
}

class ShopItem {
  Name: string;
  Value: number;

}
