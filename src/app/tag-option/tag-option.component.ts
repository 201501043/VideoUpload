import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Observer, debounce, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-tag-option',
  templateUrl: './tag-option.component.html',
  styleUrl: './tag-option.component.scss'
})
export class TagOptionComponent implements OnInit{

  @Input() tagFormControl!: FormControl;
  @Input() tagTemp!: FormControl;

  list!:string[];
  searchResults!: string[];
  selectedTag:string[] = [];
  isValueEntered: boolean = false;
  valueSelected: string = '';

  ngOnInit(){
    this.list = [
      "#vlog",
      "#tutorial",
      "#howto",
      "#travel",
      "#music",
      "#comedy",
      "#review",
      "#gaming",
      "#fitness",
      "#cooking",
      "#beauty",
      "#fashion",
      "#technology",
      "#education",
      "#diy",
      "#entertainment",
      "#news",
      "#sports",
      "#food",
      "#health",
      "#funny",
      "#motivation",
      "#inspiration",
      "#art",
      "#photography",
      "#business",
      "#money",
      "#documentary",
      "#science",
      "#cars",
      "#animals",
      "#nature",
      "#adventure",
      "#lifehacks",
      "#workout",
      "#dance",
      "#travelvlog",
      "#guitar",
      "#skincare",
      "#makeup",
      "#style",
      "#videogames",
      "#programming",
      "#yoga",
      "#motovlog",
      "#fishing",
      "#gardening",
      "#pets",
      "#family",
      "#techreview"
    ];
    this.tagTemp.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term:any) => term.toLowerCase())
    ).subscribe(
      (res) => {
        this.search(res)
        this.tagFormControl.setValue(this.searchResults.toString())
        this.tagFormControl.updateValueAndValidity();
      }
    )
  }

  search(term: string):any {
    if (!term.trim()) {
      this.searchResults = [term]
      return
    }
    this.searchResults = this.list.filter(item =>
      item.toLowerCase().includes(term)
    );
    if(this.searchResults.indexOf(term) === -1 && this.searchResults.length === 0) {
      this.searchResults.push(term)
    }
    this.valueSelected = term
  }

  onTagSelect(tag: string){
    if(this.selectedTag.length == 6){
      alert("only six can be selected")
      return
    }
    console.log("working")
    this.valueSelected = tag;
  }

  onTagConfirm(){
    if(this.valueSelected.length == 0){
      return
    }
    this.selectedTag.push(this.valueSelected)
    this.valueSelected = ""
    this.isValueEntered = false
    console.log(this.selectedTag)
  }
}
