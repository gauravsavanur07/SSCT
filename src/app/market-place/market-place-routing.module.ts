import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as guards from './guards';
import { fr } from 'ethers/wordlists';


/*
- The multiple routes work like an ‘&&’ condition in javascript, i.e., angular won’t execute the later guards, if the first one fails.
- The prioritization works by giving the guard closest to the root of the application the highest priority.
As a result, if a child guard returns false but its parent hasn’t resolved yet,
it’ll wait until the parent resolves. If the parent guard check fails,
it’ll take priority over all the others.
*/

/*
The path-matching strategy, one of 'prefix' or 'full'. Default is 'prefix'.

*/

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
 

  {
    path: 'products',
    component: fromComponents.MarketPlaceHomeComponent,
    children: [
      {
        path: '',
        component: fromContainers.ViewProductCollectionComponent,
        canActivate: [guards.ProductsLoadedGuard],
        children: [
          {
            path: ':id',
            component: fromContainers.ViewPurchaseContractComponent,
          },
          {
            path: '',
            component: fromComponents.ProductDetailHomeComponent
          }, 
         
           
          

        ]

      },
      {
        path: 'make/new',
        component: fromContainers.NewPurchaseContractComponent,
        pathMatch: 'full',
      },
     

    ]
  }

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MarketPlaceRoutingModule { }
