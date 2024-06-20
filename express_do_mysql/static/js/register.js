var app = new Vue({
    el: "#app",
    data: {
        username: "",
        password: "",
        name: "",
        passwordError: false,
        usernameError: false,
        // 错误提示
        usernameErrorText: "",
        passwordErrorText: ""
    }, watch: {
        username(newVal, oldVal) {
            axios.post("/api/checkuser", {username: newVal,}).then((response) => {
                console.log(response.data);
                if (response.data.result) {
                    this.usernameErrorText = "用户名已存在";
                    this.usernameError = true;
                } else {
                    this.usernameErrorText = "";
                    this.usernameError = false;
                }
            }).catch((error) => {
                console.log(error);
            })

        }, password: function (newVal, oldVal) {
            if (newVal === "") {
                this.passwordErrorText = "密码不能为空";
                this.passwordError = true;
            } else {
                this.passwordErrorText = "";
                this.passwordError = false;
            }
        }
    },
    mounted() {
        // 页面加载完成后执行的函数
        console.log("页面加载完成");
    },
    methods: {
        //注册
        register() {
            if (this.username.length == 0) {
                this.usernameError = true;
                this.usernameErrorText = "用户名不能为空";
                return;
            }
            if (this.password.length == 0) {
                this.passwordError = true;
                this.usernameErrorText = "密码不能为空";
                return;
            }
            var data = {
                username: this.username,
                password: this.password,
                name: this.name
            };
            axios.post("/api/register", data).then((response) => {
                if (response.data.result) {
                    layer.msg("注册成功", {icon: 1, time: 1000, shade: 0.1, anim: 6});
                    setTimeout(() => {
                        window.location.href = "/login.html";
                    }, 2000);
                } else {
                    layer.msg("注册失败", {icon: 2, time: 1000, shade: 0.1, anim: 6});
                }
            }).catch(function (error) {
                layer.msg("注册失败", {icon: 2, time: 1000, shade: 0.1, anim: 6});
            });
        }
    }
})

