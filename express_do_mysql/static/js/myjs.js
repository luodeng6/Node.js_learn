var app = new Vue({
    el: '#app',
    data() {
        return {
            username: '',
            tableData: [],
            multipleSelection: {},
            visible: false,
            show: false,

        }
    },

    methods: {
        deleteData() {
            this.visible = false;
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请选择要删除的数据',
                    type: 'warning'
                })
            } else if (this.multipleSelection.length > 50) {
                this.$message({
                    message: '一次只能删除50条数据',
                    type: 'warning'
                })
            } else {
                axios.post('/api/deleteuser', this.multipleSelection)
                    .then(response => {
                        console.log("数据删除成功：");
                        console.log(response.data);
                        if (response.data.result) {
                            this.$message({
                                message: '数据删除成功',
                                type: 'success'
                            });
                            this.rushData();
                        } else {
                            this.$message({
                                message: '数据删除失败',
                                type: 'error'
                            });
                        }
                    }).catch(error => {
                    console.log(error);
                });
            }

        },
        getData(username = "") {
            axios.get('/api/getuser?username=' + username)
                .then(response => {

                    console.log("数据获取成功：");
                    console.log(response.data);
                    this.tableData = response.data.data;
                    this.show = true;
                    setTimeout(() => {
                        this.$message({message: '数据获取成功', type: 'success'});
                    }, 3000)

                }).catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    this.$message({message: '请先登录', type: 'warning'})
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 1500);
                } else {
                    this.$message({message: '数据获取失败', type: 'error'});
                }
            });
        },
        // 登录退出
        loginout() {
            axios.get('/api/clearcookie')
                .then(response => {
                    console.log("退出成功：");
                    if (response.data.result) {
                        this.$message({message: '退出成功', type: 'info'});
                    } else {
                        this.$message({message: '退出失败', type: 'error'});
                    }
                }).catch(error => {
                console.log(error);
            })
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 1000);

        },
        getUsername() {
            axios.get('/api/getusername')
                .then(response => {
                    console.log("获取用户名成功：");
                    console.log(response.data);
                    this.username = response.data.username;
                }).catch(error => {
                console.log(error);
            });
        },

        foundData() {
            this.getData(this.username);
        },
        insertData() {
            axios.get('/api/insertusers?num=25')
                .then(response => {
                    console.log("数据插入成功：");
                    console.log(response.data);

                    if (response.data.result) {
                        this.$message({message: '数据插入成功', type: 'success'});
                    } else {
                        this.$message({message: '数据插入失败', type: 'error'});
                    }
                }).catch(error => {
                console.log(error);
            });
            this.rushData();
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        rushData() {
            this.getData();

        }
    },
    mounted() {
        this.$message({
            message: '这是Node.js+Vue.js+ElementUI的项目脚手架',
            type: 'success'
        });
        this.rushData();
        this.getUsername();
    }
})
