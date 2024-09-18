export interface IApiResponse {
  status: "error" | "success";
  results: any;
  error: string;
}
