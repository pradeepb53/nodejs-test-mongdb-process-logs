import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { PaginationModule } from 'ng2-bootstrap/pagination';

//import { PaginationModule} from 'ng2-bootstrap';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LogComponent} from './components/logs/log.component';
import {HeroComponent} from './components/hero/hero.component';
//import {AutocompleteComponent} from './autocomplete.component';


@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [ AppComponent, LogComponent, HeroComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }