import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ApiService {
    private getMoviesUrl = '/v2/movie/in_theaters';

    constructor(private httpService: HttpService) {}

    /**
     * 获取电影列表
     * @param param
     * @returns {Promise<any>}
     */
    async getMovies(): Promise<any> {
        return await this.httpService.get(this.getMoviesUrl).toPromise();
    }
}
