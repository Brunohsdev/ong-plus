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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Breakpoint Observer
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'dashboard-ong',
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
    MatProgressSpinnerModule,
    Footer,

  ],
  templateUrl: './dashboard-ong.html',
  styleUrls: ['./dashboard-ong.css']
})
export class DashboardOng implements OnInit, OnDestroy {
  // Dados do usuário e organização
  email = 'admin@ong.org';

  currentUser: any = {
    name: 'Admin',
    email: 'admin@ong.org',
    role: 'Administrador'
  };

  currentOng: any = {
    name: 'Minha ONG',
    verified: true,
    mission: 'Transformando vidas desde 2010',
    monthlyGoal: 75,
    campaigns: 12,
    donations: 34250,
    volunteers: 48
  };

  // Estado do layout
  isHandset = false;
  sidenavOpened = true;
  sidenavMode: 'side' | 'over' = 'side';
  loading = false;

  // Navegação
  pageTitle = 'Painel da ONG';
  unreadNotifications = 3;

  // Atividades recentes
  recentActivities = [
    {
      user: 'Maria Silva',
      action: 'doou R$ 200 para Campanha A',
      time: '2 horas atrás',
      avatar: 'assets/images/user1.jpg'
    },
    {
      user: 'João Oliveira',
      action: 'se voluntariou para Evento B',
      time: 'Ontem, 15:30',
      avatar: 'assets/images/user2.jpg'
    },
    {
      entity: 'ONG',
      action: 'publicou nova campanha: Ajuda Animal',
      time: '5 de Out, 2023',
      initials: 'NG'
    }
  ];

  // Subscriptions
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.setupResponsiveLayout();
    this.setupRouterEvents();
    this.simulateDataLoading();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setupResponsiveLayout(): void {
    this.subscriptions.add(
      this.breakpointObserver.observe([
        Breakpoints.Handset,
        Breakpoints.TabletPortrait
      ]).subscribe(result => {
        this.isHandset = result.matches;
        this.sidenavMode = this.isHandset ? 'over' : 'side';
        this.sidenavOpened = !this.isHandset;
      })
    );
  }

  private setupRouterEvents(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updatePageTitle();
      })
    );
  }

  private updatePageTitle(): void {
    // Você pode implementar lógica mais sofisticada aqui baseada na rota
    const routeTitles: {[key: string]: string} = {
      '/campanhas': 'Campanhas',
      '/doacoes': 'Doações',
      '/configuracoes': 'Configurações'
    };

    this.pageTitle = routeTitles[this.router.url] || 'Painel da ONG';
  }

  private simulateDataLoading(): void {
    this.loading = true;
    // Simula carregamento de dados
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  markNotificationAsRead(): void {
    if (this.unreadNotifications > 0) {
      this.unreadNotifications--;
    }
  }

  logout(): void {
    // Simula logout
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/home']);
      this.loading = false;
    }, 800);
  }

  // Funções para dados de exemplo
  getDonationTrend(): {icon: string, value: string, positive: boolean} {
    return {
      icon: 'trending_up',
      value: '+22%',
      positive: true
    };
  }

  getVolunteerTrend(): {icon: string, value: string, positive: boolean} {
    return {
      icon: 'trending_down',
      value: '-3%',
      positive: false
    };
  }

  getCampaignTrend(): {icon: string, value: string, positive: boolean} {
    return {
      icon: 'trending_up',
      value: '+5%',
      positive: true
    };
  }
}
