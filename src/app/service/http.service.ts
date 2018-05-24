import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
    // 基本服务器地址
    serverUrl = '';

    constructor(private http: HttpClient) {

    }

    /**
     * @returns {string|any}
     */
    getServerUrl() {
        return this.serverUrl;
    }

    /**
     * 获取真实请求地址
     * @param url
     * @returns {string}
     */
    getRealUrl(url: string) {
        // 本身是绝对地址就不继续判定了
        if (url.indexOf('http') !== -1) {
            return url;
        } else {
            return this.getServerUrl() + url;
        }
    }

    /**
     * get请求
     * @param url
     * @param option
     * @returns {Observable<Response>}
     */
    get(url: string): Observable<any> {
        return this.http.get(this.getRealUrl(url));
    }

    /**
     * post请求
     * @param url
     * @param body
     * @param option
     * @returns {Observable<Response>}
     */
    post(url: string, body?: any): Observable<any> {
        let newBody = String(this.parseToURLSearchParams(body));
        newBody = (newBody.indexOf('+') === -1) ? newBody : newBody.replace(/\+/g, '%2B');
        return this.http.post(this.getRealUrl(url), newBody, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        });
    }

    /**
     * 把对象变成查询参数
     * @param data
     * @returns {URLSearchParams}
     */
    parseToURLSearchParams(data: Object): String {
        const searchParams = new URLSearchParams();

        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== '' && data[key] !== null) {
                searchParams.set(key, data[key]);
            }
        });
        return searchParams.toString();
    }
}
