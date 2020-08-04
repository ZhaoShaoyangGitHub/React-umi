import Taro, { Component } from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { ConfirmModalProps, ConfirmModalState } from './index.interface'

class ConfirmModal extends Component<ConfirmModalProps, ConfirmModalState> {
    constructor(props: ConfirmModalProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: ConfirmModalProps = {
        visible: false,
        title: '',
        content: '',
        handleCancel: () => {},
        handleConfirm: () => {},
    }
    handleClose = () => {
        const { handleCancel } = this.props
        handleCancel()
    }
    handleCancel = () => {
        const { handleCancel } = this.props
        handleCancel()
    }
    handleConfirm = () => {
        const { handleConfirm } = this.props
        handleConfirm()
    }
    render() {
        const { visible, title, content } = this.props
        return (
            <AtModal
                isOpened={visible}
                // title={title}
                cancelText="取消"
                confirmText="确认"
                onClose={this.handleClose}
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
                content={content}
            />
        )
    }
}

export default ConfirmModal
