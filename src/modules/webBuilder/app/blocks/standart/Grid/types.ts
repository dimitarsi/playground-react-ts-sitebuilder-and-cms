export interface Data {
  id: string;
  type: string;
  data: {
    direction: "row" | "column";
    gap: number;
    align: "center" | "space-between" | "end";
  };
  parent: string;
}
