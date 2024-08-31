import { Component, input } from '@angular/core';
import { NavItemConfig } from '../../interfaces/ui-config/nav-item-config.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  navItems: NavItemConfig[] = [
    {
      name: 'Movie',
      path: 'movies',
      active: false,
    },
    {
      name:'TV Shows',
      path:'tvshows',
      active: false,
    },
    {
      name:'Suggest me',
      path:'suggests',
      icon: 'bi bi-arrow-right',
      active: false,
    },
  ];

  selectedItem(nav : NavItemConfig){
    this.navItems.map((item : NavItemConfig)=>{
      item.active = nav.name === item.name
    })
  }
}
