export interface RequestType {
  id: string;
  requestType: string;
  purpose: string;
  informationToCollect: {
    fieldName: string;
    fieldType: "text" | "long-text" | "date" | "select" | "number";
    required: boolean;
  }[];
  requestTypeOwner: string;
  timeOfCreation: string;
}
