import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrackListComponent } from './track-list/track-list.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrackFormComponent } from './track-form/track-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent

    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'tracks',
        component: TrackListComponent
    },
    {
        path: 'keynote'
        component: KeynoteComponent
    },
    {
        path: 'tracks/:id/detail',
        component: TrackDetailComponent
    },
    {
        path: 'tracks/create',
        component: TrackFormComponent

    },
    {
        path: 'comments', 
        component: CommentListComponent
    },
    {
        path: 'comments/:id/detail',
        component: CommentDetailComponent
    },


        // El Enrutado del componente not found 404 siempre hay que dejarlo
        //  al final del código ya que el comodín '**' atrapa la ruta de arriba abajo

    {
        path: '**',
        component: NotFoundComponent
    }
];
