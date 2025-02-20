export interface IUiOptions {
  colors: {
    primary: string;
    secondary: string;
    third: string;
  };
  logo: string;
}

export interface IConfig {
  _id: string;
  name: string;
  userId: string;
  uiOptions: IUiOptions;
  token: string;
  departmentId: string;
  description: string;
  erxesAppToken: string;
  extraProductCategories: string[];
  roomCategories: string[];
  paymentIds: string[];
  pipelineConfig: {
    boardId: string;
    pipelineId: string;
  };
  user1Ids: string[];
  user2Ids: string[];
  user3Ids: string[];
  user4Ids: string[];
  user5Ids: string[];
}
