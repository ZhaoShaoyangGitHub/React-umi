import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { LoginAgreementProps, LoginAgreementState } from './index.interface'
import styles from './LoginAgreement.module.less'

@connect(({ LoginAgreement }) => ({
    ...LoginAgreement,
}))
class LoginAgreement extends Component<LoginAgreementProps, LoginAgreementState> {
    config: Config = {
        navigationBarTitleText: '服务协议',
    }
    constructor(props: LoginAgreementProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    render() {
        return (
            <View className={styles.LoginAgreementMain}>
                <View>本协议是由您与上海荣月健康管理有限公司（以下简称“荣月健康”或“我们”）共同签署。</View>
                <View className={styles.title}>一、特别提醒</View>
                <View className={styles.txt}>
                    在使用小程序之前，您需要仔细阅读本协议，同时我们已对与您的权益可能具有重大关系的条款用粗体字予以标注，您需要重点阅读。
                </View>
                <View className={styles.title}>二、注册条款</View>
                <View className={styles.txt}>您理解并同意，小程序仅限个人用户注册。</View>
                <View className={styles.txt}>
                    在您通过小程序注册个人用户时，您应当是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人。若您不具备前述主体资格，您应当立即停止注册或停止使用荣月健康的服务，由此导致的一切后果由您及您的监护人承担。
                </View>
                <View className={styles.txt}>当您通过小程序申请注册成为荣月健康的会员时，您需要提供您的手机号。</View>
                <View className={styles.txt}>若您注册成为荣月健康的会员或使用、接受荣月健康的服务，您同意：</View>
                <View className={styles.txt}>
                    在注册时，向荣月健康提供真实、准确、即时、完整的注册信息及相应的证件资料并及时更新上述信息及资料以保持其真实、准确、即时、完整。
                </View>
                <View className={styles.txt}>
                    在确知或者有合理理由怀疑您提供的信息不真实、不准确、不即时、不完整时，荣月健康有权暂停或终止对您的服务。
                </View>
                <View className={styles.title}>三、使用条款</View>
                <View className={styles.txt}>
                    用户在使用小程序服务时，应遵守国家《计算机信息系统国际联网保密管理规定》、《中华人民共和国计算机信息系统安全保护条例》、《计算机信息网络国际联网安全保护管理办法》等相关法律法规以及本协议规定、荣月健康保险网的相关协议及规则，禁止任何违法违规行为，如：
                </View>
                <View className={styles.txt}>
                    任何干扰或破坏小程序或与之相连的服务器和网络及从事其他干扰或破坏荣月健康服务的活动，将小程序作任何非法用途；
                    通过小程序发布、传播含有以下内容的信息:
                </View>
                <View className={styles.txt}>(1) 有关宗教、种族或性别等的贬损言辞；</View>
                <View className={styles.txt}>
                    (2) 侵犯党和国家利益的言论；骚扰、滥用或威胁其他用户的信息、广告信息；
                </View>
                <View className={styles.txt}>
                    (3) 侵犯任何第三方著作权、专利、商标、商业秘密或其他专有权利或名誉权的信息；
                </View>
                <View className={styles.txt}>(4) 其他任何违反国家相关法律法规的信息。</View>
                <View className={styles.title}>四、费用</View>
                <View className={styles.txt}>
                    注册荣月健康的会员及使用相应服务是免费的。
                    荣月健康不负责对您因使用荣月健康的小程序服务而需支付的软硬件、税收及其他费用。
                </View>
                <View className={styles.title}>五、责任声明</View>
                <View className={styles.txt}>
                    对使用小程序而产生的风险由用户自己承担，荣月健康明确不提供任何明示或者默示的担保。
                </View>
                <View className={styles.txt}>荣月健康对下列事项不作任何陈述与保证：</View>
                <View className={styles.txt}>
                    您使用荣月健康的服务后所产生的任何行为，如购买或获得的任何产品、服务、信息或其他事物等，将符合您的要求或经验；
                </View>
                <View className={styles.txt}>
                    荣月健康是不受干扰的、没有故障的，也不对使用效果做任何保证。您同意独立承担因小程序服务意外中断、操作或传输的迟延、电脑病毒、网络连接故障、未经授权的进入等引起的损失。
                </View>
                <View className={styles.txt}>
                    您因违反荣月健康的用户协议或其他有关的法律、法规，而导致有第三方对荣月健康提起诉讼或索赔要求时，您同意赔偿荣月健康因此遭受的所有损失，包括但不限于合理的律师费。
                    用户对通过荣月健康获取的任何信息，用户需自己甄别，自负风险；对因下载或引用荣月健康的数据、信息而造成的用户计算机系统损坏或数据丢失，荣月健康不负责任
                </View>
                <View className={styles.txt}>
                    荣月健康对用户使用荣月健康上公布的或其服务中的建议和资讯而造成的损失或伤害以及用户相信荣月健康上的公布的或其服务中的建议和资讯而做出的决定或采取的行动不负责任。若您对荣月健康提供的部分或所有服务不满，您唯一的补救措施是停止使用这些服务。
                </View>
                <View className={styles.txt}>
                    荣月健康含有与其他网站的链接。荣月健康与链接的网站有合作关系，但并不能控制这些网站及其所提供的资源，所以荣月健康对链接网站上的内容、广告、服务、产品信息的真实有效性不负责任，并且对因链接网站上的内容、广告、服务、产品信息的失实而造成的损失不负任何法律责任。
                </View>
                <View className={styles.txt}>
                    鉴于互联网的特殊性，因黑客攻击、互联网连通中断或者系统故障等情形给用户造成的损失，荣月健康不承担责任。
                </View>
                <View className={styles.title}>六、法律适用及管辖</View>
                <View className={styles.txt}>
                    本协议条款的解释及适用，以及与本协议条款有关的争议，均应依照中华人民共和国法律予以处理，并以荣月健康所在地为一审管辖法院。
                </View>
            </View>
        )
    }
}

export default LoginAgreement
