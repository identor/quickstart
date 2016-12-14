import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import HeroService from './hero.service';
import Hero from './hero';

@Component({
  moduleId: module.id,
  selector: 'heroes',
  providers: [HeroService],
  templateUrl: 'heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]
})
export default class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/heroes', this.selectedHero.id]);
  }
}
