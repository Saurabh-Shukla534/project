import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    _url = ' http://localhost:3000/register';
    constructor(private _http: HttpClient) { }

    public register(userData: any) {
        return this._http.post<any>(this._url, userData)
    }

    public studentDetails() {
        return this._http.get(this._url)
    }

    public deleteRecords(student: any) {
        return this._http.delete(this._url + "/" + student.id);
    }

    public updateRecords(id: number,student: any) {
        return this._http.put(this._url + `/${id}`, student);
    }
}