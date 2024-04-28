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
import { KeynoteListComponent } from './keynote-list/keynote-list.component';
import { KeynoteDetailComponent } from './keynote-detail/keynote-detail.component';
import { KeynoteFormComponent } from './keynote-form/keynote-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketOrderBuyListComponent } from './ticket-order-buy-list/ticket-order-buy-list.component';
import { TicketOrderBuyDetailComponent } from './ticket-order-buy-detail/ticket-order-buy-detail.component';
import { TicketOrderBuyFormComponent } from './ticket-order-buy-form/ticket-order-buy-form.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { userRoleGuard } from './authentication/user-role.guard';
import { AccountFormComponent } from './account-form/account-form.component';
import { AvatarFormComponent } from './avatar-form/avatar-form.component';
import { userLoggedInGuard } from './authentication/user-logged-in.guard';

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
    // Listado de keynotes accesible para todo el mundo
    {
        path: 'keynotes',
        component: KeynoteListComponent
    },
    {
        path: 'keynotes/:id/detail',
        component: KeynoteDetailComponent
    },
    // Creación y actualización de keynotes accesible solo para usuarios con rol ADMIN
    {
        path: 'keynotes/create',
        component: KeynoteFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'keynotes/:id/update',
        component: KeynoteFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'tickets',
        component: TicketListComponent
    },
    {
        path: 'tickets/:id/detail',
        component: TicketDetailComponent
    },
    {
        path: 'tickets/create',
        component: TicketFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'tickets/:id/update',
        component: TicketFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'ticketOrderBuys',
        component: TicketOrderBuyListComponent
    },
    {
        path: 'ticketOrderBuys/:id/detail',
        component: TicketOrderBuyDetailComponent
    },
    {
        path: 'ticketOrderBuys/create',
        component: TicketOrderBuyFormComponent
    },
    {
        path: 'ticketOrderBuys/:id/update',
        component: TicketOrderBuyFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'tickets/2/buy',
        component: TicketOrderBuyFormComponent
    },
    {
        path: 'tracks',
        component: TrackListComponent
    },
    {
        path: 'tracks/:id/detail',
        component: TrackDetailComponent,
        canActivate: [userLoggedInGuard]
    },
    {
        path: 'tracks/create',
        component: TrackFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'tracks/:id/update',
        component: TrackFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'comments',
        component: CommentListComponent
    },
    {
        path: 'comments/:id/detail',
        component: CommentDetailComponent
    },
    {
        path: 'comments/create',
        component: CommentFormComponent,
        canActivate: [userLoggedInGuard]
    },
    {
        path: 'comments/:id/update',
        component: CommentFormComponent,
        canActivate: [userLoggedInGuard]
    },
    {
        path: 'users',
        component: UserListComponent
    },
    {
        path: 'users/:id/detail',
        component: UserDetailComponent
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'users/:id/update',
        component: UserFormComponent,
        canActivate: [userLoggedInGuard]
    },
    {
        path: 'rooms',
        component: RoomListComponent
    },
    {
        path: 'rooms/:id/detail',
        component: RoomDetailComponent
    },
    {
        path: 'rooms/create',
        component: RoomFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'about',
        component: AboutUsComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'rooms/:id/update',
        component: RoomFormComponent,
        canActivate: [userRoleGuard]
    },
    {
        path: 'users/account',
        component: AccountFormComponent
    },
    {
        path: 'users/account/avatar',
        component: AvatarFormComponent
    },
        // El Enrutado del componente not found 404 siempre hay que dejarlo
        //  al final del código ya que el comodín '**' atrapa la ruta de arriba abajo
    {
        path: '**',
        component: NotFoundComponent
    }
];
