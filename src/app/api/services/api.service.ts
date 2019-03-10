/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { Advertise } from '../models/advertise';
import { DefaultResponse } from '../models/default-response';
import { RequestGetAdvertises } from '../models/request-get-advertises';
import { requestEditApproval } from '../models/request-edit-approval';
import { RequestLogin } from '../models/request-login';
import { Category } from '../models/category';
import { RequestCreateCategories } from '../models/request-create-categories';
import { RequestGetCategories } from '../models/request-get-categories';
import { RequestGetCount } from '../models/request-get-count';
import { Dashboard } from '../models/dashboard';
import { DO } from '../models/do';
import { RequestGetDOs } from '../models/request-get-dos';
import { Transactions } from '../models/transactions';
import { RequestGetFinance } from '../models/request-get-finance';
import { Rule } from '../models/rule';
import { RequestPostPermission } from '../models/request-post-permission';
import { ResponsePutPermission } from '../models/response-put-permission';
import { RequestUpdatePermission } from '../models/request-update-permission';
import { ProductGroup } from '../models/product-group';
import { RequestProductGroup } from '../models/request-product-group';
import { RequestGetProductGroups } from '../models/request-get-product-groups';
import { RequestProductStore } from '../models/request-product-store';
import { ResponseProductStore } from '../models/response-product-store';
import { RequestGetProductStores } from '../models/request-get-product-stores';
import { Product } from '../models/product';
import { RequestCreateProduct } from '../models/request-create-product';
import { RequestGetProducts } from '../models/request-get-products';
import { RequestDeleteProducts } from '../models/request-delete-products';
import { User } from '../models/user';
import { RequestUpdateProfile } from '../models/request-update-profile';
import { ProgressBar } from '../models/progress-bar';
import { body } from '../models/body';
import { RequestGetProgressBars } from '../models/request-get-progress-bars';
import { body_1 } from '../models/body-_1';
import { Promotion } from '../models/promotion';
import { RequestPostPromotion } from '../models/request-post-promotion';
import { ResponsePutPromotion } from '../models/response-put-promotion';
import { RequestPutPromotion } from '../models/request-put-promotion';
import { Redeem } from '../models/redeem';
import { ResponsePutRedeem } from '../models/response-put-redeem';
import { RequestPutRedeem } from '../models/request-put-redeem';
import { ResponsePostSearch } from '../models/response-post-search';
import { RequestPostSearch } from '../models/request-post-search';
import { RequestPostServices } from '../models/request-post-services';
import { Shop } from '../models/shop';
import { RequestGetShops } from '../models/request-get-shops';
import { ResponseSO } from '../models/response-so';
import { SO } from '../models/so';
import { RequestGetSOs } from '../models/request-get-sos';
import { RequestCreateStore } from '../models/request-create-store';
import { RequestAddSystem } from '../models/request-add-system';
import { requestEditTurnOnOff } from '../models/request-edit-turn-on-off';
import { RequestCreateUser } from '../models/request-create-user';
import { RequestGetUsers } from '../models/request-get-users';


