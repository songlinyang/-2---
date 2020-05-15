<template>
    <div id="interface">
        <div style="width: 100%">
            <div class="new">
                <el-button @click="openAddModal()" style="float:left;">创建接口</el-button>
                 <el-dialog
                    title="创建接口"
                    :visible.sync="dialogAddVisible"
                    width="50%"
                    :before-close="closeAddModal">
                    <div>
                    <el-form :model="addForm" :rules="rules" ref="formRef" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input v-model="addForm.description"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="context">
                            <editor v-model="addForm.context" @init="editorInit" lang="json" theme="chrome" width="500" height="200"></editor>
                        </el-form-item>
                    </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="closeAddModal()">取 消</el-button>
                    <el-button type="primary" @click="addFun()">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="table">
                <el-table
                  :data="interfaces"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="接口名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="description"
                    label="描述"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="serviceId"
                    label="服务">
                  </el-table-column>
                  <el-table-column
                    prop="context"
                    label="测试内容">
                  </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>


<script>
    import {addInterface, getInterfaces} from "../../requests/interface";

export default {
    name:"interface",
    components: {
        editor: require('vue2-ace-editor'),
    },
    created(){
        this.getServiceId();
        this.getInterfaceFun();
    },
    data() {
        return{
            dialogAddVisible:false,
            interfaces:[],
            serviceId:0,
            addForm:{
                name:"",
                description:"",
                context:""
            },
            rules:{
                name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                description: [
                { required: true, message: '请输入描述', trigger: 'blur' }
                ],
                context: [
                {required:true,message:'测试内容不能为空',trigger:'blur'}
                ],
            },
            editorInit: function () {
            require('brace/ext/language_tools'); //language extension prerequsite...
            require('brace/mode/html');
            require('brace/mode/json');    //language
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript'); //snippet
        }
            
        }
    },
    watch:{
        "$route.query":function () {
            this.getServiceId();
            this.getInterfaceFun();
        }
    },
    methods : {
        getInterfaceFun(){
            getInterfaces(this.serviceId).then(data=> {
                let success = data.data.success;
                if (success){
                    this.interfaces = data.data.data;
                    if(!data.data.data.context){

                    }
                }else{
                    this.$notify.error({
                        title: '错误',
                        message: '获取数据列表失败'
                    })
                }
            })
        },
        getServiceId(){
          let serviceId = this.$route.query.service_id
          if (!serviceId){
              // 如果为空，设为0
              this.serviceId = 0
              return;
          }
          this.serviceId = serviceId
        },
        openAddModal(){
            let context = {
                "url":"",
                "method":"GET",
                "payload":"",
                "assert":""
            }
            let req = JSON.parse(JSON.stringify(this.addForm))
            // req.context = JSON.parse(context)
            req.context = JSON.stringify(context)
            this.addForm.context = req.context
            this.dialogAddVisible = true;
        },
        closeAddModal(){
            this.dialogAddVisible = false;
        },
        addFun(){
            addInterface(this.addForm).then(data=>{
                let success = data.data.success

                if(success){
                    this.dialogAddVisible = false
                    this.$message({
                                showClose: true,
                                message:"新增成功",
                                type: 'success'
                    });
                }
            })
        }

    }
}
</script>

<style scoped>
.context{
    height: 202px;
}
</style>