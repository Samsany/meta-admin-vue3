import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel'

// 定义查询参数
export type DictVO = BasicPageParams & {
  queryMode?: string
  dictName?: string
  dictType?: string
  status?: number
}

export interface GetDictInfoModel {
  id?: number
  dictName: string
  dictType: string
  status?: number
  sort?: number
  createTime?: string
  remark?: string
  dictDataList?: GetDictDataInfoModel[]
}

// 根据对象生成响应模型
export type DictDTO = BasicFetchResult<GetDictInfoModel>

// 定义查询参数
export type DictDataVO = BasicPageParams & {
  dictType: string
  dictLabel?: string
  status?: number
}
export interface GetDictDataInfoModel {
  id?: number
  dictLabel: string
  dictValue: string
  dictType: string
  cssClass?: string
  listClass?: string
  status?: number
  sort?: number
  isDefault: number
  createTime?: string
  remark?: string
}

// 根据对象生成响应模型
export type DictDataDTO = BasicFetchResult<GetDictDataInfoModel>
