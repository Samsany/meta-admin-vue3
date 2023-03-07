import { getDatePickerCellValue } from './ADatePicker'
import { createCellRender, createEditRender, createExportMethod, createFormItemRender } from './common'

export default {
  renderEdit: createEditRender(),
  renderCell: createCellRender(getDatePickerCellValue, () => {
    return ['YYYY']
  }),
  renderItemContent: createFormItemRender(),
  exportMethod: createExportMethod(getDatePickerCellValue, () => {
    return ['YYYY']
  })
}
