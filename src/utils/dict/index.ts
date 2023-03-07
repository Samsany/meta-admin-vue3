import { getAuthCache } from '/@/utils/auth'
import { DB_DICT_DATA_KEY } from '/@/enums/cacheEnum'
import { getDictDataByDictTypeList } from '/@/api/system/dict'
import { GetDictInfoModel } from '/@/api/system/model/dictModel'

/**
 * 从缓存中获取字典配置
 * @param code
 */
export const getDictItemsByCode = (code: string) => {
  const dictList: GetDictInfoModel[] = getAuthCache(DB_DICT_DATA_KEY)
  if (dictList && dictList.length > 0) {
    const dictSelectList = dictList.filter(it => it.dictType === code)
    return dictSelectList && dictSelectList[0].dictDataList
  }
}
/**
 * 获取字典数组
 * @return List<DictData>
 * @param code
 */
export const initDictOptions = async code => {
  //1.优先从缓存中读取字典配置
  if (getDictItemsByCode(code)) {
    return new Promise(resolve => {
      const objList = getDictItemsByCode(code)
      if (objList) {
        resolve(objList)
      }
    })
  }
  // 2.获取字典数组
  // 字典数据请求前将参数编码处理，但是不能直接编码，因为可能之前已经编码过了
  if (code.indexOf(',') > 0 && code.indexOf(' ') > 0) {
    // 编码后类似sys_user%20where%20username%20like%20xxx' 是不包含空格的,这里判断如果有空格和逗号说明需要编码处理
    code = encodeURI(code)
  }
  // 字典数据请求前将参数编码处理，但是不能直接编码，因为可能之前已经编码过了
  const dictVo = await getDictDataByDictTypeList(code)
  return dictVo && dictVo.dictDataList
}
