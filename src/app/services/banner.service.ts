import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first, map } from "rxjs";

const BASE_URL = "http://127.0.0.1:1323";

@Injectable({
  providedIn: "root",
})
export class BannerService {
  constructor(private http: HttpClient) {}

  getAllBanner(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${BASE_URL}/property-promotion`);
  }

  getBanner(selectedId: number): any {
    return this.http.get<Array<any>>(
      `${BASE_URL}/property-promotion/${selectedId}`
    );
  }

  submitBanner(payload: any) {
    return this.http
      .post<any>(`${BASE_URL}/property-promotion`, { ...payload })
      .pipe(first());
  }

  editBanner(id: number, payload: any) {
    return this.http
      .put<any>(`${BASE_URL}/property-promotion/${id}`, { ...payload })
      .pipe(first());
  }

  deleteBanner(id: string) {
    return this.http
      .delete<any>(`${BASE_URL}/property-promotion/${id}`)
      .pipe(first());
  }
}
