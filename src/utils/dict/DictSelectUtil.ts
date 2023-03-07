/**
 * 字典 util
 * author: scott
 * date: 20190109
 */

import { getDictItemsByCode } from './index'
import { getDictDataByDictTypeList } from '/@/api/system/dict'

/**
 * 获取字典数组
 *
 * @param dictCode 字典Code
 * @return List<Map>
 */
export async function initDictOptions(dictCode) {
  if (!dictCode) {
    return '字典Code不能为空!'
  }
  // 优先从缓存中读取字典配置
  const cacheDictDataList = getDictItemsByCode(dictCode)
  if (cacheDictDataList) {
    return cacheDictDataList
    // if (isTransformResponse) {
    //   return res.result
    // } else {
    //   return res
    // }
  }
  //获取字典数组
  return getDictDataByDictTypeList(dictCode)
}

/**
 * 字典值替换文本通用方法
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterDictText(dictOptions, text) {
  // 字典翻译 text 允许逗号分隔 ---
  if (text != null && Array.isArray(dictOptions)) {
    const result: any = []
    // 允许多个逗号分隔，允许传数组对象
    let splitText
    if (Array.isArray(text)) {
      splitText = text
    } else {
      splitText = text.toString().trim().split(',')
    }
    for (const txt of splitText) {
      let dictText = txt
      for (const dictItem of dictOptions) {
        if (txt.toString() === dictItem.dictValue.toString()) {
          dictText = dictItem.dictLabel || dictItem.text || dictItem.title || dictItem.label
          break
        }
      }
      result.push(dictText)
    }
    return result.join(',')
  }
  return text
  // 字典翻译 text 允许逗号分隔 ---
}

/**
 * 字典值替换文本通用方法(多选)
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterMultiDictText(dictOptions, text) {
  //js “!text” 认为0为空，所以做提前处理
  if (text === 0 || text === '0') {
    if (dictOptions) {
      for (const dictItem of dictOptions) {
        if (text == dictItem.dictValue) {
          return dictItem.dictValue
        }
      }
    }
  }

  if (!text || text == 'undefined' || text == 'null' || !dictOptions || dictOptions.length == 0) {
    return ''
  }
  let re = ''
  text = text.toString()
  const arr = text.split(',')
  dictOptions.forEach(function (option) {
    if (option) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === option.value) {
          re += option.text + ','
          break
        }
      }
    }
  })
  if (re == '') {
    return text
  }
  return re.substring(0, re.length - 1)
}

/**
 * 翻译字段值对应的文本
 * @returns string
 * @param dictCode
 * @param key
 */
export function filterDictTextByCache(dictCode, key) {
  if (key == null || key.length == 0) {
    return
  }
  if (!dictCode) {
    return '字典Code不能为空!'
  }
  //优先从缓存中读取字典配置
  const cacheDictDataList = getDictItemsByCode(dictCode)
  if (cacheDictDataList) {
    const item = cacheDictDataList.filter(t => t.dictValue == key)
    if (item && item.length > 0) {
      return item[0].dictLabel
    }
  }
}

/** 通过code获取字典数组 */
export async function getDictItems(dictCode: string) {
  //优先从缓存中读取字典配置
  const cacheDictDataList = getDictItemsByCode(dictCode)
  if (cacheDictDataList) {
    return cacheDictDataList
  }

  //缓存中没有，就请求后台
  return await getDictDataByDictTypeList(dictCode)
    .then(res => {
      const { data } = res
      const dictDataArr = data && data.dictDataList
      if (dictDataArr) {
        // const dictDataArr = data.map(item => ({ ...item }))
        console.log('------- 从DB中获取到了字典-------dictCode : ', dictCode, dictDataArr)
        return Promise.resolve(dictDataArr)
      } else {
        console.error('getDictItems error: : ', res)
        return Promise.resolve([])
      }
    })
    .catch(res => {
      console.error('getDictItems error: ', res)
      return Promise.resolve([])
    })
}
