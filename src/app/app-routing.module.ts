import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
  { path: "", redirectTo: "session-email", pathMatch: "full" },
  {
    path: "login/:data",
    loadChildren: () => import("./features/auth/login/login.module").then(m => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "app",
    loadChildren: () => import("./features/layout/tabs/tabs.module").then(m => m.TabsPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "session-email",
    loadChildren: () => import("./features/auth/session-email/session-email.module").then(m => m.SessionEmailPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "register",
    loadChildren: () => import("./features/auth/register/register.module").then(m => m.RegisterPageModule),
  },
  {
    path: "recovery-password/:data",
    loadChildren: () => import("./features/auth/recovery-password/recovery-password.module").then(m => m.RecoveryPasswordPageModule),
  },
  {
    path: "password-send/:data",
    loadChildren: () => import("./features/auth/password-send/password-send.module").then(m => m.PasswordSendPageModule),
  },
  {
    path: "home-tab",
    loadChildren: () => import("./features/home-tab/home-tab.module").then(m => m.HomeTabPageModule),
    canActivate: [LoginGuard],
  },
  // {
  //   path: "search-tab",
  //   loadChildren: () => import("./features/search-tab/search-tab.module").then(m => m.SearchTabPageModule),
  //   canActivate: [LoginGuard],
  // },
  {
    path: "shop-tab",
    loadChildren: () => import("./features/shop-tab/shop-tab.module").then(m => m.ShopTabPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "profile-tab",
    loadChildren: () => import("./features/profile-tab/profile-tab.module").then(m => m.ProfileTabPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "promotion-tab",
    loadChildren: () => import("./features/promotion-tab/promotion-tab.module").then(m => m.PromotionTabPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: "event-detail/:data",
    loadChildren: () => import("./features/home-tab/event/event-detail/event-detail.module").then(m => m.EventDetailPageModule),
  },
  {
    path: "course-detail/:data",
    loadChildren: () => import("./features/home-tab/course/course-detail/course-detail.module").then(m => m.CourseDetailPageModule),
  },
  {
    path: "course-classroom/:data",
    loadChildren: () => import("./features/home-tab/course/course-classroom/course-classroom.module").then(m => m.CourseClassroomPageModule)
  },
  {
    path: "campaign-detail/:data",
    loadChildren: () => import("./features/home-tab/campaign/campaign-detail/campaign-detail.module").then(m => m.CampaignDetailPageModule),
  },
  {
    path: "meeting-detail/:data",
    loadChildren: () => import("./features/home-tab/meeting/meeting-detail/meeting-detail.module").then(m => m.MeetingDetailPageModule),
  },
  {
    path: "meeting-list/:data",
    loadChildren: () => import("./features/home-tab/meeting/meeting-list/meeting-list.module").then(m => m.MeetingListPageModule),
  },
  {
    path: "event-classroom/:data",
    loadChildren: () => import("./features/home-tab/event/event-classroom/event-classroom.module").then(m => m.EventClassroomPageModule)
  },
  {
    path: 'complete-advanced-course',
    loadChildren: () => import('./shared/complete-advanced-course/complete-advanced-course.module').then(m => m.CompleteAdvancedCoursePageModule)
  },
  {
    path: 'complete-event-vivo',
    loadChildren: () => import('./shared/complete-event-vivo/complete-event-vivo.module').then(m => m.CompleteEventVivoPageModule)
  },
  {
    path: 'complete-event-face-to-face',
    loadChildren: () => import('./shared/complete-event-face-to-face/complete-event-face-to-face.module').then(m => m.CompleteEventFaceToFacePageModule)
  },
  {
    path: 'complete-digital-product',
    loadChildren: () => import('./shared/complete-digital-product/complete-digital-product.module').then(m => m.CompleteDigitalProductPageModule)
  },
  {
    path: 'complete-project',
    loadChildren: () => import('./shared/complete-project/complete-project.module').then(m => m.CompleteProjectPageModule)
  },
  {
    path: 'complete-partner',
    loadChildren: () => import('./shared/complete-partner/complete-partner.module').then(m => m.CompletePartnerPageModule)
  },
  {
    path: 'complete-mentoring',
    loadChildren: () => import('./shared/complete-mentoring/complete-mentoring.module').then(m => m.CompleteMentoringPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
