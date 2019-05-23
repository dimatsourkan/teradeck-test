import { BaseModel } from "@entities/base/base-model";

export interface User extends BaseModel {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
