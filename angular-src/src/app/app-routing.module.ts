import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataloggingComponent } from './components/datalogging/datalogging.component';
import { BenchmarkComponent } from './components/benchmark/benchmark.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChartComponent } from './components/chart/chart.component';
import { AuthGuard } from "./guards/auth.guard.service";


const routes: Routes = [
    {path: "", component: WelcomeComponent },
    {path: "welcome", component: WelcomeComponent },
    {path: "dashboard", component: DashboardComponent, canActivate:[AuthGuard]},
    {path: "datalogging", component: DataloggingComponent, canActivate:[AuthGuard]},
    {path: "benchmark", component: BenchmarkComponent, canActivate:[AuthGuard]},
    {path: "register", component: RegisterComponent },
    {path: "profile", component: ProfileComponent, canActivate:[AuthGuard]},
    {path: "login", component: LoginComponent },
    {path: "chart", component: ChartComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}
export const routingComponents = [NavbarComponent,
    DashboardComponent,
    RegisterComponent,
    DataloggingComponent,
    BenchmarkComponent,
    ChartComponent,
    WelcomeComponent,
    ProfileComponent,
    WelcomeComponent,
    LoginComponent ]
