import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { GenericHttpService } from '../../services/generic-http.service';
import { HttpClientModule } from '@angular/common/http';
import { Endpoints } from '../../endpoints/Endpoints';
import { MovieCardConfig } from '../../interfaces/ui-config/movie-card-config.interface';
import {
  TrendData,
  TrendsResult,
} from '../../interfaces/models/trends.interface';
import { SegmentedControlConfig } from '../../interfaces/ui-config/segmented-control-config.interface';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { Router } from '@angular/router';
import {
  MovieResult,
  MoviesData,
} from '../../interfaces/models/movies.interface';
import { TVData, TVResult } from '../../interfaces/models/tv.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [GenericHttpService],
  imports: [
    InputComponent,
    MovieCardComponent,
    SegmentedControlComponent,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = 'All';
  movieCards: MovieCardConfig[] = [];
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
      onClick: () => {
        this.title = 'TV Shows';
      },
    },
  ];
  constructor(
    private genericHttpService: GenericHttpService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.segments.map((item: SegmentedControlConfig) => {
      item.onClick = () => {
        this.title = item.name;
        if (item.name.toLocaleLowerCase().includes('movie')) {
          this.getMovies();
        } else if (item.name.toLocaleLowerCase().includes('tv shows')) {
          this.getTVShows();
        } else {
          this.getAllTrending();
        }
      };
    });
    this.getAllTrending();
  }

  getAllTrending() {
    this.genericHttpService.httpGet(Endpoints.TRENDS).subscribe({
      next: (res: TrendData) => {
        this.movieCards = res.results
          .map((item: TrendsResult) => {
            return {
              img: Endpoints.IMAGE_BASE + `/w500/${item.backdrop_path}`,
              movieName: item.original_title || item.original_name,
              rate: item.vote_average,
              onClick: () => {
                if (item.first_air_date) {
                  this.router.navigate(['tvshows', item.id], { queryParams: { type: 'tvshows' } });
                } else {
                  this.router.navigate(['movie', item.id], { queryParams: { type: 'movie' } });
                }
              },
            } as MovieCardConfig;
          })
          .filter((item) => item.movieName);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getTVShows() {
    this.genericHttpService.httpGet(Endpoints.TV_SHOWS).subscribe({
      next: (res: TVData) => {
        this.movieCards = res.results
          .map((item: TVResult) => {
            return {
              img: Endpoints.IMAGE_BASE + `/w500/${item.backdrop_path}`,
              movieName: item.original_name,
              rate: item.vote_average,
              onClick: () => {
                this.router.navigate(['tvshows', item.id], { queryParams: { type: 'tvshows' } });
              },
            } as MovieCardConfig;
          })
          .filter((item) => item.movieName);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getMovies() {
    this.genericHttpService.httpGet(Endpoints.MOVIES).subscribe({
      next: (res: MoviesData) => {
        this.movieCards = res.results
          .map((item: MovieResult) => {
            return {
              img: Endpoints.IMAGE_BASE + `/w500/${item.backdrop_path}`,
              movieName: item.original_title,
              rate: item.vote_average,
              onClick: () => {
                this.router.navigate(['movie', item.id], { queryParams: { type: 'movie' } });
              },
            } as MovieCardConfig;
          })
          .filter((item) => item.movieName);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
