export type UIState = {
  showErrorAlert: boolean;
  showSuccessAlert: boolean;
  message?: string;
};

export type UIAction =
  | { type: "SHOW_ERROR_ALERT"; payload: string }
  | { type: "HIDE_ERROR_ALERT" }
  | { type: "SHOW_SUCCESS_ALERT" }
  | { type: "HIDE_SUCCESS_ALERT" };

function UIReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "SHOW_ERROR_ALERT":
      return { ...state, showErrorAlert: true, message: action.payload };
    case "HIDE_ERROR_ALERT":
      return { ...state, showErrorAlert: false };
    case "SHOW_SUCCESS_ALERT":
      return { ...state, showSuccessAlert: true };
    case "HIDE_SUCCESS_ALERT":
      return { ...state, showSuccessAlert: false };
    default:
      return state;
  }
}

export { UIReducer };
