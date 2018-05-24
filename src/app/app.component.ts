import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './service/api.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const MOVIES_KEY = makeStateKey('movies_list');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    movies = [];
    count = 0;

    constructor(private api: ApiService,
                private state: TransferState) {}

    ngOnInit() {
        this.movies = this.state.get(MOVIES_KEY, []);

        if (this.movies.length <= 0) {
            this.getMovies();
        }
    }

    ngOnDestroy() {
        if (typeof window === 'object') {
            this.state.set(MOVIES_KEY, null);
        }
    }

    getMovies() {
        this.api.getMovies().then(d => {
            if (d && d.subjects) {
                this.movies = d.subjects;
                this.state.set(MOVIES_KEY, this.movies);
            }
        });
    }

    addCount() {
        this.count ++;
    }
}
