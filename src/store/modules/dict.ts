import { defineStore } from 'pinia'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { DB_DICT_DATA_KEY } from '/@/enums/cacheEnum'
import { getDictList } from '/@/api/system/dict'
import { BasicKeys } from '/@/utils/cache/persistent'
import { store } from '/@/store'

interface DictState {
  dictItems: []
}

export const useDictStore = defineStore({
  id: 'app-dict',
  state: (): DictState => ({
    dictItems: []
  }),
  getters: {
    getAllDictItems(): [] {
      return this.dictItems || getAuthCache(DB_DICT_DATA_KEY)
    }
  },
  actions: {
    setAllDictItems(dictItems) {
      this.dictItems = dictItems
      setAuthCache(<BasicKeys>DB_DICT_DATA_KEY, dictItems)
    },
    /**
     * 设置全局字典
     */
    async initDictItems() {
      const data = await getDictList({ queryMode: 'list' })
      // console.log('设置全局字典', data)
      this.setAllDictItems(data)
    }
  }
})

// Need to be used outside the setup
export function useDictStoreWithOut() {
  return useDictStore(store)
}
