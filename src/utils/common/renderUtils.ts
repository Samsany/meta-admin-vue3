import { h } from 'vue'
import { Avatar, Tag, Tooltip } from 'ant-design-vue'
import { getFileAccessHttpUrl } from '/@/utils/common/compUtils'
import { Tinymce } from '/@/components/Tinymce'
import Icon from '/@/components/Icon'
import { getDictItemsByCode } from '/@/utils/dict'
import { filterMultiDictText } from '/@/utils/dict/DictSelectUtil.js'
import { isEmpty } from '/@/utils/is'
import { useMessage } from '/@/hooks/web/useMessage'

const { createMessage } = useMessage()

const render = {
  /**
   * 渲染列表头像
   */
  renderAvatar: ({ record }) => {
    if (record.avatar) {
      const avatarList = record.avatar.split(',')
      return h(
        'span',
        avatarList.map(item => {
          return h(Avatar, {
            src: getFileAccessHttpUrl(item),
            shape: 'square',
            size: 'default',
            style: { marginRight: '5px' }
          })
        })
      )
    } else {
      return h(
        Avatar,
        { shape: 'square', size: 'default' },
        {
          icon: () => h(Icon, { icon: 'ant-design:file-image-outlined', size: 30 })
        }
      )
    }
  },
  /**
   * 渲染图片
   * @param text
   */
  renderImage: ({ text }) => {
    if (!text) {
      //update-begin-author:taoyan date:2022-5-24 for:  VUEN-1084 【vue3】online表单测试发现的新问题 41、生成的代码，树默认图大小未改
      return h(
        Avatar,
        { shape: 'square', size: 25 },
        {
          icon: () => h(Icon, { icon: 'ant-design:file-image-outlined', size: 25 })
        }
      )
    }
    const avatarList = text.split(',')
    return h(
      'span',
      avatarList.map(item => {
        return h(Avatar, {
          src: getFileAccessHttpUrl(item),
          shape: 'square',
          size: 25,
          style: { marginRight: '5px' }
        })
      })
    )
    //update-end-author:taoyan date:2022-5-24 for:  VUEN-1084 【vue3】online表单测试发现的新问题 41、生成的代码，树默认图大小未改
  },
  /**
   * 渲染 Tooltip
   * @param text
   * @param len
   */
  renderTip: (text, len = 20) => {
    if (text) {
      let showText = text + ''
      if (showText.length > len) {
        showText = showText.substr(0, len) + '...'
      }
      return h(Tooltip, { title: text }, () => showText)
    }
    return text
  },
  /**
   * 渲染a标签
   * @param text
   */
  renderHref: ({ text }) => {
    if (!text) {
      return ''
    }
    const len = 20
    if (text.length > len) {
      text = text.substr(0, len)
    }
    return h('a', { href: text, target: '_blank' }, text)
  },
  /**
   * 渲染富文本
   */
  renderTinymce: ({ model, field }) => {
    return h(Tinymce, {
      showImageUpload: false,
      height: 300,
      value: model[field],
      onChange: (value: string) => {
        model[field] = value
      }
    })
  },

  renderSwitch: (text, arr) => {
    return text ? filterMultiDictText(arr, text) : ''
  },
  renderCategoryTree: (text, code) => {
    const array = getDictItemsByCode(code)
    return filterMultiDictText(array, text)
  },
  renderTag(text, color) {
    return isEmpty(text) ? h('span', text) : h(Tag, { color }, () => text)
  },
  /**
   * 根据字典编码 渲染
   * @param v 值
   * @param code 字典编码
   * @param renderTag 是否使用tag渲染
   */
  renderDict: (v, code, renderTag = false) => {
    let text = ''
    const array = getDictItemsByCode(code) || []
    const obj = array.filter(item => {
      return item.dictValue == v
    })
    if (obj.length > 0) {
      text = obj[0].dictLabel
    }
    return isEmpty(text) || !renderTag ? h('span', text) : h(Tag, text)
  },
  /**
   * 根据字典渲染
   * @param v
   * @param code
   * @param renderTag
   */
  renderDictNative: (v, code, renderTag = false) => {
    let text = ''
    let color: string | undefined = ''
    let style: string | undefined = ''
    const array = getDictItemsByCode(code) || []
    const obj = array.filter(item => {
      return item.dictValue == v
    })
    if (obj.length > 0) {
      text = obj[0].dictLabel
      style = obj[0].cssClass
      color = buildDictStyle(obj[0].listClass)
    }
    return isEmpty(text) || !renderTag ? h('span', { style }, text) : h(Tag, { color }, () => text)
  }
}

/**
 * 构建字典样式
 *
 * @param listClass
 * @return color
 */
function buildDictStyle(listClass) {
  let color: string | undefined = ''
  switch (listClass) {
    case 'primary':
      color = 'processing'
      break
    case 'success':
      color = 'success'
      break
    case 'warning':
      color = 'warning'
      break
    case 'danger':
      color = 'danger'
      break
    case 'info':
    default:
      color = 'default'
      break
  }
  return color
}

/**
 * 文件下载
 */
function downloadFile(url) {
  if (!url) {
    createMessage.warning('未知的文件')
    return
  }
  if (url.indexOf(',') > 0) {
    url = url.substring(0, url.indexOf(','))
  }
  url = getFileAccessHttpUrl(url.split(',')[0])
  if (url) {
    window.open(url)
  }
}

export { render, downloadFile }
