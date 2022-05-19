import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';  
import {TextFieldModule} from '@angular/cdk/text-field'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import { AuthInterceptorProviders } from './services/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent as AdminSidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import {MatTableModule} from '@angular/material/table';
import { ViewCategoriesComponent } from './pages/admin/category/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/category/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/quiz/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/quiz/add-quiz/add-quiz.component'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSelectModule} from '@angular/material/select';
import { UpdateQuizComponent } from './pages/admin/quiz/update-quiz/update-quiz.component';
import { UpdateCategoryComponent } from './pages/admin/category/update-category/update-category.component';
import { ViewQuizQuestionsComponent } from './pages/admin/question/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/question/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/question/update-question/update-question.component'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SidebarComponent as UserSidebarComponent} from './pages/user/sidebar/sidebar.component';
import { CategoryComponent } from './pages/user/category/category.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { ViewCategoryQuizComponent } from './pages/admin/quiz/view-category-quiz/view-category-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { NgImageSliderModule } from 'ng-image-slider';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { DisplayUsersComponent } from './pages/admin/display-users/display-users.component';
import { DisplayCategoriesComponent } from './pages/admin/display-categories/display-categories.component';
import { DisplayQuizzesComponent } from './pages/admin/display-quizzes/display-quizzes.component';
import { DisplayActiveQuizzesComponent } from './pages/admin/display-active-quizzes/display-active-quizzes.component';
import { AttemptComponent } from './pages/user/attempt/attempt.component';
import { AllAttemptComponent } from './pages/user/all-attempt/all-attempt.component';
import { AttemptsComponent } from './pages/admin/attempts/attempts.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    AdminSidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    UpdateCategoryComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    UserSidebarComponent,
    CategoryComponent,
    UserWelcomeComponent,
    LoadQuizComponent,
    ViewCategoryQuizComponent,
    InstructionsComponent,
    QuizStartComponent,
    UpdateProfileComponent,
    DisplayUsersComponent,
    DisplayCategoriesComponent,
    DisplayQuizzesComponent,
    DisplayActiveQuizzesComponent,
    AttemptComponent,
    AllAttemptComponent,
    AttemptsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    TextFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    CKEditorModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    NgImageSliderModule,
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
