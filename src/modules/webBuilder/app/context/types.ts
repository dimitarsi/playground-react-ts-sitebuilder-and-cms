import { Action } from "./builder.actions";

export type PageId = string;

export interface Page {
  name: string;
  slug: string;
  order: number;
  pageId: PageId;
}

export interface ComponentData {
  parent: string;
  id: string;
  data: any;
  type: string;
}

export interface PageState {
  pageId: PageId;
  components: Record<string, ComponentData>;
}

export interface ContextBuilderStateData {
  pages: Page[];
  currentPage: PageId;
  pageStates: Record<PageId, PageState>;
  initializedFromLocalStorage: boolean;
}

export interface ContextHistory {
  history: Array<{ state: ContextBuilderStateData; action: Action }>;
  historyIndex: number;
}

export interface ContextBuilderHandlers {
  addPage: (page: Page) => void;
  removePage: (pageId: PageId) => void;
  updatePage: (page: Page) => void;
  addComponent: (data: ComponentData) => void;
  updateComponent: (data: ComponentData) => void;
  removeComponent: (componentId: string) => void;
  setCurrentPage: (pageId: PageId) => void;
  undo: () => void;
  redo: () => void;
}

export type CompleteBuilderState = ContextBuilderStateData &
  ContextHistory &
  ContextBuilderHandlers;
