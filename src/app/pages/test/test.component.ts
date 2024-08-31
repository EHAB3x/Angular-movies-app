import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { SegmentedControlConfig } from '../../interfaces/ui-config/segmented-control-config.interface';
import { InputComponent } from '../../components/input/input.component';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MovieCardConfig } from '../../interfaces/ui-config/movie-card-config.interface';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    NavBarComponent,
    SegmentedControlComponent,
    InputComponent,
    MovieCardComponent
],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  segments: SegmentedControlConfig[] = [
    {
      name: 'All',
      active: true,
    },
    {
      name: 'Movies',
      active: false,
    },
    {
      name: 'TV Shows',
      active: false,
    },
  ];

  movieCards : MovieCardConfig[]= [
    {
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbIE5QELrPz4cZmn3AMDQ7aPyMP_Am3eCEEbYLCoXiOc-fdKDsQ6DMBb7PlsIxIdbRrieR1Z5F1JfJco8_-u8dKzX2aGTMQrQ-4_kX7o0qN5B2Eq3t27zwLqEqt7NAakGE24Wg/s1200/Ted+Lasso.jpeg',
      rate: 7.28,
      movieName: 'Ted Lasso'
    },
    {
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbIE5QELrPz4cZmn3AMDQ7aPyMP_Am3eCEEbYLCoXiOc-fdKDsQ6DMBb7PlsIxIdbRrieR1Z5F1JfJco8_-u8dKzX2aGTMQrQ-4_kX7o0qN5B2Eq3t27zwLqEqt7NAakGE24Wg/s1200/Ted+Lasso.jpeg',
      rate: 9.7,
      movieName: 'LOTR'
    },
    {
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbIE5QELrPz4cZmn3AMDQ7aPyMP_Am3eCEEbYLCoXiOc-fdKDsQ6DMBb7PlsIxIdbRrieR1Z5F1JfJco8_-u8dKzX2aGTMQrQ-4_kX7o0qN5B2Eq3t27zwLqEqt7NAakGE24Wg/s1200/Ted+Lasso.jpeg',
      rate: 8.30,
      movieName: 'The Hobbit'
    },
  ]
}
