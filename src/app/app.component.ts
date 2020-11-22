import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'toller Text';
  items: ShopItem[] = [];
  newValue: string = '';
  searchValue: string = '';
  searchResult: string = '';
  foo: ShopItem;

  ngOnInit(): void {
    if (localStorage.getItem("items") !== null) {
      this.items = JSON.parse(localStorage.getItem("items"));

    }
    this.foo = new ShopItem();
    this.foo.Name = "Axt";
    this.foo.Price = 5;
    this.foo.addDescription("bsdjksdfjk");
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

  private persistList(): void {
    localStorage.setItem("items", JSON.stringify(this.items));
  }
}

class ShopItem {
  Name: string;
  Price: number;
  private Description: string;

  addDescription(bla: string): void {
    this.Description = bla;
  }
   // add(amount: number): void {
  //   this.Price += amount;
  // }

  // remove(amount: number): void {
  //   this.Price -= amount;
  //   if (this.Price < 0){
  //     this.Price = 0;
  //   }
  // }
}

class ShopInventory {
  Items: ShopItem[];
}

class Warenkorb {
  Items: ShopItem[];

  add(item: ShopItem): void{
    this.Items.push(item);
  }
}