@Injectable()
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param ad_id - undefined
   */
  getAdvertiseResponse(adId?: string): Observable<HttpResponse<Advertise>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (adId != null) __params = __params.set("ad_id", adId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/advertise`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Advertise = null;
        _body = _resp.body as Advertise
        return _resp.clone({body: _body}) as HttpResponse<Advertise>;
      })
    );
  }

  /**
   * @param ad_id - undefined
   */
  getAdvertise(adId?: string): Observable<Advertise> {
    return this.getAdvertiseResponse(adId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  addAdvertiseResponse(body?: {}): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/advertise`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  addAdvertise(body?: {}): Observable<DefaultResponse> {
    return this.addAdvertiseResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getAdvertisesResponse(body?: RequestGetAdvertises): Observable<HttpResponse<Advertise[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/advertise`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Advertise[] = null;
        _body = _resp.body as Advertise[]
        return _resp.clone({body: _body}) as HttpResponse<Advertise[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getAdvertises(body?: RequestGetAdvertises): Observable<Advertise[]> {
    return this.getAdvertisesResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param ad_id - undefined
   */
  deleteAdvertiseResponse(adId?: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (adId != null) __params = __params.set("ad_id", adId.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/advertise`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param ad_id - undefined
   */
  deleteAdvertise(adId?: string): Observable<DefaultResponse> {
    return this.deleteAdvertiseResponse(adId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  editApprovalResponse(body?: requestEditApproval): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/approval`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  editApproval(body?: requestEditApproval): Observable<DefaultResponse> {
    return this.editApprovalResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  loginResponse(body?: RequestLogin): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/authtoken`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  login(body?: RequestLogin): Observable<DefaultResponse> {
    return this.loginResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  getCategoryResponse(id?: string): Observable<HttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set("id", id.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Category = null;
        _body = _resp.body as Category
        return _resp.clone({body: _body}) as HttpResponse<Category>;
      })
    );
  }

  /**
   * @param id - undefined
   */
  getCategory(id?: string): Observable<Category> {
    return this.getCategoryResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createCategoryResponse(body?: RequestCreateCategories): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createCategory(body?: RequestCreateCategories): Observable<DefaultResponse> {
    return this.createCategoryResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getCategoriesResponse(body?: RequestGetCategories): Observable<HttpResponse<Category[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Category[] = null;
        _body = _resp.body as Category[]
        return _resp.clone({body: _body}) as HttpResponse<Category[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getCategories(body?: RequestGetCategories): Observable<Category[]> {
    return this.getCategoriesResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  deleteCategoryResponse(id?: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set("id", id.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param id - undefined
   */
  deleteCategory(id?: string): Observable<DefaultResponse> {
    return this.deleteCategoryResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getCountResponse(body?: RequestGetCount): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/count`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getCount(body?: RequestGetCount): Observable<DefaultResponse> {
    return this.getCountResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param shop_id - undefined
   */
  getDashboardResponse(shopId?: string): Observable<HttpResponse<Dashboard>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (shopId != null) __params = __params.set("shop_id", shopId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Dashboard = null;
        _body = _resp.body as Dashboard
        return _resp.clone({body: _body}) as HttpResponse<Dashboard>;
      })
    );
  }

  /**
   * @param shop_id - undefined
   */
  getDashboard(shopId?: string): Observable<Dashboard> {
    return this.getDashboardResponse(shopId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param do_id - undefined
   */
  getDOResponse(doId?: string): Observable<HttpResponse<DO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (doId != null) __params = __params.set("do_id", doId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/do`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DO = null;
        _body = _resp.body as DO
        return _resp.clone({body: _body}) as HttpResponse<DO>;
      })
    );
  }

  /**
   * @param do_id - undefined
   */
  getDO(doId?: string): Observable<DO> {
    return this.getDOResponse(doId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getDOsResponse(body?: RequestGetDOs): Observable<HttpResponse<DO[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/do`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DO[] = null;
        _body = _resp.body as DO[]
        return _resp.clone({body: _body}) as HttpResponse<DO[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getDOs(body?: RequestGetDOs): Observable<DO[]> {
    return this.getDOsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param type - undefined
   * @param shop_id - undefined
   */
  getExcelProductsResponse(params: ApiService.GetExcelProductsParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.type != null) __params = __params.set("type", params.type.toString());
    if (params.shopId != null) __params = __params.set("shop_id", params.shopId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/excel_products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param type - undefined
   * @param shop_id - undefined
   */
  getExcelProducts(params: ApiService.GetExcelProductsParams): Observable<DefaultResponse> {
    return this.getExcelProductsResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  addExcelProductsResponse(body?: {}): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/excel_products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  addExcelProducts(body?: {}): Observable<DefaultResponse> {
    return this.addExcelProductsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param type - undefined
   * @param shop_id - undefined
   */
  getFileResponse(params: ApiService.GetFileParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.type != null) __params = __params.set("type", params.type.toString());
    if (params.shopId != null) __params = __params.set("shop_id", params.shopId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/files`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param type - undefined
   * @param shop_id - undefined
   */
  getFile(params: ApiService.GetFileParams): Observable<DefaultResponse> {
    return this.getFileResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getFinanceResponse(body?: RequestGetFinance): Observable<HttpResponse<Transactions[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/finance`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Transactions[] = null;
        _body = _resp.body as Transactions[]
        return _resp.clone({body: _body}) as HttpResponse<Transactions[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getFinance(body?: RequestGetFinance): Observable<Transactions[]> {
    return this.getFinanceResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param rule_id - undefined
   */
  getPermissionResponse(ruleId?: string): Observable<HttpResponse<Rule>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ruleId != null) __params = __params.set("rule_id", ruleId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/permission`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Rule = null;
        _body = _resp.body as Rule
        return _resp.clone({body: _body}) as HttpResponse<Rule>;
      })
    );
  }

  /**
   * @param rule_id - undefined
   */
  getPermission(ruleId?: string): Observable<Rule> {
    return this.getPermissionResponse(ruleId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  addPermissionResponse(body?: RequestPostPermission): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/permission`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  addPermission(body?: RequestPostPermission): Observable<DefaultResponse> {
    return this.addPermissionResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getPermissionsResponse(): Observable<HttpResponse<ResponsePutPermission>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/permission`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponsePutPermission = null;
        _body = _resp.body as ResponsePutPermission
        return _resp.clone({body: _body}) as HttpResponse<ResponsePutPermission>;
      })
    );
  }

  /**
   */
  getPermissions(): Observable<ResponsePutPermission> {
    return this.getPermissionsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param rule_id - undefined
   */
  deletePermissionResponse(ruleId?: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ruleId != null) __params = __params.set("rule_id", ruleId.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/permission`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param rule_id - undefined
   */
  deletePermission(ruleId?: string): Observable<DefaultResponse> {
    return this.deletePermissionResponse(ruleId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updatePermissionResponse(body?: RequestUpdatePermission): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/permission`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updatePermission(body?: RequestUpdatePermission): Observable<DefaultResponse> {
    return this.updatePermissionResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param pg_id - undefined
   */
  getProductGroupResponse(pgId?: string): Observable<HttpResponse<ProductGroup>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (pgId != null) __params = __params.set("pg_id", pgId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/product_group`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ProductGroup = null;
        _body = _resp.body as ProductGroup
        return _resp.clone({body: _body}) as HttpResponse<ProductGroup>;
      })
    );
  }

  /**
   * @param pg_id - undefined
   */
  getProductGroup(pgId?: string): Observable<ProductGroup> {
    return this.getProductGroupResponse(pgId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  addProductGroupResponse(body?: RequestProductGroup): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/product_group`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  addProductGroup(body?: RequestProductGroup): Observable<DefaultResponse> {
    return this.addProductGroupResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getProductGroupsResponse(body?: RequestGetProductGroups): Observable<HttpResponse<ProductGroup[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/product_group`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ProductGroup[] = null;
        _body = _resp.body as ProductGroup[]
        return _resp.clone({body: _body}) as HttpResponse<ProductGroup[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getProductGroups(body?: RequestGetProductGroups): Observable<ProductGroup[]> {
    return this.getProductGroupsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param pg_id - undefined
   */
  deleteProductGroupResponse(pgId?: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (pgId != null) __params = __params.set("pg_id", pgId.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/product_group`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param pg_id - undefined
   */
  deleteProductGroup(pgId?: string): Observable<DefaultResponse> {
    return this.deleteProductGroupResponse(pgId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  addproductStoreResponse(body?: RequestProductStore): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/product_store`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  addproductStore(body?: RequestProductStore): Observable<DefaultResponse> {
    return this.addproductStoreResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getproductStoresResponse(body?: RequestGetProductStores): Observable<HttpResponse<ResponseProductStore>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/product_store`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponseProductStore = null;
        _body = _resp.body as ResponseProductStore
        return _resp.clone({body: _body}) as HttpResponse<ResponseProductStore>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getproductStores(body?: RequestGetProductStores): Observable<ResponseProductStore> {
    return this.getproductStoresResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  getProductResponse(id?: string): Observable<HttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set("id", id.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Product = null;
        _body = _resp.body as Product
        return _resp.clone({body: _body}) as HttpResponse<Product>;
      })
    );
  }

  /**
   * @param id - undefined
   */
  getProduct(id?: string): Observable<Product> {
    return this.getProductResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createProductsResponse(body?: RequestCreateProduct): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createProducts(body?: RequestCreateProduct): Observable<DefaultResponse> {
    return this.createProductsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getProductsResponse(body?: RequestGetProducts): Observable<HttpResponse<Product[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Product[] = null;
        _body = _resp.body as Product[]
        return _resp.clone({body: _body}) as HttpResponse<Product[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getProducts(body?: RequestGetProducts): Observable<Product[]> {
    return this.getProductsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  deleteProductResponse(body?: RequestDeleteProducts): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  deleteProduct(body?: RequestDeleteProducts): Observable<DefaultResponse> {
    return this.deleteProductResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getProfileResponse(): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/profile`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   */
  getProfile(): Observable<User> {
    return this.getProfileResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateProfileResponse(body?: RequestUpdateProfile): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/profile`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateProfile(body?: RequestUpdateProfile): Observable<DefaultResponse> {
    return this.updateProfileResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param code - undefined
   */
  getProgressBarResponse(code?: string): Observable<HttpResponse<ProgressBar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (code != null) __params = __params.set("code", code.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/progressbar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ProgressBar = null;
        _body = _resp.body as ProgressBar
        return _resp.clone({body: _body}) as HttpResponse<ProgressBar>;
      })
    );
  }

  /**
   * @param code - undefined
   */
  getProgressBar(code?: string): Observable<ProgressBar> {
    return this.getProgressBarResponse(code).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  addProgressBarResponse(body?: body): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/progressbar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  addProgressBar(body?: body): Observable<DefaultResponse> {
    return this.addProgressBarResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getProgressBarsResponse(body?: RequestGetProgressBars): Observable<HttpResponse<ProgressBar[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/progressbar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ProgressBar[] = null;
        _body = _resp.body as ProgressBar[]
        return _resp.clone({body: _body}) as HttpResponse<ProgressBar[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getProgressBars(body?: RequestGetProgressBars): Observable<ProgressBar[]> {
    return this.getProgressBarsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateProgressbarResponse(body?: body_1): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/progressbar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateProgressbar(body?: body_1): Observable<DefaultResponse> {
    return this.updateProgressbarResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param promotion_id - undefined
   */
  getPromotionResponse(promotionId?: string): Observable<HttpResponse<Promotion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (promotionId != null) __params = __params.set("promotion_id", promotionId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/promotion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Promotion = null;
        _body = _resp.body as Promotion
        return _resp.clone({body: _body}) as HttpResponse<Promotion>;
      })
    );
  }

  /**
   * @param promotion_id - undefined
   */
  getPromotion(promotionId?: string): Observable<Promotion> {
    return this.getPromotionResponse(promotionId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  addPromotionResponse(body?: RequestPostPromotion): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/promotion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  addPromotion(body?: RequestPostPromotion): Observable<DefaultResponse> {
    return this.addPromotionResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getPromotionsResponse(body?: RequestPutPromotion): Observable<HttpResponse<ResponsePutPromotion[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/promotion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponsePutPromotion[] = null;
        _body = _resp.body as ResponsePutPromotion[]
        return _resp.clone({body: _body}) as HttpResponse<ResponsePutPromotion[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getPromotions(body?: RequestPutPromotion): Observable<ResponsePutPromotion[]> {
    return this.getPromotionsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param promotion_item_id - undefined
   * @param promotion_id - undefined
   */
  deletePromotionResponse(params: ApiService.DeletePromotionParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.promotionItemId != null) __params = __params.set("promotion_item_id", params.promotionItemId.toString());
    if (params.promotionId != null) __params = __params.set("promotion_id", params.promotionId.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/promotion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param promotion_item_id - undefined
   * @param promotion_id - undefined
   */
  deletePromotion(params: ApiService.DeletePromotionParams): Observable<DefaultResponse> {
    return this.deletePromotionResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param redeem_id - undefined
   */
  getRedeemResponse(redeemId?: string): Observable<HttpResponse<Redeem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (redeemId != null) __params = __params.set("redeem_id", redeemId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/redeem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Redeem = null;
        _body = _resp.body as Redeem
        return _resp.clone({body: _body}) as HttpResponse<Redeem>;
      })
    );
  }

  /**
   * @param redeem_id - undefined
   */
  getRedeem(redeemId?: string): Observable<Redeem> {
    return this.getRedeemResponse(redeemId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  putRedeemResponse(body?: RequestPutRedeem): Observable<HttpResponse<ResponsePutRedeem[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/redeem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponsePutRedeem[] = null;
        _body = _resp.body as ResponsePutRedeem[]
        return _resp.clone({body: _body}) as HttpResponse<ResponsePutRedeem[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  putRedeem(body?: RequestPutRedeem): Observable<ResponsePutRedeem[]> {
    return this.putRedeemResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  postSearchResponse(body?: RequestPostSearch): Observable<HttpResponse<ResponsePostSearch>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/search`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponsePostSearch = null;
        _body = _resp.body as ResponsePostSearch
        return _resp.clone({body: _body}) as HttpResponse<ResponsePostSearch>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  postSearch(body?: RequestPostSearch): Observable<ResponsePostSearch> {
    return this.postSearchResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  postServicesResponse(body?: RequestPostServices): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/services`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  postServices(body?: RequestPostServices): Observable<DefaultResponse> {
    return this.postServicesResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param shop_id - undefined
   */
  getShopResponse(shopId?: string): Observable<HttpResponse<Shop>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (shopId != null) __params = __params.set("shop_id", shopId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/shops`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Shop = null;
        _body = _resp.body as Shop
        return _resp.clone({body: _body}) as HttpResponse<Shop>;
      })
    );
  }

  /**
   * @param shop_id - undefined
   */
  getShop(shopId?: string): Observable<Shop> {
    return this.getShopResponse(shopId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createShopResponse(body?: {}): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/shops`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createShop(body?: {}): Observable<DefaultResponse> {
    return this.createShopResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getShopsResponse(body?: RequestGetShops): Observable<HttpResponse<Shop[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/shops`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Shop[] = null;
        _body = _resp.body as Shop[]
        return _resp.clone({body: _body}) as HttpResponse<Shop[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getShops(body?: RequestGetShops): Observable<Shop[]> {
    return this.getShopsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  deleteShopResponse(id?: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set("id", id.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/shops`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param id - undefined
   */
  deleteShop(id?: string): Observable<DefaultResponse> {
    return this.deleteShopResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param so_id - undefined
   */
  getSOResponse(soId?: string): Observable<HttpResponse<ResponseSO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (soId != null) __params = __params.set("so_id", soId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/so`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: ResponseSO = null;
        _body = _resp.body as ResponseSO
        return _resp.clone({body: _body}) as HttpResponse<ResponseSO>;
      })
    );
  }

  /**
   * @param so_id - undefined
   */
  getSO(soId?: string): Observable<ResponseSO> {
    return this.getSOResponse(soId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getSOsResponse(body?: RequestGetSOs): Observable<HttpResponse<SO[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/so`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: SO[] = null;
        _body = _resp.body as SO[]
        return _resp.clone({body: _body}) as HttpResponse<SO[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getSOs(body?: RequestGetSOs): Observable<SO[]> {
    return this.getSOsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param store_id - undefined
   */
  getStoreResponse(storeId?: string): Observable<HttpResponse<Shop>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (storeId != null) __params = __params.set("store_id", storeId.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/stores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Shop = null;
        _body = _resp.body as Shop
        return _resp.clone({body: _body}) as HttpResponse<Shop>;
      })
    );
  }

  /**
   * @param store_id - undefined
   */
  getStore(storeId?: string): Observable<Shop> {
    return this.getStoreResponse(storeId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createStoreResponse(body?: RequestCreateStore): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/stores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createStore(body?: RequestCreateStore): Observable<DefaultResponse> {
    return this.createStoreResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  deleteStoreResponse(id?: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (id != null) __params = __params.set("id", id.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/stores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param id - undefined
   */
  deleteStore(id?: string): Observable<DefaultResponse> {
    return this.deleteStoreResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getSystemResponse(): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/systems`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   */
  getSystem(): Observable<DefaultResponse> {
    return this.getSystemResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  editSystemResponse(body?: RequestAddSystem): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/systems`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  editSystem(body?: RequestAddSystem): Observable<DefaultResponse> {
    return this.editSystemResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  editTurnOffResponse(body?: requestEditTurnOnOff): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/turn_off`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  editTurnOff(body?: requestEditTurnOnOff): Observable<DefaultResponse> {
    return this.editTurnOffResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  editTurnOnResponse(body?: requestEditTurnOnOff): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/turn_on`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  editTurnOn(body?: requestEditTurnOnOff): Observable<DefaultResponse> {
    return this.editTurnOnResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param username - undefined
   */
  getUserResponse(username?: string): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (username != null) __params = __params.set("username", username.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * @param username - undefined
   */
  getUser(username?: string): Observable<User> {
    return this.getUserResponse(username).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createUserResponse(body?: RequestCreateUser): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createUser(body?: RequestCreateUser): Observable<DefaultResponse> {
    return this.createUserResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getUsersResponse(body?: RequestGetUsers): Observable<HttpResponse<User[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: User[] = null;
        _body = _resp.body as User[]
        return _resp.clone({body: _body}) as HttpResponse<User[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getUsers(body?: RequestGetUsers): Observable<User[]> {
    return this.getUsersResponse(body).pipe(
      map(_r => _r.body)
    );
  }}

export module ApiService {
  export interface GetExcelProductsParams {
    type?: string;
    shopId?: string;
  }
  export interface GetFileParams {
    type?: string;
    shopId?: string;
  }
  export interface DeletePromotionParams {
    promotionItemId?: string;
    promotionId?: string;
  }
}
