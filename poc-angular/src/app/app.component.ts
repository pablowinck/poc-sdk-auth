import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { init } from 'poc-sdk-auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'poc-angular';

  ngOnInit(): void {
    const sdk = init({
      environment: 'DEV',
      clientToken: 'token',
      themeConfig: {
        theme: 'light',
        assets: {
          logo: 'https://v17.angular.io/assets/images/logos/angular/logo-nav@2x.png',
        },
      },
    });

    const component = sdk.renderAutenticacao();
    component.on('erro', () => {
      console.log('Erro ao logar');
    });
  }
}
