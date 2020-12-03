<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.schoolId" clearable placeholder="所在校区搜索" style="width: 134px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-select v-model="query.classId" clearable placeholder="所在班级搜索" class="filter-item" style="width: 134px" @change="crud.toQuery">
          <el-option
            v-for="(item, index) in classes"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-input
        v-model="query.name"
        clearable
        placeholder="输入姓名搜索"
        style="width: 134px"
        class="filter-item"
        @keyup.enter.native="crud.toQuery"
        />
        <el-input
        v-model="query.phone"
        clearable
        placeholder="输入手机号搜索"
        style="width: 134px"
        class="filter-item"
        @keyup.enter.native="crud.toQuery"
        />
        <el-input
        v-model="query.email"
        clearable
        placeholder="输入邮箱搜索"
        style="width: 134px"
        class="filter-item"
        @keyup.enter.native="crud.toQuery"
        />
        <el-input
        v-model="query.identityCard"
        clearable
        placeholder="输入身份证号搜索"
        style="width: 185px"
        class="filter-item"
        @keyup.enter.native="crud.toQuery"
        />
        <el-select
        v-model="query.gender"
        clearable
        placeholder="选择性别搜索"
        class="filter-item"
        style="width: 134px"
        @change="crud.toQuery"
        >
          <el-option
          v-for="(item, index) in genders"
          :key="item.label + index"
          :label="item.label"
          :value="item.value"
          />
        </el-select>
        <el-select
        v-model="query.courseId"
        clearable
        placeholder="报名课程搜索"
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
        <el-select
          v-model="query.learningStatus"
          clearable
          placeholder="学习状态搜索"
          class="filter-item"
          style="width: 134px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="(item, index) in dict.learning_status"
            :key="item.label + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="query.education"
          clearable
          placeholder="最高学历搜索"
          class="filter-item"
          style="width: 134px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="(item, index) in dict.education_level"
            :key="item.label + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="query.source"
          clearable
          placeholder="了解渠道搜索"
          class="filter-item"
          style="width: 134px"
          @change="crud.toQuery"
        >
          <el-option
            v-for="(item, index) in dict.understand_channel"
            :key="item.label + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="query.advisoryTeacher" clearable placeholder="咨询老师搜索" style="width: 134px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-select v-model="query.needEdu" clearable placeholder="需要学历搜索" class="filter-item" style="width: 134px" @change="crud.toQuery">
          <el-option
            v-for="(item, index) in booleanes"
            :key="item.label + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="query.needEmployment" clearable placeholder="需要就业搜索" class="filter-item" style="width: 134px" @change="crud.toQuery">
          <el-option
            v-for="(item, index) in booleanes"
            :key="item.label + index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <date-range-picker
          v-model="query.registrationTime"
          start-placeholder="报名时间起"
          end-placeholder="报名时间止"
          class="date-item"
        />
        <date-range-picker
          v-model="query.createTime"
          start-placeholder="创建时间起"
          end-placeholder="创建时间止"
          class="date-item"
        />
        <date-range-picker
          v-model="query.updateTime"
          start-placeholder="更新时间起"
          end-placeholder="更新时间止"
          class="date-item"
        />
        <br>
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" :width="dialogStyle">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
          <fieldset class="first-fieldset">
            <legend>基础信息</legend>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="身份证号" prop="identityCard">
              <el-input v-model="form.identityCard" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.gender" style="width: 194px">
                <el-option
                  v-for="(item, index) in genders"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="form.bornDate"
                type="date"
                style="width: 194px;"
              />
            </el-form-item>
            <el-form-item label="籍贯" prop="provinceId" style="margin-right: 0">
              <el-select v-model="form.provinceId" suffix-icon="" filterable clearable style="width: 89px" @change="getCityByProvince">
                <el-option
                  v-for="(item, index) in areaDictProvince"
                  :key="item.name + index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="cityId">
              <el-select v-model="form.cityId" suffix-icon="" filterable clearable style="width: 100px">
                <el-option
                  v-for="(item, index) in areaDictCity"
                  :key="item.name + index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </fieldset>

          <fieldset>
            <legend>报名信息</legend>
            <el-form-item label="咨询老师" prop="advisoryTeacher">
              <el-input v-model="form.advisoryTeacher" placeholder="例：咨询一部-张三" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="了解渠道">
              <el-select v-model="form.source" style="width: 194px">
                <el-option
                  v-for="(item, index) in dict.understand_channel"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!--<el-form-item label="推荐学员">
              <el-input v-model="form.referrerStu" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="推荐老师">
              <el-input v-model="form.referrerTeacher" style="width: 194px;" />
            </el-form-item>-->
            <el-form-item label="报名时间">
              <el-date-picker v-model="form.registrationTime" type="datetime" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="报名课程">
              <el-select v-model="form.courseId" style="width: 194px" clearable>
                <el-option
                  v-for="(item, index) in base.course"
                  :key="item.name + index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="缴费金额">
              <el-input v-model="form.payAmount" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="费用来源">
              <el-select v-model="form.costSource" style="width: 194px">
                <el-option
                  v-for="(item, index) in dict.cost_source"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="家长称谓">
              <el-input v-model="form.contactName" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="家长电话">
              <el-input v-model="form.contactPhone" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="需要就业" prop="needEmployment">
              <el-select v-model="form.needEmployment" clearable style="width: 194px">
                <el-option
                  v-for="(item, index) in booleanes"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="期望城市">
              <el-input v-model="form.employmentIntentionsCity" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="所在校区">
              未设置字典，请手动设置 Select
            </el-form-item>
            <el-form-item label="所在班级" prop="classId">
              <el-select v-model="form.classId" clearable style="width: 194px">
                <el-option
                  v-for="(item, index) in classes"
                  :key="item.name + index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="进班时间">
              <el-date-picker v-model="form.enterClassTime" type="datetime" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="学习状态" prop="learningStatus">
              <el-select v-model="form.learningStatus" style="width: 194px">
                <el-option
                  v-for="(item, index) in dict.learning_status"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!--<el-form-item label="剩余课时">
              <el-input v-model="form.classHour" placeholder="一对一学员请输入剩余课时" style="width: 194px;" />
            </el-form-item>-->
          </fieldset>

          <fieldset>
            <legend>教育背景</legend>
            <el-form-item label="最高学历">
              <el-select v-model="form.education" style="width: 194px">
                <el-option
                  v-for="(item, index) in dict.education_level"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="毕业院校">
              <el-input v-model="form.graduateInstitutions" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="学历专业">
              <el-input v-model="form.major" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="英语水平">
              <el-input v-model="form.englishLevel" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="需要学历" prop="needEdu">
              <el-select v-model="form.needEdu" clearable style="width: 194px">
                <el-option
                  v-for="(item, index) in booleanes"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </fieldset>

          <fieldset>
            <legend>关注要点</legend>
            <el-form-item label="生活状态" prop="status">
              <el-select v-model="form.status" style="width: 194px">
                <el-option
                  v-for="(item, index) in dict.trainee_status"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="专业基础" prop="basisStatus">
              <el-select v-model="form.basisStatus" style="width: 194px">
                <el-option
                  v-for="(item, index) in dict.basis_status"
                  :key="item.label + index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="学员描述" prop="traineeDesc">
              <el-input v-model="form.traineeDesc" :rows="3" type="textarea" :style="'width:'+textareaStyle" />
            </el-form-item>
            <br>
            <el-form-item label="工作经历" prop="workHistory">
              <el-input v-model="form.workHistory" :rows="3" type="textarea" :style="'width:'+textareaStyle" />
            </el-form-item>
            <br>
            <el-form-item label="特殊承诺" prop="specialCommitment">
              <el-input v-model="form.specialCommitment" :rows="3" type="textarea" :style="'width:'+textareaStyle" />
            </el-form-item>
            <br>
            <!--<el-form-item label="访谈状态">
              <el-input v-model="form.interviewStatus" style="width: 194px;" />
            </el-form-item>
            <el-form-item label="最后访谈时间">
              <el-input v-model="form.lastInterviewTime" style="width: 194px;" />
            </el-form-item>-->
          </fieldset>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click="crud.cancelCU">关闭</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="name" label="姓名" align="center"/>
        <el-table-column prop="gender" label="性别" :formatter="genderFormat" align="center"/>
        <el-table-column prop="phone" label="手机号" align="center" :show-overflow-tooltip="true"/>
        <el-table-column prop="bornDate" label="出生日期" align="center">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.bornDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="courseId" label="报名课程" width="120" align="center">
          <template slot-scope="scope">
            {{ base.name.course[scope.row.courseId] }}
          </template>
        </el-table-column>
        <el-table-column prop="classId" label="所在班级" width="120" align="center"/>
        <el-table-column prop="learningStatus" label="学习状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.learningStatus === 6" type="danger">{{ dict.label.learning_status[scope.row.learningStatus] }}</el-tag>
            <el-tag v-else-if="scope.row.learningStatus === 7" type="info">{{ dict.label.learning_status[scope.row.learningStatus] }}</el-tag>
            <el-tag v-else-if="scope.row.learningStatus === 5" type="warning">{{ dict.label.learning_status[scope.row.learningStatus] }}</el-tag>
            <el-tag v-else-if="scope.row.learningStatus === 1 || scope.row.learningStatus === 2" type="success">{{ dict.label.learning_status[scope.row.learningStatus] }}</el-tag>
            <el-tag v-else>{{ dict.label.learning_status[scope.row.learningStatus] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="education" label="最高学历" width="115" align="center">
          <template slot-scope="scope">
            {{ dict.label.education_level[scope.row.education] }}
          </template>
        </el-table-column>
        <el-table-column prop="dataIntegrity" label="资料完善度" width="120px" align="center"/>
        <el-table-column prop="advisoryTeacher" label="咨询老师" width="120px" align="center"/>
        <el-table-column prop="needEmployment" label="需要就业" :formatter="booleanFormat" align="center"/>
        <el-table-column prop="updateBy" label="更新者" width="135" align="center"/>
        <el-table-column prop="updateTime" label="更新时间" width="135" align="center">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','trainee:edit','trainee:del']" label="操作" width="150px" align="center" fixed="right">
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
import crudTrainee from '@/api/classs/trainee'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import { getAreaDict } from '@/api/system/areaDict'
import { getAllClass } from '@/api/classs/classs'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { checkDevice } from '@/utils/index'

const defaultForm = {
  id: null, uuid: null,
  name: null, phone: null, email: null,
  identityCard: null, gender: null, bornDate: null, provinceId: null, cityId: null,
  source: null, referrerStu: null, referrerTeacher: null,
  registrationTime: null, courseId: null, payAmount: null, earnestFlag: null, completionTime: null, costSource: null,
  contactName: null, contactPhone: null, needEmployment: null, employmentIntentionsCity: null,
  schoolId: null, classId: null, enterClassTime: null, learningStatus: null, classHour: null,
  education: null, graduateInstitutions: null, major: null, englishLevel: null, needEdu: null,
  status, basisStatus: null, advisoryTeacher: null,
  traineeDesc: null, workHistory: null, specialCommitment: null,
  degreeInPhoto: null, identityCardPhotoFront: null, identityCardPhotoBack: null,
  graduateTime: null, dataIntegrity: null, interviewStatus: null,
  lastInterviewTime: null, wechatId: null, qqId: null,
  createBy: null, updateBy: null, createTime: null, updateTime: null
}
export default {
  name: 'Trainee',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['understand_channel', 'cost_source', 'education_level', 'basis_status', 'learning_status', 'trainee_status'],
  bases: ['course'],
  cruds() {
    return CRUD({
      title: '学员',
      url: 'api/trainee',
      sort: 'createTime,desc',
      crudMethod: { ...crudTrainee }
    })
  },
  data() {
    return {
      textareaStyle: '260%', dialogStyle: '660px',
      genders: [{ 'label': '女', 'value': 0 }, { 'label': '男', 'value': 1 }],
      booleanes: [{ 'label': '否', 'value': 0 }, { 'label': '是', 'value': 1 }],
      areaDictProvince: [], areaDictCity: [],
      classes: [],
      permission: {
        add: ['admin', 'trainee:add'],
        edit: ['admin', 'trainee:edit'],
        del: ['admin', 'trainee:del']
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 15, message: '姓名长度应在 2 到 15 个字符' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^0?(13|14|15|18|17)[0-9]{9}$/, message: '请输入正确的手机号' }
        ],
        identityCard: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { pattern: /^\d{15}$|^\d{18}$|^\d{17}[xX]$/, message: '请输入正确的身份证号' }
        ],
        needEmployment: [
          { required: true, message: '需要就业不能为空', trigger: 'blur' }
        ],
        learningStatus: [
          { required: true, message: '学习状态不能为空', trigger: 'blur' }
        ],
        needEdu: [
          { required: true, message: '需要学历不能为空', trigger: 'blur' }
        ],
        advisoryTeacher: [
          { required: true, message: '咨询老师不能为空', trigger: 'blur' }
        ],
        workHistory: [
          { max: 200, message: '工作经历请控制在200个字符内' }
        ],
        basisStatus: [
          { required: true, message: '专业基础不能为空' }
        ],
        traineeDesc: [
          { max: 200, message: '学员描述请控制在200个字符内' }
        ]
      }
    }
  },
  created() {
    // 加载所有的班级信息
    this.getClass()
    // 加载所有省份
    this.getProvince()
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
    [CRUD.HOOK.afterSubmit]() {
      this.areaDictCity = []
    },
    [CRUD.HOOK.afterAddCancel]() {
      this.areaDictCity = []
    },
    // 打开编辑弹窗前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.getCity(this.form.provinceId)
    },
    // 关闭编辑弹窗后做的操作
    [CRUD.HOOK.afterEditCancel]() {
      this.areaDictCity = []
    },
    // 根据省份查询城市
    getCityByProvince(node) {
      this.areaDictCity = []
      this.form.city = null
      if (node != null && node !== '') {
        this.getCity(node)
      }
    },
    // 查询所有城市信息
    getCity(node) {
      getAreaDict(node).then(res => {
        this.areaDictCity = res.content
      }).catch(() => { })
    },
    // 查询所有省份信息
    getProvince() {
      getAreaDict(0).then(res => {
        this.areaDictProvince = res.content
      }).catch(() => { })
    },
    // 获取搜索框班级列表
    getClass(node) {
      // 根据班级加载学生
      getAllClass(node).then(res => {
        this.classes = res.content
      }).catch(() => { })
    },
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    booleanFormat(row, column) {
      return row[column.property] === 0 ? '否' : '是'
    },
    genderFormat(row, column) {
      return row[column.property] === 0 ? '女' : '男'
    }
  }
}
</script>

<style scoped>
  .first-fieldset{
    margin-top: -15px;
  }
  fieldset {
    padding:15px 15px 0 15px;
    margin-bottom:17px;
    border:1px solid #e4e7ed;
    border-radius: 3px;
    background:#fff;
  }
  fieldset legend {
    color:#409EFF;
    /*color:#5e6d82;*/
    font-weight:bold;
    padding:3px 20px 3px 20px;
    border:1px solid #e4e7ed;
    border-radius: 3px;
    background:#fff;
  }
</style>
