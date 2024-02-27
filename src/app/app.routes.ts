import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminGuard } from './services/guards/admin.guard';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminHomeComponent,
       //canActivate: [AdminGuard],
    }
];
