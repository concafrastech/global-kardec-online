import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminGuard } from './services/guards/admin.guard';

// pages
import { UikitComponent } from './pages/utilities/uikit/uikit.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminHomeComponent,
        //canActivate: [AdminGuard],
        children: [
            {
                path: 'coursos',
                component: AdminHomeComponent
            },
            {
                path: 'cursos/novo',
                component: AdminHomeComponent
            },
        ]
    },
    {
        path: 'uikit',
        component: UikitComponent,
        //canActivate: [AdminGuard],
    }
];
