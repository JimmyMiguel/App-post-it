
export type DataItem = {
  id: number;
  title: string;
  text: string[];
  date: Date;
}

const state = {

  listener: [] as Function[],

getState(): DataItem[] {
  const json = localStorage.getItem("miData");
  if (!json) return []; // si no hay data, devolvés array vacío
  return JSON.parse(json) as DataItem[];
}
,



  setState(newState: DataItem[]) {
      localStorage.setItem("miData", JSON.stringify(newState)); // al editar subo localStorage la data
     for (const callback of this.listener) {
      callback();
    }

  },


  subscribe(callback: Function) {
    this.listener.push(callback);
  },
};

export { state };
