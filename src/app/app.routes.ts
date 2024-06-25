import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

// pages
import { UikitComponent } from './pages/utilities/uikit/uikit.component';
import { UploadComponent } from './components/common/upload/upload.component';
import { CoursesNewComponent } from './admin/courses/courses-new/courses-new.component';
import { CoursesDashboardComponent } from './admin/courses/courses-dashboard/courses-dashboard.component';
import { CalendarDashboardComponent } from './admin/calendar/calendar-dashboard/calendar-dashboard.component';
import { CalendarNewComponent } from './admin/calendar/calendar-new/calendar-new.component';
import { PeopleComponent } from './admin/config/people/people.component';
import { PeopleFormsComponent } from './admin/config/people/people-forms/people-forms.component';
import {ProfileComponent} from "./admin/config/people/profile/profile.component";

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminHomeComponent,
        //canActivate: [AdminGuard],
        children: [
            {
                path: 'cursos',
                component: CoursesDashboardComponent,
            },
            {
                path: 'cursos/novo',
                component: CoursesNewComponent,
            },
            {
                path: 'cursos/novo/:id',
                component: CoursesNewComponent,
            },
            {
                path: 'calendarios',
                component: CalendarDashboardComponent,
            },
            {
                path: 'calendarios/novo',
                component: CalendarNewComponent,
            },
            {
                path: 'configuracao',
                children: [
                    {
                        path: 'pessoas',
                        component: PeopleComponent,
                    },
                    {
                        path: 'pessoas/novo',
                        component: PeopleFormsComponent,
                    },
                    {
                        path: 'pessoas/perfil/:id',
                        component: ProfileComponent,
                    },
                ],
            },
        ],
    },
    {
        path: 'uikit',
        component: UikitComponent,
        //canActivate: [AdminGuard],
    },
    {
        path: 'upload',
        component: UploadComponent,
    },
];
