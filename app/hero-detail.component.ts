import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import Hero from './hero';
import HeroService from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})
export default class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;

  constructor (
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        console.log(params['id']);
        return this.heroService.getHero(+params['id']);
      })
      .subscribe((hero: Hero) => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}

