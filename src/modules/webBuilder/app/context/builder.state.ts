import { Reducer, useReducer } from "react";
import { Action } from "./builder.actions";
import { reducer } from "./builder.reducer";
import { PERSIST_KEY } from "./constants";
import {
  CompleteBuilderState,
  ComponentData,
  ContextBuilderStateData,
  ContextHistory,
  Page,
  PageId,
  PageState,
} from "./types";

const defaultHomePage = { name: "Home", slug: "/", order: 1, pageId: "home" };
const defaultRootState: ComponentData = {
  id: "root",
  parent: "",
  data: "",
  type: "root-root",
};

export const defaultHomePageState: PageState = {
  pageId: "root",
  components: { root: defaultRootState },
};

export const defaultData = {
  pages: [defaultHomePage],
  currentPage: defaultHomePage.pageId,
  pageStates: {
    [defaultHomePage.pageId]: defaultHomePageState,
  },
  initializedFromLocalStorage: false,
};

export const useBuilderState = (): CompleteBuilderState => {
  const [data, dispatch] = useReducer<
    Reducer<ContextBuilderStateData & ContextHistory, Action>,
    ContextBuilderStateData
  >(reducer, defaultData, restoreFromLocalStorage);

  return {
    ...data,
    addPage: (page: Page) => dispatch({ type: "addPage", payload: { page } }),
    updatePage: (page: Page) =>
      dispatch({ type: "updatePage", payload: { page } }),
    removePage: (pageId: PageId) =>
      dispatch({ type: "removePage", payload: { pageId } }),
    addComponent: (component: ComponentData) =>
      dispatch({ type: "addComponent", payload: { component } }),
    updateComponent: (component: ComponentData) =>
      dispatch({ type: "updateComponent", payload: { component } }),
    removeComponent: (componentId: string) =>
      dispatch({ type: "removeComponent", payload: { componentId } }),
    setCurrentPage: (pageId: PageId) =>
      dispatch({ type: "setCurrentPage", payload: { pageId } }),
    undo: () => dispatch({ type: "undo" }),
    redo: () => dispatch({ type: "redo" }),
  };
};

const restoreFromLocalStorage = (
  defaultData: ContextBuilderStateData
): ContextBuilderStateData & ContextHistory => {
  let d = defaultData;
  try {
    const data = JSON.parse(window?.localStorage.getItem(PERSIST_KEY) || "");
    d = data;
  } catch (e) {
    // unable to restore state from localStorage
  } finally {
    return {
      ...d,
      history: [{ state: d, action: { type: "init" } }],
      historyIndex: 0,
    };
  }
};
