import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './gaurds/admin.guard';
import { UserGuard } from './gaurds/user.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AttemptsComponent } from './pages/admin/attempts/attempts.component';
import { AddCategoryComponent } from './pages/admin/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './pages/admin/category/update-category/update-category.component';
import { ViewCategoriesComponent } from './pages/admin/category/view-categories/view-categories.component';
import { DisplayActiveQuizzesComponent } from './pages/admin/display-active-quizzes/display-active-quizzes.component';
import { DisplayCategoriesComponent } from './pages/admin/display-categories/display-categories.component';
import { DisplayQuizzesComponent } from './pages/admin/display-quizzes/display-quizzes.component';
import { DisplayUsersComponent } from './pages/admin/display-users/display-users.component';
import { AddQuestionComponent } from './pages/admin/question/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/question/update-question/update-question.component';
import { ViewQuizQuestionsComponent } from './pages/admin/question/view-quiz-questions/view-quiz-questions.component';
import { AddQuizComponent } from './pages/admin/quiz/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/quiz/update-quiz/update-quiz.component';
import { ViewCategoryQuizComponent } from './pages/admin/quiz/view-category-quiz/view-category-quiz.component';
import { ViewQuizzesComponent } from './pages/admin/quiz/view-quizzes/view-quizzes.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { AllAttemptComponent } from './pages/user/all-attempt/all-attempt.component';
import { AttemptComponent } from './pages/user/attempt/attempt.component';
import { CategoryComponent } from './pages/user/category/category.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';

const routes: Routes = [
  // {
  //   path:'',
  //   component:HomeComponent,
  //   pathMatch:'full',
  // },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'update-profile/:username',
        component:UpdateProfileComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
      },
      {
        path:'add-category',
        component:AddCategoryComponent,
      },
      {
        path:'category/:cid',
        component:UpdateCategoryComponent,
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent,
      },
      {
        path:'add-quiz',
        component:AddQuizComponent,
      },
      {
        path:'quiz/:quizid',
        component:UpdateQuizComponent,
      },
      {
        path:'view-questions/:quizid/:quiztitle',
        component:ViewQuizQuestionsComponent,
      },
      {
        path:'add-question/:quizid/:quiztitle',
        component:AddQuestionComponent,
      },
      {
        path:'question/:quesid',
        component:UpdateQuestionComponent,
      },
      {
        path:'category/quiz/:cid',
        component:ViewCategoryQuizComponent,
      },
      {
        path:'users-list',
        component:DisplayUsersComponent,
      },
      {
        path:'categories-list',
        component:DisplayCategoriesComponent,
      },
      {
        path:'quizzes-list',
        component:DisplayQuizzesComponent,
      },
      {
        path:'active-quizzes-list',
        component:DisplayActiveQuizzesComponent,
      },
      {
        path:'attempts/:quizid',
        component:AttemptsComponent,
      },
    ],

  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[UserGuard],
    children:[
      {
        path:'',
        component:UserWelcomeComponent,
      },
      {
        path:'category',
        component:CategoryComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'update-profile/:username',
        component:UpdateProfileComponent,
      },
      {
        path:'quiz/:cid',
        component:LoadQuizComponent,
      },
      {
        path:'instructions/:quizid',
        component:InstructionsComponent,
      },
      {
        path:'instructions/:quizid',
        component:InstructionsComponent,
      },
      {
        path:'attempt/:quizid',
        component:AttemptComponent,
      },
      {
        path:'all-attempt',
        component:AllAttemptComponent,
      },
    ],
  },
  {
    path:'quiz/start/:quizid',
    component:QuizStartComponent,
    pathMatch:'full',
    canActivate:[UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
