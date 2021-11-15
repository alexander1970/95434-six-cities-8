import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import {postFavoriteStatus} from '../../store/api-actions';
import {ButtonFavorite, ThunkAppDispatch, State} from '../../types/types';

type FavoriteBtnProps = {
  isFavorite: boolean,
  btn: ButtonFavorite,
  offerId: number
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({changeStatus: postFavoriteStatus}, dispatch);
const mapStateToProps = ({authorizationStatus}: State) => ({authorizationStatus});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoriteBtn({isFavorite, btn, authorizationStatus, offerId, changeStatus}: FavoriteBtnProps & PropsFromRedux): JSX.Element {

  const history = useHistory();

  const handleChangeFavoriteStatus = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return history.push(AppRoute.Login);
    }

    const status = isFavorite ? 0 : 1;
    changeStatus(offerId, status);
  };
  const activeClass = isFavorite ? `${btn.className}__bookmark-button--active` : '';

  return(
    <button className={`${btn.className}__bookmark-button ${activeClass}
    button`} type="button" onClick={handleChangeFavoriteStatus}
    >
      <svg className={`${btn.className}__bookmark-icon`} width={btn.width} height={btn.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default connector(FavoriteBtn);
