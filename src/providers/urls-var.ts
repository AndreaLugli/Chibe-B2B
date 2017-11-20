import { Injectable } from '@angular/core';

@Injectable()
export class URLVars {
  //public baseURL = "http://127.0.0.1:8000";
  public baseURL = "http://app.chibeapp.com";

  getBaseURL() {
    return this.baseURL;
  }

  aziendaLoginURL() {
    return this.getBaseURL() + "/azienda/login/";
  }

  aziendaCategorieURL() {
    return this.getBaseURL() + "/azienda/categorie/";
  }

  registraPagagamentoURL() {
    return this.getBaseURL() + "/azienda/pagamento/";
  }

  testURL() {
    return this.getBaseURL() + "/azienda/test/";
  }

  riscattaPremioAzienda() {
    return this.getBaseURL() + "/azienda/premio/";
  }

  sonoFornitore() {
    return this.getBaseURL() + "/azienda/fornitore/";
  }

}
