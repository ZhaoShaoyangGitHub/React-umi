declare interface versionList {
  readonly [index: number]: {
    code: string;
    describe: string;
    author: string;
    time: string;
  };
}

declare interface props {
  children?: ReactNode;
  readonly match: {
    isExact: boolean;
    params: {};
    path: string;
    url: string;
  };
  store?: any;
  readonly location: {
    [propName: string]: any;
  };
  readonly history: {
    [propName: string]: any;
  };
}

declare interface ajax_param {
  readonly url: string;
  data: {} | string;
  readonly method: "get" | "post";
  [propName: string]: any;
}
