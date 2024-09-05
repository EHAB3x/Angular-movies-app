import { Component, OnInit } from '@angular/core';
import { DetailBannerComponent } from "../../components/detail-banner/detail-banner.component";
import { ActivatedRoute } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';
import { HttpClientModule } from '@angular/common/http';
import { Endpoints } from '../../endpoints/Endpoints';
import { DetailBannerConfig } from '../../interfaces/ui-config/detail-banner-config.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [DetailBannerComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [GenericHttpService, HttpClientModule]
})
export class DetailsComponent implements OnInit {
  type: string | null = null;
  bannerConfig!: DetailBannerConfig;
  constructor(
    private activatedRoute : ActivatedRoute,
    private genericService : GenericHttpService
  ){

  }
  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');

    this.activatedRoute.paramMap.subscribe((paramMap: any) => {
      console.log(this.type);

      if (this.type == 'movie') {
        this.getMovieById(paramMap.params.series_id)
      } else if (this.type == 'tvshows')  {
        this.getTvShowById(paramMap.params.series_id)
      }
    })
  }

 getMovieById(id : string){
  this.genericService.httpGet(Endpoints.MOVIE_ID(id))
  .subscribe({
    next : (res : any) =>{
      console.log(res);
      this.bannerConfig = {
        img : Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
        pageName: 'Movies',
        path : 'movies',
        title: res.original_title
      }
    },
    error: (err : any) =>{
      console.error(err);

    }
  })
 }

 getTvShowById(id : string){
  this.genericService.httpGet(Endpoints.TV_SHOW_ID(id))
  .subscribe({
    next : (res : any) =>{
      console.log(res);
      this.bannerConfig = {
        img : Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
        pageName: 'TV Shows',
        path : 'tvshows',
        title: res.original_name
      }
    },
    error: (err : any) =>{
      console.error(err);

    }
  })
 }
}
