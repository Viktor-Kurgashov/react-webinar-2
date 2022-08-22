import React, { useCallback } from 'react';
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import LayoutPage from '../../layouts/layout-page';
import LayoutFlex from '../../layouts/layout-flex';
import LocaleSelect from "../../containers/locale-select";
import Tools from '../../containers/tools';
import Spinner from '../../components/spinner';
import LoginForm from '../../components/login-form';
import UserPreview from '../../containers/user-preview';

const Login = () => {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    logged: state.user.logged,
    pending: state.user.loginState.pending,
    error: state.user.loginState.error,
    errorText: state.user.loginState.errorText,
  }));

  const callbacks = {
    login: useCallback((login, password) => {
      store.get('user').login(login, password);
    }, []),
  };

  return select.logged
    ? <Navigate to='/profile' />
    : (
      <LayoutPage head={<>
        <UserPreview />
        <LayoutFlex place="row-between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      </>}>
        <Tools />
        <Spinner active={select.pending}>
          <LoginForm onSubmit={callbacks.login} error={select.error} errorText={select.errorText} />
        </Spinner>
      </LayoutPage>
    )
}

export default Login;