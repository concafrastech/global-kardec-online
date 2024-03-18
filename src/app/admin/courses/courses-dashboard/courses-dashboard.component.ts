import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { dataTempModel } from '../../../models/courses'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-courses-dashboard',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    CommonModule
  ],
  templateUrl: './courses-dashboard.component.html',
  styleUrl: './courses-dashboard.component.less'
})
export class CoursesDashboardComponent implements OnInit {

  cols!: dataTempModel[];
  coursesList: dataTempModel[] = [
    {
      nome_do_curso: "NBDE",
      idioma: "Português",
      instituto: "Ciclo Introdutório"
    },
    {
      nome_do_curso: "Nosso Lar",
      idioma: "Português",
      instituto: "Ciclo Introdutório"
    },
    {
      nome_do_curso: "Passe",
      idioma: "Português",
      instituto: "Ciclo Introdutório"
    },
    {
      nome_do_curso: "Corrente Magnética",
      idioma: "Português",
      instituto: "Ciclo Introdutório"
    },
    {
      nome_do_curso: "Vibração",
      idioma: "Português",
      instituto: "Ciclo Introdutório"
    }
  ]

  ngOnInit() {

  }

}
