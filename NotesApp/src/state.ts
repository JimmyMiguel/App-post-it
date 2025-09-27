
export type DataItem = {
  id: number;
  title: string;
  text: string;
  Date: Date;
}

const state = {

  data: [] as DataItem[],

  listener: [] as Function[],

  getState(): DataItem[] {
    return this.data;
  },



  setState(newState: DataItem[]) {
    this.data = newState;
    for (const callback of this.listener) {
      callback();
    }
  },
  subscribe(callback: Function) {
    this.listener.push(callback);
  },
};

export { state };
