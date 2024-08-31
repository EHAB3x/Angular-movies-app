import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title : string = 'All'
}
