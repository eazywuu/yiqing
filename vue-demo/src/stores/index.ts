import { defineStore } from 'pinia'
import { getApiList } from '../server'
import type { Children, ChinaAdd, ChinaTotal, RootObject } from './type'
export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
  }),
  actions: {
    async getList() {
      this.list = await getApiList()
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
    },
  },
})
