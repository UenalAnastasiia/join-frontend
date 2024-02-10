import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): Observable<boolean> {
        const firebaseConfig = {
            projectId: 'joina-b265d',
            appId: '1:303399824166:web:60dbbb7470f2f977bcefe7',
            storageBucket: 'joina-b265d.appspot.com',
            apiKey: 'AIzaSyAbni6sGv0WkqVqQEhGO1YzJPjJasV5xE0',
            authDomain: 'joina-b265d.firebaseapp.com',
            messagingSenderId: '303399824166',
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        return new Observable<boolean>((observer) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    observer.next(true);
                } else {
                    this.router.navigate(['/login']);
                    observer.next(false);
                }
                observer.complete();
            });
        });
    }

}