<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          v-model="query.name"
          clearable
          placeholder="输入课程名称"
          style="width: 134px"
          class="filter-item"
          @keyup.enter.native="crud.toQuery" />
        <el-select
          v-model="query.enabled"
          clearable
          placeholder="选择课程状态"
          class="filter-item"
          style="width: 134px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="(item, index) in dict.course_status"
            :key="item.label + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" :width="dialogStyle">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="form.name" style="width: 194px;" />
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
          <el-form-item label="课程状态" prop="enabled">
            <el-select v-model="form.enabled" placeholder="请选择" style="width: 194px;" >
              <el-option
                v-for="(item, index) in dict.course_status"
                :key="item.label + index"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="课程描述">
            <el-input v-model="form.courseDesc" :rows="3" type="textarea" :style="'width:'+textareaStyle" />
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
        <el-table-column prop="name" label="名称" align="center"/>
        <el-table-column prop="desc" label="描述" align="center"/>
        <el-table-column prop="enabled" label="课程状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              :active-value="1"
              :inactive-value="0"
              active-color="#409EFF"
              inactive-color="#F56C6C"
              @change="changeEnabled(scope.row, scope.row.enabled)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" align="center"/>
        <el-table-column prop="updateBy" label="更新者" align="center"/>
        <el-table-column prop="createTime" label="创建时间" width="135" align="center">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="135" align="center">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','course:edit','course:del']" label="操作" width="150px" align="center">
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
import crudCourse from '@/api/base/course'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { checkDevice } from '@/utils/index'

const defaultForm = {
  id: null,
  name: null, sort: 1,
  courseDesc: null, enabled: 1,
  createBy: null, updateBy: null,
  createTime: null, updateTime: null
}
export default {
  name: 'Course',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['course_status'],
  cruds() {
    return CRUD({
      title: '课程',
      url: 'api/course',
      sort: 'sort,asc',
      crudMethod: { ...crudCourse }
    })
  },
  data() {
    return {
      textareaStyle: '260%', dialogStyle: '660px',
      permission: {
        add: ['admin', 'course:add'],
        edit: ['admin', 'course:edit'],
        del: ['admin', 'course:del']
      },
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入课程排序', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择课程状态', trigger: 'blur' }
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
    // 改变状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.course_status[val] + '" ' + data.name + '课程, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // eslint-disable-next-line no-undef
        crudCourse.edit(data).then(() => {
          // eslint-disable-next-line no-undef
          this.crud.notify(this.dict.label.course_status[val] + '成功', 'success')
        }).catch(err => {
          data.enabled = (data.enabled === 1) ? 0 : 1
          console.log(err.data.message)
        })
      }).catch(() => {
        data.enabled = (data.enabled === 1) ? 0 : 1
      })
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
