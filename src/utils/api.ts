import data from "./data";

export default async function api(request: string): Promise<any> {
  request;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}