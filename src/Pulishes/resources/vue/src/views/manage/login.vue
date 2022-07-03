<style lang="less">
.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(97, 176, 233), rgba(53, 131, 203));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  .login {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translateY(-50%);
    width: 400px;
    margin-right: -200px;
    margin-bottom: -300px;

    .ivu-card-head {
      border-bottom: none;
      padding: 50px 16px 30px;
    }

    .card-title {
      text-align: center;
      font-size: 23px;
    }

    .login-body {
      padding: 0 40px;

      .ivu-input-group-append, .ivu-input-group-prepend {
        padding: 0;

        .captcha {
          width: 125px;
          height: 30px;
          position: relative;

          .captcha-bg {
            cursor: pointer;
            width: 100%;
            height: 100%;
          }
        }
      }

      .forget_password {
        text-align: right;
      }
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: white;
    }
  }
}
</style>

<template>
  <div class="login-bg">
    <div class="login ">
      <div class="login-transition">
        <transition-group name="flip">
          <div class="transition-box" key="login" v-show="loginShow">
            <Card :bordered="false" :dis-hover="true">
              <template v-slot:title>
                <div class="card-title">欢迎登录</div>
              </template>

              <div class="login-body">
                <Form ref="formData" :model="login" :rules="rules" @keydown.enter.native="handleSubmit">
                  <FormItem prop="email">
                    <Input prefix="md-mail" v-model="login.email" placeholder="请输入邮箱"/>
                  </FormItem>
                  <FormItem prop="password">
                    <Input prefix="md-lock" type="password" v-model="login.password" placeholder="请输入密码"/>
                  </FormItem>
                  <FormItem prop="captcha" class="captcha-img">
                    <Input v-model="login.captcha" placeholder="请输入验证码">
                      <template v-slot:append>
                        <div class="captcha">
                          <div class="captcha-bg" @click="getCaptchaExcute()" :style="captchaHandle"></div>
                          <Spin fix v-if="captchaLoading"></Spin>
                        </div>
                      </template>
                    </Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" :loading="loading" long @click="handleSubmit">
                      <span v-if="!loading">登录</span>
                      <span v-else>正在登录...</span>
                    </Button>
                  </FormItem>
                  <FormItem class="forget_password">
                    <Button type="text" @click="() => {this.loginShow = false;}">忘记密码？</Button>
                  </FormItem>
                </Form>
              </div>
            </Card>
          </div>
          <div class="transition-box" key="reset" v-show="!loginShow">
            <Card :bordered="false" :dis-hover="true">
              <template v-slot:title>
                <div class="card-title">密码重置</div>
              </template>

              <div class="login-body">
                <Form ref="formResetData" :model="reset" :rules="resetRules" @keydown.enter.native="handleResetSubmit">
                  <FormItem prop="email">
                    <Input v-model="reset.email" placeholder="请输入邮箱">
                      <template #append>
                        <Button>发送验证码</Button>
                      </template>
                    </Input>
                  </FormItem>
                  <FormItem prop="email_captcha" class="captcha-img">
                    <Input v-model="reset.email_captcha" placeholder="请输入邮箱验证码"></Input>
                  </FormItem>
                  <FormItem prop="captcha" class="captcha-img">
                  <Input v-model="login.captcha" placeholder="请输入验证码">
                    <template v-slot:append>
                      <div class="captcha">
                        <div class="captcha-bg" @click="getCaptchaExcute()" :style="captchaHandle"></div>
                        <Spin fix v-if="captchaLoading"></Spin>
                      </div>
                    </template>
                  </Input>
                </FormItem>
                  <FormItem>
                    <Button type="primary" :loading="loading" long @click="handleResetSubmit">
                      <span v-if="!loading">重置</span>
                      <span v-else>正在登录...</span>
                    </Button>
                  </FormItem>
                  <FormItem class="forget_password">
                    <Button type="text" @click="() => {this.loginShow = true;}">去登录？</Button>
                  </FormItem>
                </Form>
              </div>
            </Card>
          </div>
        </transition-group>
      </div>
      <div class="footer">
        <p>Copyright 2019-{{ copyright }} 长沙伊佳网络科技有限公司 All rights reserved.</p>
      </div>
    </div>
  </div>

</template>

<script>
import {session} from "@/reactive/session";
import commonMixin from "@/mixins/common";

export default {
  mixins: [commonMixin],
  data() {
    return {
      loginShow: true,
      loading: false,
      captchaLoading: false,
      reset: {
        email: '',
        email_captcha: '',
        captcha: ''
      },
      login: {
        email: '',
        password: ''
      },
      captcha: {
        image: ''
      },
      rules: {
        email: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }],
        captcha: [{
          required: true,
          message: '验证码不能为空',
          trigger: 'blur'
        }]
      },
      resetRules: {
        email: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'blur'
        }],
        email_captcha: [{
          required: true,
          message: '邮箱验证码不能为空',
          trigger: 'blur'
        }],
        captcha: [{
          required: true,
          message: '验证码不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    captchaHandle() {
      let capt = this.captcha.img;
      if(!Boolean(capt)){
          return {};
      }
      return {
        "backgroundImage": `url(${capt})`
      };
    },
    copyright() {
      let date = new Date;
      return date.getFullYear();
    }
  },
  created() {
    this.getCaptchaExcute()
  },
  methods: {
    handleSubmit() {
      this.validate('formData').then(() => {
        this.loading = true;
        this.$http.post(`login`, Object.assign({}, this.login, {
          key: this.captcha.key
        })).then(({token, menus}) => {
          session["$store/auth/menu"] = menus;
          session["$store/auth/token"] = token;
          this.$Message.loading({
              content: "跳转中...",
              duration: 5
          });
          this.$router.push({
              name: 'home'
          });
        }).finally(() => {
          this.getCaptchaExcute();
          this.loading = false;
        });
      });
    },
    handleResetSubmit() {
      this.validate('formResetData').then(() => {
        this.loading = true;
        this.$http.post(`reset-password`, Object.assign({}, this.login, {
          key: this.captcha.key
        })).then(() => {
          this.loginShow = true;
        }).finally(() => {
          this.loading = false;
        });
      });
    },
    getCaptchaExcute() {
      this.captchaLoading = true;
      this.$http.get(`/captcha/api/default`, {
          baseURL: '/'
      }).then((res) => {
        this.captcha = res;
      }).finally(() => {
        this.captchaLoading = false;
      });
    }
  }
}
</script>
<style>
.transition-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 420px;
}
.login-transition{
  position: relative;
  height: 420px;
}

</style>
