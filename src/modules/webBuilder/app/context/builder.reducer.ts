import {
  Action,
  AddComponentAction,
  AddPageAction,
  RemoveComponentAction,
  RemovePageAction,
  UpateCurrentPageAction,
  UpdateComponentAction,
  UpdatePageAction,
} from "./builder.actions";
import { defaultHomePageState } from "./builder.state";
import {
  ComponentData,
  ContextBuilderStateData,
  ContextHistory,
  PageId,
  PageState,
} from "./types";

/**
 * Helper function to splice one item into a cloned array and return it
 */
function spliceOne(arr: Array<any>, position: number, newItem: any) {
  const newArr = [...arr];

  newArr.splice(position + 1, 1, newItem);

  return newArr;
}

export const reducer = (
  state: ContextBuilderStateData & ContextHistory,
  action: Action
): ContextBuilderStateData & ContextHistory => {
  let newState: ContextBuilderStateData | null = null;

  const { history, historyIndex } = state;

  if (action.type === "setCurrentPage") {
    newState = updateCurrentPage(state, action.payload);
  }

  if (action.type === "addPage") {
    newState = addPage(state, action.payload);
  }

  if (action.type === "addComponent") {
    newState = addComponent(state, action.payload);
  }

  if (action.type === "updateComponent") {
    newState = updateComponent(state, action.payload);
  }

  if (action.type === "removeComponent") {
    newState = removeComponent(state, action.payload);
  }

  if (action.type === "removePage") {
    newState = removePage(state, action.payload);
  }

  if (action.type === "updatePage") {
    newState = updatePage(state, action.payload);
  }

  let newHistory = spliceOne(history, historyIndex, {
    state: newState,
    action,
  });

  let newHistoryIndex = historyIndex;

  if (action.type === "undo") {
    if (historyIndex > 0) {
      newHistory = history;
      newHistoryIndex = historyIndex - 1;
      newState = history[newHistoryIndex].state;
    }
  }

  if (action.type === "redo") {
    if (historyIndex < history.length - 1) {
      newHistory = history;
      newHistoryIndex = historyIndex + 1;
      newState = history[newHistoryIndex].state;
    }
  }

  if (action.type !== "undo" && action.type !== "redo") {
    newHistoryIndex += 1;
  }

  if (!newState) {
    return state;
  }

  return {
    ...newState,
    history: newHistory,
    historyIndex: newHistoryIndex,
  };
};

const updateCurrentPage = (
  state: ContextBuilderStateData,
  payload: UpateCurrentPageAction["payload"]
): ContextBuilderStateData => {
  return {
    ...state,
    currentPage: payload.pageId,
  };
};

const addPage = (
  state: ContextBuilderStateData,
  payload: AddPageAction["payload"]
): ContextBuilderStateData => {
  return {
    ...state,
    pages: [...state.pages, payload.page],
    pageStates: {
      ...state.pageStates,
      [payload.page.pageId]: {
        pageId: payload.page.pageId,
        components: defaultHomePageState.components,
      },
    } as Record<string, PageState>,
  };
};

const addComponent = (
  state: ContextBuilderStateData,
  payload: AddComponentAction["payload"]
): ContextBuilderStateData => {
  const component = payload.component;
  let pageComponents = state.pageStates[state.currentPage];

  pageComponents = {
    ...pageComponents,
    components: {
      ...pageComponents.components,
      [component.id]: component,
    },
  };

  return {
    ...state,
    pageStates: {
      ...state.pageStates,
      [state.currentPage]: pageComponents,
    },
  };
};

export const updateComponent = (
  state: ContextBuilderStateData,
  payload: UpdateComponentAction["payload"]
): ContextBuilderStateData => {
  let pageComponents = state.pageStates[state.currentPage];

  pageComponents = {
    ...pageComponents,
    components: replaceComponent(pageComponents.components, payload.component),
  };

  return {
    ...state,
    pageStates: {
      ...state.pageStates,
      [state.currentPage]: pageComponents,
    },
  };
};

export const removeComponent = (
  state: ContextBuilderStateData,
  payload: RemoveComponentAction["payload"]
) => {
  let pageComponents = state.pageStates[state.currentPage];

  pageComponents = {
    ...pageComponents,
    components: removeFromComponents(
      pageComponents.components,
      payload.componentId
    ),
  };

  return {
    ...state,
    pageStates: {
      ...state.pageStates,
      [state.currentPage]: pageComponents,
    },
  };
};

const replaceComponent = (
  components: Record<string, ComponentData>,
  data: ComponentData
) => {
  return Object.values(components).reduce((acc, component) => {
    if (component.id === data.id) {
      return {
        ...acc,
        [data.id]: data,
      };
    }
    return {
      ...acc,
      [component.id]: component,
    };
  }, {} as Record<string, ComponentData>);
};

const removeFromComponents = (
  components: Record<string, ComponentData>,
  componentId: string
) => {
  return Object.values(components).reduce((acc, component) => {
    if (component.id === componentId) {
      return {
        ...acc,
      };
    }
    return {
      ...acc,
      [component.id]: component,
    };
  }, {} as Record<string, ComponentData>);
};

const removePage = (
  state: ContextBuilderStateData,
  payload: RemovePageAction["payload"]
): ContextBuilderStateData => {
  // Prevent removing the last page
  if (state.pages.length <= 1) {
    return state;
  }

  const filteredPages = state.pages.filter((p) => p.pageId !== payload.pageId);

  return {
    ...state,
    currentPage: filteredPages[0].pageId,
    pages: filteredPages,
    pageStates: removePageStates(state.pageStates, payload.pageId),
  };
};

const removePageStates = (state: Record<string, PageState>, pageId: PageId) => {
  const newState = { ...state };
  delete newState[pageId];
  return newState;
};

const updatePage = (
  state: ContextBuilderStateData,
  payload: UpdatePageAction["payload"]
) => {
  return {
    ...state,
    pages: state.pages.map((p) => {
      if (p.pageId === payload.page.pageId) return payload.page;
      return p;
    }),
  };
};
