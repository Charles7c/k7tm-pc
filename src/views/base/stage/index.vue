<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.name"
          clearable
          placeholder="输入名称搜索"
          style="width: 134px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
        <el-select
          v-model="query.courseId"
          clearable
          placeholder="课程类型搜索"
          class="filter-item"
          style="width: 134px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="(item, index) in base.course"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" :width="dialogStyle">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.name" style="width: 194px;" />
          </el-form-item>
          <el-form-item label="所属课程" prop="courseId">
            <el-select v-model="form.courseId" clearable style="width: 194px">
              <el-option
                v-for="(item, index) in base.course"
                :key="item.name + index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="排序">
            <el-input-number
              v-model.number="form.sort"
              :min="0"
              :max="999"
              controls-position="right"
              style="width: 194px;"
            />
          </el-form-item>
          <br>
          <el-form-item label="备注">
            <el-input
              v-model="form.desc"
              type="textarea"
              :autosize="{minRows:3}"
              placeholder="对课程的描述"
              :style="'width:'+textareaStyle"
            />
            <br>
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
        <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="ramark" label="备注" align="center" />
        <el-table-column prop="courseId" label="所属课程" align="center">
          <template slot-scope="scope">
            {{ base.name.course[scope.row.courseId] }}
          </template>
        </el-table-column>
        <el-table-column prop="updateBy" label="更新人" align="center" />
        <el-table-column prop="updateTime" label="更新时间" width="135" align="center">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','stage:edit','stage:del']" label="操作" width="150px" align="center">
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
import crudStage from '@/api/base/stage'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { checkDevice } from '@/utils/index'

const defaultForm = { id: null, name: null, ramark: null, sort: null, courseId: null, createBy: null, createTime: null, updateBy: null, updateTime: null }
export default {
  name: 'Stage',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  bases: ['course'],
  cruds() {
    return CRUD({
      title: '阶段',
      url: 'api/stage',
      sort: 'sort,asc',
      crudMethod: { ...crudStage }
    })
  },
  data() {
    return {
      textareaStyle: '260%', dialogStyle: '660px',
      permission: {
        add: ['admin', 'stage:add'],
        edit: ['admin', 'stage:edit'],
        del: ['admin', 'stage:del']
      },
      rules: {
        courseId: [
          { required: true, message: '所属课程不能为空', trigger: 'blur' }
        ]
      }
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
    formatDate(row, column) {
      // 获取单元格数据
      const rowData = row[column.property]
      const dt = new Date(rowData)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
    },
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
