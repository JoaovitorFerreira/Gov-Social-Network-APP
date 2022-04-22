# PgeLinkedin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Script para inserção de novos procuradores

```typescript
import * as admin from 'firebase-admin';

interface Especialidades {
    direito_administrativo: boolean;
    direito_civil: boolean;
    direito_empresarial: boolean;
    propriedade_intelectual: boolean;
    direito_ambiental: boolean;
    direito_financeiro_tributário: boolean;
    direito_processual: boolean;
    direito_trabalho: boolean;
    direito_previdenciário: boolean;
    direito_constitucional: boolean;
    direito_econômico_concorrencial: boolean;
    direito_penal: boolean;
    filosofia_direito: boolean;
    outros?: {[key: string]: boolean};
}

interface Usuario {
    username: string;
    firstAccess: boolean;
    especialidades: Especialidades;
}

interface NovoUsuario extends Usuario {
    email: string;
}

const users: NovoUsuario[] = [
    {
        username: 'teste',
        email: 'teste@teste.com',
        firstAccess: true,
        especialidades: {
            direito_administrativo: false,
            direito_ambiental: false,
            direito_civil: false,
            direito_constitucional: false,
            direito_econômico_concorrencial: false,
            direito_empresarial: false,
            direito_financeiro_tributário: false,
            direito_penal: false,
            direito_previdenciário: false,
            direito_processual: false,
            direito_trabalho: false,
            filosofia_direito: false,
            propriedade_intelectual: false
        }
    }
];

admin.initializeApp({credential: admin.credential.cert(require('./pge-environment-credentials.json'))});

async function addUsers(users: NovoUsuario[]) {
    const promises: Promise<boolean>[] = [];
    for (const user of users) {
        promises.push(admin.auth().createUser({password: 'procurador-pge', email: user.email, displayName: user.username}).then(created => {
            if (!created || !created.uid) { return false; }
            console.log('usuário criado --> ', created.uid, user.email);
            const novoUser = {...user};
            delete novoUser.email;
            return admin.firestore().doc(`usuarios/${created.uid}`).create(user).then(() => true).catch((err) => {
                console.error('error creating doc --> ', created.uid, err);
                return false;
            });
        }).catch(error => {
            console.error('error generating new user ----> ', error);
            return false;
        }));
    }
    const complete = await Promise.all(promises);
    if (complete.every((promise) => promise)) {
        console.log('CONCLUIDO');
    } else {
        console.log('Algo deu errado...');
    }
}

addUsers(users);
```

