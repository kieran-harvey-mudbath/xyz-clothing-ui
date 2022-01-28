import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExchangeRates } from '../models/exchange-rates';

@Injectable()
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getRates(): Observable<ExchangeRates[]> {
    return this.http.get<ExchangeRates[]>(environment.urls.ratesUrl);
  }
}
