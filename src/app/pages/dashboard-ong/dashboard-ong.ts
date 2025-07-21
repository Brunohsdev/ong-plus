import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

// Breakpoint Observer
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Footer } from "../../components/footer/footer";
import { Header } from '../../components/header/header';

// Services
// import { AuthService } from '@app/core/services/auth.service';
// import { OngService } from '@app/core/services/ong.service';
// import { NotificationService } from '@app/core/services/notification.service';

// Components
// import { QuickActionDialogComponent } from './components/quick-action-dialog/quick-action-dialog.component';

// Pipes
// import { TimeAgoPipe } from '@app/shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // Angular Material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCardModule,
    Footer
],
  templateUrl: './dashboard-ong.html',
  styleUrls: ['./dashboard-ong.css']
})
export class DashboardOng{


// export class AdminLayoutComponent implements OnInit, OnDestroy {
//   // Dados do usuário e organização
//   currentUser: any;
//   currentOng: any;

  // Estado do layout
  isHandset = false;
  sidenavOpened = true;
  sidenavMode: 'side' | 'over' = 'side';

//   // Navegação
//   pageTitle = 'Dashboard';
//   menuItems = [
//     { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard', exact: true },
//     { icon: 'campaign', label: 'Campanhas', route: '/admin/campaigns' },
//     { icon: 'volunteer_activism', label: 'Doações', route: '/admin/donations' },
//     { icon: 'groups', label: 'Voluntários', route: '/admin/volunteers' },
//     { icon: 'star_rate', label: 'Avaliações', route: '/admin/reviews' },
//     { icon: 'verified', label: 'Selos', route: '/admin/badges' },
//     { icon: 'notifications', label: 'Notificações', route: '/admin/notifications' },
//     { icon: 'settings', label: 'Configurações', route: '/admin/settings' }
//   ];

//   // Notificações
//   notifications: Notification[] = [];
//   unreadCount = 0;

//   // Subscriptions
//   private subscriptions = new Subscription();

  constructor(
//     // private authService: AuthService,
//     // private ongService: OngService,
//     // private notificationService: NotificationService,
    private router: Router,
//     private breakpointObserver: BreakpointObserver,
//     private dialog: MatDialog
  ) {}

//   ngOnInit(): void {
//     this.setupResponsiveLayout();
//     this.loadUserData();
//     this.loadOngData();
//     this.loadNotifications();
//     this.setupRouterEvents();
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.unsubscribe();
//   }

//   private setupResponsiveLayout(): void {
//     this.subscriptions.add(
//       this.breakpointObserver.observe([
//         Breakpoints.Handset,
//         Breakpoints.TabletPortrait
//       ]).subscribe(result => {
//         this.isHandset = result.matches;
//         this.sidenavMode = this.isHandset ? 'over' : 'side';
//         this.sidenavOpened = !this.isHandset;
//       })
//     );
//   }

//   private loadUserData(): void {
//     this.subscriptions.add(
//       this.authService.currentUser.subscribe(user => {
//         this.currentUser = user;
//       })
//     );
//   }

//   private loadOngData(): void {
//     if (this.authService.getUserType() === 'ong') {
//       this.subscriptions.add(
//         this.ongService.getCurrentOng().subscribe(ong => {
//           this.currentOng = ong;
//         })
//       );
//     }
//   }

//   private loadNotifications(): void {
//     this.subscriptions.add(
//       this.notificationService.getNotifications().subscribe({
//         next: (notifications) => {
//           this.notifications = notifications;
//           this.unreadCount = notifications.filter(n => !n.read).length;
//         },
//         error: (err) => console.error('Failed to load notifications', err)
//       })
//     );
//   }

//   private setupRouterEvents(): void {
//     this.subscriptions.add(
//       this.router.events.pipe(
//         filter(event => event instanceof NavigationEnd)
//       ).subscribe(() => {
//         this.updatePageTitle();
//       })
//     );
//   }

//   private updatePageTitle(): void {
//     const activeItem = this.menuItems.find(item =>
//       this.router.isActive(item.route, item.exact || false)
//     );
//     this.pageTitle = activeItem?.label || 'Dashboard';
//   }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

//   markAsRead(notification: Notification): void {
//     if (!notification.read) {
//       this.subscriptions.add(
//         this.notificationService.markAsRead(notification._id).subscribe({
//           next: () => {
//             notification.read = true;
//             this.unreadCount--;
//           },
//           error: (err) => console.error('Failed to mark notification as read', err)
//         })
//       );
//     }
//   }

//   openQuickActionDialog(): void {
//     const dialogRef = this.dialog.open(QuickActionDialogComponent, {
//       width: this.isHandset ? '90vw' : '600px',
//       maxWidth: '100vw',
//       panelClass: 'quick-action-dialog'
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         // Ação rápida selecionada
//         this.router.navigate([result.action]);
//       }
//     });
//   }

  logout(): void {

    this.router.navigate(['/login']);
  }
// }
}
