<template>
	<div class="boxs">
		<div class="title">用例管理</div>

		<div class="case_list">
			<el-scrollbar height="calc(100vh - 105px);">
				<el-menu class="el-menu-vertical-demo" active-text-color="#ffd04b" text-color="#000" style="background: none;border: none;">
					<!-- 用例列表数据 -->
					<el-submenu :index="task.name" v-for="task in tasks" :key="task.id">
						<template #title>
							{{ task.name }}
						</template>
						<el-submenu :index="sui.name" v-for="sui in task.test_suits" :key="sui.id">
							<template #title>
								{{ sui.name }}
							</template>
							<el-menu-item :index="item.title" v-for="item in sui.testcases" :key="item.id">{{ item.title }}</el-menu-item>
						</el-submenu>
					</el-submenu>
				</el-menu>
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			tasks: []
		};
	},
	computed: {
		...mapState(['pro'])
	},
	methods: {
		async getAllTask() {
			const response = await this.$api.getTasks(this.pro.id);
			if (response.status === 200) {
				this.tasks = response.data.results;
			}
		}
	},
	created() {
		this.getAllTask();
	}
};
</script>

<style scoped>
.title {
	font: bold 20px/40px 'microsoft yahei';
	height: 40px;
	text-align: center;
	border-bottom: solid 3px #6b6b6b;
}
.boxs {
	height: calc(100vh - 60px);
	box-shadow: 0 0 5px #00aa7f;
}


</style>
