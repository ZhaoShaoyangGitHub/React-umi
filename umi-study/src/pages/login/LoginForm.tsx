import React from 'react';
import { InputItem, Button, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';

interface LoginFormProps {
  handleSubmit: Function;
  form: {
    getFieldProps: Function;
    getFieldsValue: Function;
  };
}
const LoginForm: React.FC<LoginFormProps> = ({ form, handleSubmit }) => {
  const { getFieldProps, getFieldsValue } = form;
  const submit = () => {
    let value = getFieldsValue();
    handleSubmit(value);
  };
  return (
    <WingBlank size="lg">
      <WingBlank size="lg">
        <InputItem
          {...getFieldProps('name')}
          type="text"
          clear
          placeholder="请输入账号"
        >
          账号
        </InputItem>
        <InputItem
          {...getFieldProps('password')}
          type="password"
          clear
          placeholder="密码"
          autoComplete="new-password"
        >
          密码
        </InputItem>
        <Button type="primary" onClick={submit}>
          登录
        </Button>
      </WingBlank>
    </WingBlank>
  );
};

export default createForm()(LoginForm);
