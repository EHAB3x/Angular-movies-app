import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { GenericHttpService } from '../../services/generic-http.service';
import { HttpClientModule } from '@angular/common/http';
import { Endpoints } from '../../endpoints/Endpoints';
import { MovieCardConfig } from '../../interfaces/ui-config/movie-card-config.interface';
import { TrendData, TrendsResult } from '../../interfaces/models/trends.interface';
import { SegmentedControlConfig } from '../../interfaces/ui-config/segmented-control-config.interface';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  providers:[GenericHttpService],
  imports: [InputComponent, MovieCardComponent,SegmentedControlComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  title : string = 'All';
  movieCards : MovieCardConfig[]=[];
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
  constructor(
    private genericHttpService: GenericHttpService,
    private router : Router
  ){

  }
  ngOnInit(): void {
    this.genericHttpService.httpGet(Endpoints.TRENDS)
    .subscribe({
      next : (res : TrendData)=>{
        console.log(res.results);
        this.movieCards = res.results.map((item : TrendsResult)=>{
          return {
            img : Endpoints.IMAGE_BASE + `/w500/${item.backdrop_path}`,
            movieName : item.original_title,
            rate : item.vote_average,
            onClick : ()=>{
              console.log("Click : ", item);
              if (item.first_air_date) {
                this.router.navigateByUrl(`tvshows/${item.id}`)
              }else{
                this.router.navigateByUrl(`movie/${item.id}`)
              }
            }
          } as MovieCardConfig;
        }).filter((item) => item.movieName)
      },
      error: (error : any)=>{
        console.error(error);

      }
    })
  }
}
