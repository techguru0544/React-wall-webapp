import {
  SET_MODAL,
} from "../actionTypes";

const initialState = {
  showModal: false,
  modalComponent: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL: {
      const {modalState, modalComponent} = action.payload;
      return {
        ...state,
        showModal: modalState,
        modalComponent: modalComponent
      };
    }

    default:
      return state;
  }
}
