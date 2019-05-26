<template>
  <div>
    <h3>具有数据校验功能的表单组件-Form</h3>
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
      <i-form-item label="checkbox" prop="interest">
        <i-checkbox-group v-model="formValidate.interest">
          <i-checkbox label="option1">选项 1</i-checkbox>
          <i-checkbox label="option2">选项 2</i-checkbox>
          <i-checkbox label="option3">选项 3</i-checkbox>
          <i-checkbox label="option4">选项 4</i-checkbox>
        </i-checkbox-group>
      </i-form-item>
      <i-form-item label="single" prop="single">
        <i-checkbox v-model="formValidate.single"></i-checkbox>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import iForm from '@/components/form/form.vue'
import iFormItem from '@/components/form/form-item.vue'
import iInput from '@/components/input/input.vue'
import iCheckbox from '@/components/checkbox/checkbox.vue'
import iCheckboxGroup from '@/components/checkbox/checkbox-group.vue'
export default {
  components: {
    iForm,
    iFormItem,
    iInput,
    iCheckbox,
    iCheckboxGroup
  },
  data () {
    return {
      formValidate: {
        name: '',
        mail: '',
        interest: [],
        single: false
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'checkbox不能为空', trigger: 'change' },
          { type: 'array', max: 2, message: '最多不能选择两个以上', trigger: 'change' }
        ],
        single: [
          { required: true, type: 'boolean', message: '单选不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid, fields) => {
        console.log(fields)
        if (valid) {
          window.alert('提交成功')
        } else {
          window.alert('提交失败')
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
</style>
