import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminGuard } from './services/guards/admin.guard';

// pages
import { UikitComponent } from './pages/utilities/uikit/uikit.component';
import { CoursesNewComponent } from './admin/courses/courses-new/courses-new.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminHomeComponent,
        //canActivate: [AdminGuard],
        children: [
            {
                path: 'cursos',
                component: AdminHomeComponent
            },
            {
                path: 'cursos/novo',
                component: CoursesNewComponent
            },
        ]
    },
    {
        path: 'uikit',
        component: UikitComponent,
        //canActivate: [AdminGuard],
    }
];
