<!--
* DONE
* @description: 添加指标 组件
* @author: tutu
* @time: 2024-12-29 20:08:33
-->
<template>
	<div class="m-add-wrap">
		<van-form v-model="addInspectionForm" @submit="addInspectionAction">
			<van-space direction="vertical" fill>
				<van-field
					v-model="addInspectionForm.inspection_name"
					label="检查项目名称"
					placeholder="请输入检查项目名称"
					:rules="[
						{ required: true, message: '请输入检查项目名称', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]" />
				<van-button round block type="primary" native-type="submit">添加指标</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { type IInspection } from '@/services/interfaces/inspection';
import { ref } from 'vue';

const addInspectionForm = ref<IInspection>({
	inspection_name: '', // 检查项目名称
	abbreviation: '', // 缩写
	inspection_result: '', // 检查结果
	inspection_time: '', // 检查时间
	inspection_method: '', // 检查方法
	unit: '', // 单位
	min: '', // 最小值
	max: '', // 最大值
	inspection_num: '', // 检查编号
	sample_num: '', // 样本编号
	sample_type: '', // 样本类型
	apply_docker_id: 0, // 申请医生
	inspection_docker_id: 0, // 检查医生
	audit_docker_id: 0 // 审核医生
});

const addInspectionAction = () => {
	console.log(addInspectionForm.value);
};
</script>

<style lang="less" scoped>
.m-add-wrap {
}
</style>
