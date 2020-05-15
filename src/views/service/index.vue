<template>
    <div id="service">
        <div class="add">
        <el-button @click="openAddModal()" style="float:left;">创建服务</el-button>
         <el-dialog
            title="创建服务"
            :visible.sync="dialogAddVisible"
            width="50%"
            :before-close="closeAddModal">
            <div> 
            <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
            </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeAddModal()">取 消</el-button>
            <el-button type="primary" @click="addServiceFun()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑服务"
            :visible.sync="dialogEditVisible"
            width="50%"
            :before-close="closeEditModal">
            <div>
            
            <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="editForm.description"></el-input>
                </el-form-item>
            </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="closeEditModal()">取 消</el-button>
            <el-button type="primary" @click="editServiceFun()">确 定</el-button>
            </span>
        </el-dialog>
        </div>
        <div class="content">
            <div v-for="item in servicesList" :key="item.id">
            <el-card class="box-card" style="margin:5px">
            <div slot="header">
                <div @click="goToInterface(item.id)">
                    <a href="javascript:void(0)" style="text-decoration:none;">{{item.name}}</a>
                </div>

                <el-button style="float: right; padding: 3px 0" type="text" @click="openEditModal(item.id)">编辑</el-button>
                <el-button style="float: right; padding: 3px 0" type="text" @click="delAddModal()">删除</el-button>
            </div>
            <div class="text item">
                {{'描述: ' + item.description }}
            </div>
            </el-card>
        </div>
        </div>
    </div>
</template>


<script>
import { getAllService,addService, updateService,getSingleService } from '../../requests/service'
export default {
    name:"service",
    data() {
        return{
            dialogAddVisible: false,
            dialogEditVisible: false,
            addForm: {
                name : '',
                description : ''
            },
            editForm: {
                name :'',
                description: ''
            },
            addRules:{
                name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                description: [
                { required: true, message: '请输入描述', trigger: 'blur' }
                ],
            },
            editRules:{
                name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                description: [
                { required: true, message: '请输入描述', trigger: 'blur' }
                ],
            },
            servicesList:[],

        }
    },
    methods : {
        goToInterface(serviceId) {
            this.$router.push(`/interface/?service_id=${serviceId}`)
        },
        getServiceFun() {
            getAllService().then(resp =>{
            let success = resp.data.success
            if (!success){
                this.$notify.error({
                title: '错误',
                message: '获取数据失败，请重试'
                });
                this.loginLoading = false
            }
            this.servicesList = resp.data.data
        })
        },
        openAddModal(){
            this.dialogAddVisible=true
        },
        addServiceFun(){
            this.$refs.addFormRef.validate((valid) => {
            if (valid) {
                //表单验证通过
                 addService(this.addForm).then(resp => {
                        let success = resp.data.success
                        if (success){
                            this.$message({
                                showClose: true,
                                message:"新增成功",
                                type: 'success'
                            });
                            this.dialogAddVisible=false
                            //刷新一次获取服务数据
                            this.getServiceFun()
                        }else{
                            this.$message({
                            showClose: true,
                            message: resp.data.error.msg,
                            type: 'error'       
                            });
                        this.dialogAddVisible=false
                        }
                    })
            } else {
                this.dialogAddVisible=true
            }
            });
            

        },
        openEditModal(serviceId){
            console.log(serviceId)
            getSingleService(serviceId).then(resp => {
                if (resp.data.success){
                    this.editForm = resp.data.data
                }else{
                    return ;
                }
            })
            this.dialogEditVisible=true
        },
        editServiceFun(){
            this.$refs.editFormRef.validate((valid) => {
            if (valid) {
                //表单验证通过
                updateService(this.editForm.id,this.editForm).then(resp => {
                    let success = resp.data.success
                    if (success){
                        console.log(resp.data.name)
                        this.editForm.name = resp.data.data.name
                        this.$message({
                                showClose: true,
                                message:"编辑成功",
                                type: 'success'
                            });
                        this.dialogEditVisible = false
                        this.getServiceFun()
                    }else{
                        this.$message({
                            showClose: true,
                            message: resp.data.error.msg,
                            type: 'error'       
                        });
                        this.dialogAddVisible=false
                    }
                })
            } else {
                this.dialogEditVisible=true
            }
            })
            
        },
        //关闭
        closeAddModal() {
            this.dialogAddVisible=false
        },
        closeEditModal(){
            this.dialogEditVisible=false
        },
        delAddModal(){
            this.dialogVisible=false
        }
    },
    created(){

    },
    mounted(){
        //首次获取服务数据
        this.getServiceFun()
    }
}
</script>

<style scoped>
.add {
    display: flex;
    padding: 5px;
    
}
.box-card {
    width: 300px;
    height: 150px;
}
.content {
    display:flex;
    flex-wrap:wrap;
}
</style>