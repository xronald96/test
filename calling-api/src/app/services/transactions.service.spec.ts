import { TestBed, getTestBed } from "@angular/core/testing";

import { TransactionsService } from "./transactions.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { Transactions } from "../model/transactions";
import { HttpClientTestingModule } from "@angular/common/http/testing";
const allTransactions: Transactions[] = [
  {
    id: 4734,
    date: "2018-07-11T22:49:24.000Z",
    amount: -193.38,
    fee: -3.18,
    description: "Lorem ipsum dolor sit amet",
    userId: 1,
  },
  {
    id: 2210,
    date: "2018-07-14T16:54:27.000Z",
    amount: 165.36,
    description: "Est ullamco mollit ad in in proident.",
    userId: 1,
  },
  {
    id: 1442,
    date: "2018-07-24T18:10:10.000Z",
    amount: -113.86,
    description: "",
    userId: 1,
  },
  {
    id: 8396,
    date: "2018-06-11T11:31:27.000Z",
    amount: -153.62,
    fee: -3.14,
    description: "Quis reprehenderit ullamco incididunt non ut.",
    userId: 1,
  },
  { id: 3369, date: "2018-07-19T21:33:19.000Z", amount: -38.67, userId: 1 },
  {
    id: 2911,
    date: "2018-07-29T17:56:43.000Z",
    amount: 87.84,
    fee: -1.11,
    description: "Veniam sit ut pariatur do.",
    userId: 1,
  },
  {
    id: 2911,
    date: "2018-07-21T19:13:23.000Z",
    amount: 37.74,
    fee: 0,
    description: "Lorem et incididunt aute cillum.",
    userId: 1,
  },
  {
    id: 6595,
    date: "2018-07-22T13:48:48.000Z",
    amount: 87.95,
    description: "Minim non sunt cupidatat magna nisi ut duis.",
    userId: 1,
  },
  {
    id: 3371,
    date: "2018-07-24T21:29:11.000Z",
    amount: -161.56,
    fee: -4.95,
    description: null,
    userId: 1,
  },
  {
    id: 6068,
    date: "2018-07-26T15:20:52.000Z",
    amount: 92.54,
    description: "Nostrud laboris id officia aliquip.",
    userId: 1,
  },
  { id: 5038, date: "2014-07-30T19:36:00.000Z", amount: 184.98, userId: 1 },
  {
    id: 6595,
    date: "2018-07-24T20:20:56.000Z",
    amount: -37.22,
    fee: -3.99,
    description: "Veniam deserunt ut ullamco et ut.",
    userId: 1,
  },
  {
    id: 2117,
    date: "2018-07-28T14:14:17.000Z",
    amount: 96.56,
    description: "",
    userId: 1,
  },
  {
    id: 2857,
    date: "2019-07-22T13:51:12.000Z",
    amount: -144.63,
    fee: -4.74,
    description: "Tempor dolor laboris minim cupidatat duis nisi ad.",
    userId: 1,
  },
  {
    id: 9745,
    date: "2018-07-26T19:26:10.000Z",
    amount: 166.83,
    description: "Fugiat elit cupidatat ipsum ad Lorem aliquip.",
    userId: 1,
  },
];
describe("TransactionsService", () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: TransactionsService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
    })
  );
  beforeEach(() => {
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = injector.get(TransactionsService);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it("should be created", () => {
    const service: TransactionsService = TestBed.get(TransactionsService);
    expect(service).toBeTruthy();
  });

  it("Get all withoutFilter", () => {
    const service: TransactionsService = TestBed.get(TransactionsService);
    service.getTransactions().subscribe((res) => {
      expect(res).toEqual(allTransactions);
    });
    const req = httpMock.expectOne((req) =>
      req.url.includes(
        "https://us-central1-code-challenge-e9f47.cloudfunctions.net/app/transactions"
      )
    );
    expect(req.request.method).toBe("GET");
    req.flush(allTransactions);
  });
});
