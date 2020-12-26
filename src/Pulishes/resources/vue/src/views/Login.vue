<template>
    <div class="main-bg">
        <div class="sub-main-w3">
            <div class="image-style"></div>
            <!-- vertical tabs -->
            <div class="vertical-tab">
                <div id="section1" class="section-w3ls">
                    <input type="radio" name="sections" id="option1" checked>
                    <label for="option1" class="icon-left-w3pvt">
                        <Icon type="ios-outlet" size="36"/>
                        <div>登录</div>
                    </label>
                    <article>
                        <div class="form">
                            <h3 class="legend">
                                账号登录
                            </h3>
                            <div class="input">
                                <Icon type="ios-mail-open-outline" />
                                <input type="email" v-model="login.email" placeholder="邮箱" required/>
                            </div>
                            <div class="input">
                                <Icon type="ios-lock-outline" />
                                <input type="password" v-model="login.password" placeholder="密码" required/>
                            </div>
                            <div class="captcha">
                                <div class="input">
                                    <Icon type="ios-apps-outline" />
                                    <input type="text" v-model="login.captcha" placeholder="验证码" required/>
                                </div>
                                <div class="image">
                                    <img :src="captcha.img" @click="getCaptcha"/>
                                    <Spin size="large" fix v-if="captchaLoading"></Spin>
                                </div>
                            </div>
                            <button type="submit" class="btn submit" @click="SubmitForLogin">登 录</button>
                        </div>
                    </article>
                </div>
                <div id="section2" class="section-w3ls">
                    <input type="radio" name="sections" id="option2">
                    <label for="option2" class="icon-left-w3pvt">
                        <Icon type="md-pin" size="36"/>
                        <div>说明</div>
                    </label>
                    <article>
                        <div class="form">
                            <h3 class="legend">说明</h3>
                            <p class="para-style">一些文字性的东西</p>
                        </div>
                    </article>
                </div>
                <div id="section3" class="section-w3ls">
                    <input type="radio" name="sections" id="option3">
                    <label for="option3" class="icon-left-w3pvt">
                        <Icon type="md-lock" size="36"/>
                        <div>忘记密码?</div>
                    </label>
                    <article>
                        <div class="form">
                            <h3 class="legend last">重置密码</h3>
                            <p class="para-style">请在下面输入您的电子邮件地址，我们将给您发送一封带有说明的电子邮件。</p>
                            <div class="input">
                                <Icon type="ios-mail-open-outline" />
                                <input type="email" v-model="forgetData.email" placeholder="邮箱" name="email" required/>
                            </div>
                            <div class="captcha">
                                <div class="input">
                                    <Icon type="ios-apps-outline" />
                                    <input type="text" v-model="forgetData.captcha" placeholder="验证码" required/>
                                </div>
                                <div class="image">
                                    <img :src="captcha.img" @click="getCaptcha"/>
                                    <Spin size="large" v-if="captchaLoading"></Spin>
                                </div>
                            </div>
                            <button type="submit" class="btn submit last-btn" @click="SubmitForForget">提交</button>
                        </div>
                    </article>
                </div>
            </div>
            <!-- //vertical tabs -->
            <div class="clear"></div>
        </div>
        <Spin size="large" v-if="loading"></Spin>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex'

    export default {
        name: "login",
        data() {
            return {
                login: {},
                forgetData: {},
                captcha: {},
                captchaLoading: false,
                loading: false
            }
        },
        mounted(){
            this.getCaptcha();
        },
        methods: {
            ...mapMutations({
                setToken: 'common/setToken', setMenus: 'common/setMenus'
            }),
            SubmitForLogin() {
                this.loading = true;
                this.$http.post(`login`, Object.assign({}, this.login, {
                    key: this.captcha.key
                })).then((res) => {
                    this.setToken(res.token);
                    this.setMenus(res.menus);
                }).finally(() => {
                    this.getCaptcha();
                    this.loading = false;
                });
            },
            SubmitForForget(){
                this.captchaLoading = true;
            },
            getCaptcha(){
                this.captchaLoading = true;
                this.$http.get(`/captcha/api/default`, {
                    baseURL: '/'
                }).then((res)=> {
                    this.captcha = res;
                }).finally(() => {
                    this.captchaLoading = false;
                });
            }
        }
    }
</script>
<style scoped>
    @import "../assets/login.css";
</style>
