import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {


  activeLang = 'rus';

  ngOnInit(): void {
    this.activeLang;
  }
}
