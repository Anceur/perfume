import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path : 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path : 'filter',
    loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./home/pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./home/pages/register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'mtpsoublie',
    loadChildren: () => import('./home/pages/mtpsoublie/mtpsoublie.module').then( m => m.MtpsoublieModule)
  },
    
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
