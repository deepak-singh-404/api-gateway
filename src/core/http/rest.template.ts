import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig } from "axios";

@Injectable()
export class RestTemplate {
  constructor(private readonly httpService: HttpService) { }

  async get(url: string, params?: object): Promise<any> {
    console.log("URL===>", url)
    return this.httpService.get(url, { params }).toPromise();
  }

  async post(url: string, body: object, config: AxiosRequestConfig): Promise<any> {
    console.log("URL===>", url)
    return this.httpService.post(url, body, config).toPromise();
  }
}
