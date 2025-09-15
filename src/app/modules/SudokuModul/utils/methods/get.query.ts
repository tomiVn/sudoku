import { HttpParams } from "@angular/common/http";

export function getHttpQuery(name: string, endPoint: string){

    return new HttpParams().set(name, endPoint);
}