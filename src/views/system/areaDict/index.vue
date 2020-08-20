<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.name" clearable placeholder="输入名称搜索" style="width: 134px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-input v-model="query.parentId" clearable placeholder="父区域编号搜索" style="width: 134px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-input v-model="query.pinyin" clearable placeholder="输入拼音搜索" style="width: 134px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <br>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" :width="dialogStyle">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="父区编号" prop="parentId">
            <el-input v-model="form.parentId" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="首字母">
            <el-input v-model="form.initial" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="拼音简写">
            <el-input v-model="form.initials" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="拼音" prop="pinyin">
            <el-input v-model="form.pinyin" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="后缀">
            <el-input v-model="form.suffix" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="行政代码">
            <el-input v-model="form.code" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="区号 ">
            <el-input v-model="form.areaCode" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="课程排序" prop="sort">
            <el-input-number
              v-model.number="form.sort"
              :min="0"
              :max="999"
              controls-position="right"
              style="width: 194px;"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click="crud.cancelCU">关闭</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="id" label="编号" align="center"/>
        <el-table-column prop="name" label="名称" align="center"/>
        <el-table-column prop="parentId" label="父区域编号" align="center"/>
        <el-table-column prop="initial" label="拼音首字母" align="center"/>
        <el-table-column prop="pinyin" label="拼音" align="center" :show-overflow-tooltip="true"/>
        <el-table-column prop="suffix" label="后缀" align="center"/>
        <el-table-column prop="code" label="行政代码" align="center"/>
        <el-table-column prop="areaCode" label="区号 " align="center"/>
        <el-table-column v-permission="['admin','areaDict:edit','areaDict:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudAreaDict from '@/api/system/areaDict'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { checkDevice } from '@/utils/index'

const defaultForm = { id: null, name: null, parentId: null, initial: null, initials: null, pinyin: null, extra: null, suffix: null, code: null, areaCode: null, sort: null, createBy: null, updateBy: null, createTime: null, updateTime: null }
export default {
  name: 'AreaDict',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({
      title: '区域字典',
      url: 'api/areaDict',
      sort: ['id,asc', 'sort,asc'],
      crudMethod: { ...crudAreaDict }
    })
  },
  data() {
    return {
      textareaStyle: '260%', dialogStyle: '660px',
      permission: {
        add: ['admin', 'areaDict:add'],
        edit: ['admin', 'areaDict:edit'],
        del: ['admin', 'areaDict:del']
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '父区域编号不能为空', trigger: 'blur' }
        ],
        pinyin: [
          { required: true, message: '拼音不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'name', display_name: '名称' },
        { key: 'parentId', display_name: '父区域编号' },
        { key: 'initial', display_name: '拼音首字母' },
        { key: 'pinyin', display_name: '拼音' }
      ]
    }
  },
  created() {
    // 如果是手机/平板端 调整显示
    if (this.checkDevice().isPhone) {
      // 弹框100%  文本域100%
      this.textareaStyle = '108%'
      this.dialogStyle = '100%'
    } else if (this.checkDevice().isTablet) {
      this.textareaStyle = '270%'
    }
  },
  methods: {
    checkDevice,
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
