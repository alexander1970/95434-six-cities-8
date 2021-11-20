import {Link} from 'react-router-dom';
import {memo} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserEmail} from '../../services/user-email';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {ThunkAppDispatch} from '../../types/types';


function LogoPage(): JSX.Element{
  return(
    <div className="header__left">
      <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
      </Link>
    </div>
  );
}

function NoAuthPage(): JSX.Element {
  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({onSignOutClick: logoutAction}, dispatch);
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function AuthPage({onSignOutClick}: PropsFromRedux): JSX.Element {


  return(
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{getUserEmail()}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" onClick={onSignOutClick} to={AppRoute.Login}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const AuthPageWithReduxProps = connector(AuthPage);

function HeaderPage({authorizationStatus}: {authorizationStatus?: string}): JSX.Element{
  let loginComponent = authorizationStatus === AuthorizationStatus.Auth ? <AuthPageWithReduxProps /> : <NoAuthPage />;
  loginComponent = window.location.pathname === AppRoute.Login ? <span></span> : loginComponent;
  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <LogoPage />
          {loginComponent}
        </div>
      </div>
    </header>
  );
}

export default memo(HeaderPage, (prev, next) => prev.authorizationStatus === next.authorizationStatus);
