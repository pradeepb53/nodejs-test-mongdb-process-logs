import {Component} from '@angular/core';

import {Hero} from '../../shared/hero';

@Component({
    moduleId: module.id,
    selector: 'hero',
    templateUrl: 'hero.component.html'
})

export class HeroComponent {
  private myHero: string = "I am no Hero!";

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { 
      return JSON.stringify(this.model);
     }
}