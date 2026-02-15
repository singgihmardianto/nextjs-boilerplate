type UIState = {
  showErrorAlert: boolean;
  message?: string;
};

type UIAction = { type: "SHOW_ERROR_ALERT"; payload: string } | { type: "HIDE_ERROR_ALERT" };

function UIReducer(state: UIState, action: UIAction): UIState {
  console.log("UI REDUCER ACTION:", action);
  switch (action.type) {
    case "SHOW_ERROR_ALERT":
      return { ...state, showErrorAlert: true, message: action.payload };
    case "HIDE_ERROR_ALERT":
      return { ...state, showErrorAlert: false };
    default:
      return state;
  }
}

export { UIReducer };
