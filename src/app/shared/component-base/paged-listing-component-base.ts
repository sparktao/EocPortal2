import { AppComponentBase } from "./app-component-base";
import { Injector, OnInit } from '@angular/core';


export class EntityDto {
    id: number;
}

export class PaginationParameters {
  //查询条件json
  conditionJson?:string;
  //page index
  pageIndex?: number;
  //page size
  pageSize?: number;
  // fields?: string;
  //created_date
  sidx?: string;
  //desc
  sord?: string;

  constructor(init?: Partial<PaginationParameters>) {
      Object.assign(this, init);
  }
}

export class PageMeta {
  totalItemsCount: number;
  pageSize: number;
  pageIndex: number;
  pageCount: number;
  // previousPageLink: string;
  // nextPageLink: string;

  init(data?: any) {
    if (data) {
        this.totalItemsCount = data["totalItemsCount"];
        this.pageSize = data["pageSize"];
        this.pageIndex = data["pageIndex"];
        this.pageCount = data["pageCount"];
    }
  }
}

export abstract class PagedListingComponentBase<EntityDto> extends AppComponentBase implements OnInit {

    public pageSize: number = 10;
    public pageIndex: number = 1;
    public totalPages: number = 1;
    public totalItems: number;
    public isTableLoading = false;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        //this.refresh();
    }

    refresh(): void {
        this.getDataPage();
    }

    public showPaging(pTotalPage:number, pTotalItems: number): void {
        this.totalPages = pTotalPage;
        this.totalItems = pTotalItems;
    }

    public getDataPage(): void {
        this.isTableLoading = true;
        this.list(() => {
            this.isTableLoading = false;
        });
    }

    protected abstract list(finishedCallback: Function): void;
    protected abstract delete(entity: EntityDto): void;
}
