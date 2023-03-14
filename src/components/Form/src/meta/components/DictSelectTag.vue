<template>
  <a-radio-group v-if="compType === CompTypeEnum.Radio" v-bind="attrs" v-model:value="state" @change="handleChange">
    <template v-for="item in dictOptions" :key="`${item.value}`">
      <a-radio :value="item.value">
        {{ item.label }}
      </a-radio>
    </template>
  </a-radio-group>

  <a-radio-group
    v-else-if="compType === CompTypeEnum.RadioButton"
    v-bind="attrs"
    v-model:value="state"
    buttonStyle="solid"
    @change="handleChange"
  >
    <template v-for="item in dictOptions" :key="`${item.value}`">
      <a-radio-button :value="item.value">
        {{ item.label }}
      </a-radio-button>
    </template>
  </a-radio-group>

  <template v-else-if="compType === CompTypeEnum.Select">
    <!-- 显示加载效果 -->
    <a-input v-if="loadingEcho" readOnly placeholder="加载中…">
      <template #prefix>
        <LoadingOutlined />
      </template>
    </a-input>
    <a-select
      v-else
      :placeholder="placeholder"
      v-bind="attrs"
      v-model:value="state"
      :filterOption="handleFilterOption"
      :getPopupContainer="getPopupContainer"
      @change="handleChange"
    >
      <a-select-option v-if="showChooseOption" :value="undefined">请选择</a-select-option>
      <template v-for="item in dictOptions" :key="`${item.value}`">
        <a-select-option :value="item.value">
          <span style="display: inline-block; width: 100%" :title="item.label">
            {{ item.label }}
          </span>
        </a-select-option>
      </template>
    </a-select>
  </template>
</template>
<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup name="DictSelectTag">
import { computed, ref, unref, useAttrs, watch, watchEffect } from 'vue'
import { propTypes } from '/@/utils/propTypes'
import { initDictOptions } from '/@/utils/dict'
import { omit } from 'lodash-es'
import { useRuleFormItem } from '/@/hooks/component/useFormItem'
import { CompTypeEnum } from '/@/enums/CompTypeEnum'
import { LoadingOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.array]),
  setDefault: propTypes.bool,
  dictCode: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  stringToNumber: propTypes.bool,
  getPopupContainer: {
    type: Function,
    default: node => node.parentNode
  },
  // 是否显示【请选择】选项 默认 false
  showChooseOption: propTypes.bool.def(false),
  // 下拉项-online使用
  options: {
    type: Array,
    default: () => [],
    required: false
  }
})
const emit = defineEmits(['options-change', 'change', 'update:value'])

const emitData = ref<any[]>([])
const dictOptions = ref<any[]>([])
const attrs = useAttrs()
const [state] = useRuleFormItem(props, 'value', 'change', emitData)
const _getBindValue = Object.assign({}, unref(props), unref(attrs))

// 是否正在加载回显数据
const loadingEcho = ref<boolean>(false)
// 是否是首次加载回显，只有首次加载，才会显示 loading
let isFirstLoadEcho = true

//组件类型
const compType = computed(() => {
  return !props.type || props.type === 'list' ? 'select' : props.type
})

/**
 * 监听字典code
 */
watchEffect(() => {
  if (props.dictCode) {
    loadingEcho.value = isFirstLoadEcho
    isFirstLoadEcho = false
    initDictData().finally(() => {
      loadingEcho.value = isFirstLoadEcho
    })
  }
  // 如果没有提供dictCode 可以走options的配置--
  if (!props.dictCode) {
    dictOptions.value = props.options
  }
})

// 使用useRuleFormItem定义的value，会有一个问题，如果不是操作设置的值而是代码设置的控件值而不能触发change事件
// 此处添加空值的change事件,即当组件调用的代码设置value为''也能触发change事件
watch(
  () => props.value,
  () => {
    if (props.value === '') {
      emit('change', '')
    }
  }
)

// 使用useRuleFormItem定义的value，会有一个问题，如果不是操作设置的值而是代码设置的控件值而不能触发change事件
async function initDictData() {
  let { dictCode, stringToNumber } = props
  // 根据字典Code, 初始化字典数组
  const dictData = await initDictOptions(dictCode)
  dictOptions.value = dictData.reduce((prev, next) => {
    if (next) {
      // 设置默认值
      if (props.setDefault && next.isDefault && next.dictValue) state.value = next.dictValue

      const value = next.dictValue
      prev.push({
        label: next.dictLabel,
        value: stringToNumber ? +value : value,
        ...omit(next, ['dictLabel', 'dictValue'])
      })
    }
    return prev
  }, [])
}

function handleChange(e) {
  emitData.value = [e?.target?.value || e]
}

/** 用于搜索下拉框中的内容 */
function handleFilterOption(input, option) {
  // 在 label 中搜索
  let labelIf = option?.children[0]?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  if (labelIf) {
    return true
  }
  // 在 value 中搜索
  return (option.value || '').toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
}

// console.log('getBindValue', getBindValue)
</script>
