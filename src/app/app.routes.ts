import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminGuard } from './services/guards/admin.guard';

// pages
import { UikitComponent } from './pages/utilities/uikit/uikit.component';
import { UploadComponent } from './components/common/upload/upload.component';
import { CoursesNewComponent } from './admin/courses/courses-new/courses-new.component';
import {CoursesDashboardComponent} from './admin/courses/courses-dashboard/courses-dashboard.component'


export const routes: Routes = [
    {
        path: 'admin',
        component: AdminHomeComponent,
        //canActivate: [AdminGuard],
        children: [
            {
                path: 'cursos',
                component: CoursesDashboardComponent
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
    },
    {
        path:'upload',
        component: UploadComponent
    }
];
