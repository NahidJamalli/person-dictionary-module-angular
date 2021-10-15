import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { PersonListComponent } from './pages/person-list/person-list.component';

const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'people/:id', component: PersonDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
