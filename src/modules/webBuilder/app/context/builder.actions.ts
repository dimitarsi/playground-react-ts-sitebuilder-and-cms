import { PageId, Page, ComponentData } from "./types";

export type UpateCurrentPageAction = {
  type: "setCurrentPage";
  payload: { pageId: PageId };
};
export type AddPageAction = { type: "addPage"; payload: { page: Page } };
export type UpdatePageAction = { type: "updatePage"; payload: { page: Page } };
export type RemovePageAction = {
  type: "removePage";
  payload: { pageId: PageId };
};

export type AddComponentAction = {
  type: "addComponent";
  payload: { component: ComponentData };
};
export type UpdateComponentAction = {
  type: "updateComponent";
  payload: { component: ComponentData };
};

export type RemoveComponentAction = {
  type: "removeComponent";
  payload: { componentId: string };
};

export type UndoAction = {
  type: "undo";
};

export type RedoAction = {
  type: "redo";
};

export type Init = { type: "init" };

export type Action =
  | Init
  | UpateCurrentPageAction
  | AddPageAction
  | UpdatePageAction
  | RemovePageAction
  | AddComponentAction
  | UpdateComponentAction
  | RemoveComponentAction
  | UndoAction
  | RedoAction;
