import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { IRegister } from "src/register";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    _url = ' http://localhost:3000/register';
    constructor(private _http: HttpClient) { }

    public register(userData: any) {
        return this._http.post<any>(this._url, userData)
    }

    studentDetails() {
        return this._http.get(this._url)
    }

    deleteRecords(student: any) {
        return this._http.delete(this._url + "/" + student.id);
    }
}