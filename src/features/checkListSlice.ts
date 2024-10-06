import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CHECK_LIST_LOCAL_STORAGE_ID } from '../App'

export interface CheckListState {
  list: CheckListItem[],
}

export interface CheckListItem {
  id: string,
  date: string,
  checkNumber: number,
  company: string,
  sum: number,
  nds20: number | undefined,
  nds10: number | undefined,
}

const initialState: CheckListState = {
  list: []
}

export const checkListSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CheckListItem>) => {
      state.list.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
    clearAll: (state) => {
      state.list = [];
    },
    initializeList: (state, action: PayloadAction<CheckListItem[]>) => {
      state.list = action.payload;
    },
    updateLocalStorage: (state) => {
      localStorage.setItem(CHECK_LIST_LOCAL_STORAGE_ID, JSON.stringify(state.list));
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearAll, initializeList, updateLocalStorage } = checkListSlice.actions

export default checkListSlice.reducer
